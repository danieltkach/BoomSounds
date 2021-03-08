const mercadopago = require('mercadopago');
const server = require('express').Router()
const { Shopcart, User } = require('../db')
const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
	access_token: ACCESS_TOKEN
});

server.post("/", (req, res) => {
	const id_orden = req.body.idOrder;
	const id_user = req.body.idUser;
	let preference = {
		items: [
			{
				title: 'Musica de Boomsounds',
				unit_price: Number(req.body.total),
				quantity: 1
			}
		],
		external_reference: `${id_orden}`,
		payment_methods: {
			excluded_payment_types: [
				{
					id: "atm",
				}
			],
			installments: 3  //Cantidad máximo de cuotas
		},
		back_urls: {
			success: `http://localhost:3001/mercadopago/pagos/${id_user}`,
			failure: `http://localhost:3001/mercadopago/pagos/${id_user}`,
			pending: `http://localhost:3001/mercadopago/pagos/${id_user}`,
		},
	};

	mercadopago.preferences.create(preference)

		.then(function (response) {

			global.id = response.body.id;
			res.redirect(response.body.init_point)
		})
		.catch(function (error) {
			console.log(error);
			res.status(400).send('Error')
		})
})

server.get('/pagos/:id', function (req, res) {
	const payment_id = req.query.payment_id
	const payment_status = req.query.status
	const external_reference = req.query.external_reference
	console.log("EXTERNAL REFERENCE ", external_reference)

	if (payment_status === 'null') { res.redirect('http://localhost:3000/shopCart') }
	else {
		Shopcart.findByPk(external_reference)
			.then(r => {
				r.update({
					status: 'completed',
					payment_id: payment_id,
					payment_status: payment_status
				})
			})
			.then(() => {
				User.findByPk(req.params.id).then(foundUser => {
					foundUser.createShopcart({ status: 'open' })
					res.redirect('http://localhost:3000/')
				})
			})
			.catch(err => console.log(err))
	}
})

module.exports = server