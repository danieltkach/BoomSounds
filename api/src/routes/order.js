const server = require("express").Router();
const { Order } = require("../db.js");

server.post("/", (req, res) => {
	Order.create(req.body)
		.then(() =>
			res.status(200).send("ok"))
		.catch(err =>
			res.send(err))
})
server.get("/", (req, res) => {
	Order.findAll()
		.then(r =>
			res.send(r))
		.catch(err => {
			res.send(err)
		})
})

server.get("/:id", (req, res) => {
	Order.findByPk(req.params.id)
		.then(r => {
			res.send(r)
		})
		.catch(() =>
			res.send("error"))
})

server.put("/:id", (req, res) => {
	Order.findByPk(req.params.id)
		.then(orden => {
			orden.update(req.body)
				.then(() => {
					res.send("Orden Modified")
				})
				.catch(() => {
					res.status(400).send("Error updating product!");
				});
		})
})





module.exports = server;