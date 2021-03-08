/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Product, conn } = require('../../src/db.js');

const agent = session(app);
const product = {
  name:'Test Product',
  price:150,
  stock:1,
  description:'This is a test product!'
};

xdescribe('PRODUCT routes', () => {
  //Authentication to DB
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  //Clean DB & initialize Product
  beforeEach(() => Product.sync({ force: true })
  .then(() => Product.create(product)));

  describe('GET /products', () => {
    it('should get 200', () => 
      agent.get('/products/').expect(200)
    );
  });
  describe('POST /products',()=>{
    it('should get 200',()=>{
      return agent.post('/products')
        .send({
          name:'Test Producyt',
          price:150,
          stock:1,
          description:'This is a test product!'
        })
        .expect(200);
    });
  })
});