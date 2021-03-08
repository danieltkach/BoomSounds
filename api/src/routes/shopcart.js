const server = require('express').Router();
const { Shopcart, Product, User } = require('../db.js');
const { all } = require('./product.js');

// Agragar carrito
server.post('/', (req, res) => {
	Shopcart.create(req.body)
		.then(() => res.status(200).send('ok'))
		.catch((err) => res.send(err));
});

//Obtener todas las  carritos
server.get('/', (req, res) => {
	Shopcart.findAll()
		.then((r) => res.send(r))
		.catch((err) => {
			res.send(err);
		});
});
//obtener todos los carritos con products
server.get('/products', (req, res) => {
	Shopcart.findAll({include:Product})
		.then((r) => res.send(r))
		.catch((err) => {
			res.send(err);
		});
});


//Obterner ID de carrito por userID
server.get('/user/:id', (req, res) => {
	Shopcart.findAll({
		where: {
			userId: req.params.id,
			status: 'open',
		},
	}).then((shopcart) => {
		res.status(200).send(shopcart[0].id.toString());
	});
});


server.get('/user/:userId/completed', (req, res) => {
	Shopcart.findAll(
		{
			where: {
				userId: req.params.userId,
				status: 'completed'
			},
			include: [Product],
		}
	).then(shopcart => {
		res.status(200).send(shopcart)
	})
});

//retornar shopcarts por status
server.get('/status/:status', (req, res) => {
	Shopcart.findAll({
		where: { status: req.params.status },
		include: Product,
	}).then((r) => res.status(200).send(r));
});

//Obtener carrito por id (query to include or not Products)
server.get('/:id', (req, res) => {
	var include = req.query.includeProducts;
	if (include) {
		Shopcart.findOne({
			where: { id: req.params.id },
			include: Product,
		})
			.then((carrito) => {
				res.status(200).json(carrito);
			})
			.catch((err) => res.status(400).send(err));
	} else {
		Shopcart.findByPk(req.params.id)
			.then((r) => {
				res.send(r);
			})
			.catch(() => res.send('error'));
	}
});

// Operaciones shopcart-product

// Añadir Producto a Carrito (AddToCart BTN)
server.post('/:idCarrito/product/:idProduct', (req, res) => {
	let { idProduct, idCarrito } = req.params;

	Shopcart.findByPk(idCarrito).then((carrito) => {
		carrito
			.addProduct(idProduct)
			.then(() => res.status(200).send('Product added!'))
			.catch((err) => {
				res.status(400).send('Not added! - Error: ' + err);
			});
	});
});

//Retornar solo los productos de un  Carrito
server.get('/productInCart/:id', (req, res) => {
	Shopcart.findOne({
		where: { id: req.params.id },
		include: Product,
	})
		.then((shopcart) => {
			res.status(200).send(shopcart.products);
		})
		.catch((err) => res.status(400).send(err));
});

//Eliminar todos los productos
server.delete('/deleteAllProducts/:id', (req, res) => {
	Shopcart.findOne({
		where: { id: req.params.id },
		include: Product,
	})
		.then((shopcart) => {
			var array = [];
			shopcart.products.map((p) => array.push(p.id));
			shopcart.removeProducts(array);
			res.send(array);
		})
		.catch((err) => res.send(err));
});

//borrar un producto de un carrito
server.delete('/:idShopcart/deleteOneProduct/:idProduct', (req, res) => {
	Shopcart.findOne({
		where: { id: req.params.idShopcart },
		include: Product,
	})
		.then((r) => {
			r.removeProduct(req.params.idProduct);
			res.send(req.params.idProduct);
		})
		.catch((err) => res.send(err));
});

//Modifica el status de un elemento por id
//(pasar :status por params como "open","completed" o "cancelled")
//Y abre un nuevo carrito para el usuario con status open
server.put('/:userId/setStatus/:status/:id', (req, res) => {
	//Buscamos el carrito indicado por id
	Shopcart.findByPk(req.params.id)
		.then((r) => {
			//Actualizamos el status del carrito
			r.update({ status: req.params.status });
		})
		.then((response) => {
			//Abrimos un nuevo carrito para el usuario pasado por userId
			User.findByPk(req.params.userId).then((foundUser) => {
				foundUser.createShopcart({ status: 'open' });
				res.send("ok")
			})
			
		})
		.catch((err) => res.send(err));
});
//Modificar el estado de una orden

server.put('/setOrder/:id/:status', (req, res) => {
	Shopcart.findByPk(req.params.id)
		.then((rta) => {
			rta.update({ state: req.params.status })
		})
		.then(res.send('Shopcart updated'))
		.catch(rta => res.send(rta))
});

module.exports = server;
