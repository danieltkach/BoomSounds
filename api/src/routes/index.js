const { Router } = require('express');
const productRouter = require('./product.js');
const categoryRouter = require('./categories.js')
const userRouter = require('./user')
const ShopcartRouter = require('./shopcart')
const mercadoPagoRouter = require('./mercadopago')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/users', userRouter);
router.use('/shopcart', ShopcartRouter);
router.use('/mercadopago' , mercadoPagoRouter);

module.exports = router;