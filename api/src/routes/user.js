const { User, Shopcart } = require('../db.js');
const server = require('express').Router();
const SHA256 = require('crypto-js/sha256');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { EMAIL_ADRESS, EMAIL_PASS, SECRET_KEY } = process.env;

//Admin SDK Firebase
var admin = require('firebase-admin');

var firebase = require('firebase');

var serviceAccount = require('../e-commerce-henry-34fb9-firebase-adminsdk-fj7v3-68a867461d.json');

let transporter = nodemailer.createTransport({
	service:'Gmail',
	auth:{
		user: EMAIL_ADRESS,
		pass: EMAIL_PASS
	}
});

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

server.get('/', (req, res) => {
	User.findAll().then((data) => {
		res.status(200).send(data);
	});
});

//ruta que retorna un usuario por id(incluye su shopcart)
server.get('/shopcart/:id', (req, res) => {
	User.findOne({ where: { id: req.params.id }, include: Shopcart })
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((err) => res.send(err));
});

//ruta para agragar usuarios(tambien crea y vincula automaticamente un shopcart)
server.post('/', (req, res) => {
	let user = {};
	user.email = req.body.email;
	user.password = SHA256(req.body.password).toString();

	user.role = 'user';
	User.create(user)
		.then((newUser) => {
			newUser.createShopcart({ status: 'open' });
			res.status(200).send('ok');
		})
		.catch((err) => {
			res.status(400).send('ERROR: ' + err);
		});
});
//Cambia el role del user a admin
server.put('/promote/:id', (req, res) => {
	User.findByPk(req.params.id).then((user) => {
		user
			.update({
				role: 'admin',
			})
			.then(() => {
				res.status(200).send('admin');
			});
	});
});
//Cambia el role del user a user
server.put('/demote/:id', (req, res) => {
	User.findByPk(req.params.id).then((user) => {
		user
			.update({
				role: 'user',
			})
			.then(() => {
				res.status(200).send('User successfully demoted!');
			});
	});
});
//Cambia el role del user a banned
server.put('/ban/:id', (req, res) => {
	User.findByPk(req.params.id).then((user) => {
		user
			.update({
				role: 'banned',
			})
			.then(() => {
				res.status(200).send('User successfully banned!');
			});
	});
});
//Modify user
server.put('/:id', (req, res) => {
	User.findOne({
		where: {
			id: req.params.id,
		},
	}).then((user) => {
		user
			.update(req.body)
			.then(() => {
				res.status(201).send('User updated!');
			})
			.catch((r) => {
				res.status(400).send('Error updateing User!');
			});
	});
});
//Delete user
server.delete('/:idUser', (req, res) => {
	let idUser = req.params.idUser;
	User.destroy({
		where: {
			idUser: idUser,
		},
	})
		.then((response) => {
			send.status(200).send(response);
		})
		.catch((error) => {
			console.log(error);
		});
});

server.get('/:idUser/cart', (req, res) => {
	Shopcart.findAll({
		include: [{ model: Product }],
	})
		.then((products) => {
			res.status(201).json(products);
		})
		.catch((err) => console.log(err));
});

server.post('/:idUser/cart', (res, req) => {
	let idUser = req.params.idUser;
	let idProduct = req.body.idProduct;

	Shopcart.findOrCreate({
		where: { idUser: idUser, status: 'open' },
		defaults: { idUser: idUser, status: 'open', price: 0 },
		include: [{ model: Product }],
	})
		.then((orderLine) => {
			orderLine.update({
				idProduct: idProduct,
			});
		})
		.catch((error) => {
			console.log(error);
		});
});

server.delete('/:idUser/cart', (res, req) => {
	let idUser = req.params.idUser;

	Shopcart.destroy({
		where: {
			idUser: idUser,
		},
	})
		.then(() => {
			res.send('Cart deleted');
		})
		.catch((error) => {
			console.log(error);
		});
});

server.put('/:idUser/cart', (req, res) => {
	let idUser = req.params.idUser;

	Shopcart.findOne({
		where: {
			idUser: idUser,
			status: 'open',
		},
	})
		.then((order) => {
			order.update(req.body).then(() => {
				console.log('Cart updated');
			});
		})
		.catch((error) => {
			console.log(error);
		});
});
//Get user Role
server.get('/:idUser/role', (req, res) => {
	let idUSer = req.params.idUser;

	User.findByPk(idUSer).then((user) => {
		res.status(200).send(user.role);
	});
});

//GET user
server.get('/:idUser', (req, res) => {
	let idUSer = req.params.idUser;

	User.findByPk(idUSer).then((user) => {
		res.status(200).send(user);
	});
});

//LOGIN
server.post('/login', (req, res) => {
	let email = req.body.email;
	let pass = SHA256(req.body.password).toString();

	User.findAll({
		where: {
			email: email,
			password: pass,
		},
	}).then((user) => {
		if (user[0] && user[0].role == 'banned') {
			res.status(403).send();
		}
		if (user[0]) {
			admin
				.auth()
				.createCustomToken(user[0].id.toString())
				.then((customToken) => {
					res.status(200).json(customToken);
				})
				.catch((error) => {
					console.log('Error creating custom token:', error);
				});
		} else res.status(401).send('Wrong credentials!');
	});
});

server.get('/login/googleAuth/:email',(req,res)=>{
	var email=req.params.email;
	User.findOrCreate({where:{email:email},defaults:{email:email,password:'defaultPass',role:'user'}}).then(user=>{
		admin
			.auth()
			.createUser({uid:user[0].id,email:user[0].email}).then(()=>{
				admin
					.auth()
					.createCustomToken(user[0].id.toString())
					.then((customToken) => {
						res.status(200).json(customToken);
					})
			})
		.catch((error) => {
			admin
				.auth()
				.createCustomToken(user[0].id.toString())
				.then((customToken) => {
					res.status(200).json(customToken);
				})
		});
	})
})


server.post('/auth/forgot', (req, res) => {
	let email = req.body.email;

	User.findOne({
		where: {
			email: email
		}
	}).then(user => {
		let token = jwt.sign({ "email": user.email }, SECRET_KEY)
		console.log(token);
		mailOptions = {
			from: '"Recuperar contraseña "<boomsounds1@gmail.com',
			to: user.email,
			subject: "Recuperar contraseña",
			html:`
				<h3> Recuperar Contraseña <h3>
				<p>Click <a href='http://localhost:3000/users/reset/${token}'> aqui</a> para recuperar tu contraseña,
				si no solicitaste un cambio de contraseña ignora este mensaje , muchas gracias  </p>
			` 
		}
		transporter.sendMail(mailOptions, (err, info) => {
			console.log(info.envelope);
			console.log(info.messageId);
			res.status(200).json('Email sent')
		})
	}).catch(e => {
		res.status(400).send(e);
	})
})

server.post('/reset/:token', (req, res) => {
	console.log("PASSS : ", req.body.password )
	let token = req.params.token;
	let decode = jwt.decode(token, SECRET_KEY);
	let email = decode.email;
	let pass = SHA256(req.body.password).toString();

	User.findOne({
		where: {
			email: email
		}
	}).then(user => {
		user.update({
			password: pass
		})
	}).then(r => {
		res.status(200).redirect('http://localhost:3000/login');
	}).catch(error => {
		res.status(400).send(error);
	})
})

server.get('/me', (req, res) => {
	let user = firebase.auth().currentUser;

	if (user) {
		res.status(200).json(user);
	}
	else {
		res.status(400).send("Usuario no esta loggeado");
	}
})

/*server.post('/:idUser/idShopcart/checkout-mail', (req, res) => {
	let idUser = req.params.idUser;

	Shopcart.findOne({
		where: {
			idUser: idUser
		},
		include: [{ model: User },
		{ model: Product }]
	}).then(user => {
		mailOptions = {
			from: 'Boom Sounds',
			to: user.email,
			subjet: 'Gracias por su compra!',
			html: '<h1>Boom Sounds</h1>'

		}
		transporter.sendMail(mailOptions => {
			res.status(200).send('Email sent')
		})
	}).catch(error => {
		res.status(400).send(error);
	})
})
*/

module.exports = server;
