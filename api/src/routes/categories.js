const server = require('express').Router()

const { Category } = require('../db.js');

// Create Category

server.get('/', (req, res) => {
	Category.findAll()
		.then(data => {
			res.json(data);
		})
		.catch(console.log())
})

server.post('/', (req, res) => {
	Category.create(req.body)
		.then(() => {
			res.status(200).send("Categoria creada")
		})
		.catch(() => {
			res.status(404).send("No pudo crearse la categoria")
		})
})

// Modify Category

server.put('/:id', (req, res) => {
	Category.findOne({
		where: {
			id: req.params.id
		}
	})
		.then(category => {
			category.update(req.body)
				.then(() => {
					res.status(200).send('Categoria modificada')
				})
				.catch(() => {
					res.status(400).send('No se pudo modificar la categoria')
				})
		})
})

// Delete category

server.delete('/:id', (req, res) => {
	Category.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(() => {
			res.status(200).send('Categoria borrada')
		})
		.catch(() => {
			res.status(400).send('Error al borrar la categoria')
		})
})

module.exports = server;