const server = require('express').Router()
const { Product, Category, Review, User, Track } = require('../db.js')

//Buscar producto por categoria
server.get('/categoria/:nombreCat', (req, res, next) => {
	//Encode the '+' from the URL to spaces
	var category = req.params.nombreCat.replace('+', ' ')
	//Find all products whose category match the param
	Product.findAll({
		include: [
			{
				model: Category,
				where: [{ name: category }],
			},
		],
	})
		.then((products) => {
			res.status(201).json(products)
		})
		.catch(next)
})

//Create Product
server.post('/', (req, res) => {
	Product.create(req.body)
		.then((prod) => {
			res.status(200).json(prod)
		})
		.catch(() => {
			return res.status(400).send('Missing Data!')
		})
})

//Return all Products
server.get('/', (req, res, next) => {
	Product.findAll({
		include: Category,
	})
		.then((products) => {
			res.send(products)
		})
		.catch(next)
})

//Update product
server.put('/:id', (req, res) => {
	Product.findOne({
		where: {
			id: req.params.id,
		},
	}).then((product) => {
		product
			.update(req.body)
			.then(() => {
				res.status(201).send('Product updated!')
			})
			.catch((r) => {
				res.status(400).send('Error updateing product!')
			})
	})
})

//Delete product
server.delete('/:id', (req, res) => {
	Product.destroy({
		where: { id: req.params.id },
	})
		.then(() => {
			return res.status(204).send("Deleted")
		})
		.catch((err) => {
			res.status(400).send(err)
		})
})

//get product by id
server.get('/id/:id', (req, res) => {
	Product.findOne({
		include: [
			{
				model: Category
			},
			{
				model: Track
			}
		],
		where: { id: req.params.id }
	}).then((r) => {
		res.status(200).send(r)
	})
})

server.get('/searchKey', (req, res) => {
	var matchingProducts = []
	Product.findAll()
		.then((products) => {
			products.forEach((product) => {
				if (
					(product.description &&
						product.description.toLowerCase().search(req.query.q) !== -1) ||
					product.name.toLowerCase().search(req.query.q) !== -1
				) {
					matchingProducts.push(product)
				}
			})
		})
		.then(() => {
			console.log(matchingProducts)
			res.send(matchingProducts)
		})
		.catch((err) => {
			console.log(err)
		})
})

server.post('/:idProduct/category/:idCategory', (req, res) => {
	let { idProduct, idCategory } = req.params

	console.log('in category POST ', idProduct, idCategory);

	Product.findByPk(idProduct)
		.then((product) => {
			product.addCategory(idCategory)
		})
		.then(() => res.status(200).send(idProduct))
		.catch(() => {
			res.status(400).send('Not added!')
		})
})


server.delete('/:idProduct/deleteCategory/:idCategory', (req, res) => {
	let { idProduct, idCategory } = req.params

	Product.findByPk(idProduct)
		.then((product) => {
			product.removeCategory(idCategory)
		})
		.then(() => res.status(200).send('Category removed!'))
		.catch(() => {
			res.status(400).send('Not removed!')
		})
})

server.get('/testing/:id', (req, res) => {
	Product.findOne({
		where: { id: req.params.id },
		include: Category,
	})
		.then((product) => {
			res.status(200).send(product)
		})
		.catch((err) => res.status(400).send(err))
})

// agregar una categoria por id al momento de ser creado
server.post("/categoryId/:id", (req, res) => {
	Product.create(req.body)
		.then(product => {
			product.addCategory(req.params.id)
		})
		.then(r => res.send(r))
		.catch(err => res.send(err))
})

//Agregar varias categorias a un producto al momento de crearse, pasar por body array con ids de categorias,ej:"idCategories":"[1,2,3,4]"
server.post("/categoriesIds", (req, res) => {
	Product.create(req.body)
		.then(product => {
			product.addCategories(req.body.idCategories)
		})
		.then(() => {
			res.send("ok")
		})
		.catch(err => res.send(err))
})


//S54 : Crear ruta para crear/agregar Review
server.post("/:id/review", (req, res) => {
	Review.create({
		description: req.body.description,
		rating: req.body.rating,
		productId: req.params.id,
		userId: req.body.userId
	})
		.then(rev => {
			res.json(rev);
		})
		.catch(error => {
			res.status(400).json(error);
		})
})

// Add track
server.post('/:id/track', (req, res) => {
	Track.create({
		name: req.body.name,
		audioUrl: req.body.audioUrl,
		productId: req.params.id
	})
		.then(track => {
			res.json(track);

		})
		.catch(e => {
			res.status(400).json(e);
		})
});

// Get all tracks
server.get('/:id/track', (req, res) => {
	Track.findAll({
		where: {
			productId: req.params.id
		},
		include: [{
			model: Product
		}]
	})
		.then(t => {
			res.status(200).json(t)
		}
		)
		.catch(e => {
			res.status(400).json(e);
		})
});


//S55 : Crear ruta para Modificar Review
server.put("/:id/review/:idReview", (req, res) => {
	Review.findOne({
		where: {
			productId: req.params.id,
			reviewId: req.params.idReview
		}
	})
		.then(review => {
			review.update({
				description: req.body.description,
				rating: req.body.rating
			})
		})
		.then(rev => {
			res.status(200).json(rev);
		})
		.catch(error => {
			res.status(400).json(error);
		})
})


//S56 : Crear Ruta para eliminar Review
server.delete("/:id/review/:idReview", (req, res) => {
	Review.destroy({
		where: {
			productId: req.params.id,
			Id: req.params.idReview
		}
	})
		.then(deleted => {
			res.status(200).json(deleted);
		})
		.catch(error => {
			res.status(400).json(error)
		})
})


//S57 : Crear Ruta para obtener todas las reviews de un producto.
server.get("/:id/review", (req, res) => {
	Review.findAll({
		where: {
			productId: req.params.id
		},
		include: [{
			model: Product,
			model: User
		}]
	})
		.then(rev => {
			res.status(200).json(rev);
		})
		.catch(error => {
			res.status(400).json(error);
		})
})

module.exports = server
