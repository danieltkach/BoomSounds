const { Product, Categories, User, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('MODELS TEST',()=>{
  //Product Model Test
  describe('Product model', () => {
    //Before testing try to connect to DB
    before(() => conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      })
    );
    
    describe('Validators ->', () => {
      //Before each field wipe Product table
      beforeEach(() => Product.sync({ force: true }));

      describe('Name', () => {
        it('should throw an error if name is null', (done) => {
          Product.create({
            price:150,
            stock:0
          })
            .then(() => done(new Error('It requires a valid name')))
            .catch(() => done());
        });
        it('should work when its a valid name', () => {
          Product.create({ 
            name: 'Producto',
            price:150,
            stock:0
          });
        });
      });

      describe('Price', () => {
        it('should throw an error if price is null', (done) => {
          Product.create({
            name:'Producto',
            stock:0
          })
            .then(() => done(new Error('It requires a valid price')))
            .catch(() => done());
        });
        it('should work when its a valid price', () => {
          Product.create({ 
            name: 'Producto',
            price:150,
            stock:0
          });
        });
      });

      describe('Stock', () => {
        it('should throw an error if stock is null', (done) => {
          Product.create({
            name:'Producto',
            price:150
          })
            .then(() => done(new Error('It requires a valid stock')))
            .catch(() => done());
        });
        it('should work when its a valid stock', () => {
          Product.create({ 
            name: 'Producto',
            price:150,
            stock:0
          });
        });
      });

    });
  });

  //Categories Model Test
  describe('Categories model',()=>{
    //Before testing try to connect to DB
    before(() => conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      })
    );

    describe('Validators ->',()=>{
      //Before each field wipe Product table
      beforeEach(() => Categories.sync({ force: true }));

      describe('Name', () => {
        it('should throw an error if name is null', (done) => {
          Categories.create({
          })
            .then(() => done(new Error('It requires a valid name')))
            .catch(() => done());
        });
        it('should work when its a valid name', () => {
          Categories.create({ 
            name: 'Category',
            description:'This is a test Category'
          });
        });
      });
    })
  })

  //User Model
  describe('User model',()=>{
    //Before testing try to connect to DB
    before(() => conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      })
    );

    describe('Validators ->',()=>{
      //Before each field wipe Product table
      beforeEach(() => User.sync({ force: true }));

      describe('Email',()=>{
        it('should throw an error if email is null',(done)=>{
          User.create({
            password:'validPassword',
            roleId:1
          }).then(()=>done(new Error('It requires an email!')))
            .catch(()=>done())
        });

        it('should throw an error if email is invalid',(done)=>{
          User.create({
            email:'invalidEmail',
            password:'validPassword',
            roleId:1
          }).then(()=>{done(new Error('It requires a valid email'))})
            .catch(()=>{done()})
        });

        it('should work with a valid email',()=>{
          User.create({
          email:'valid@email.com',
          password:'validpass',
          roleId:1
          })
        });
      })

      describe('Password',()=>{
        it('show throw an error if password is null',(done)=>{
          User.create({
            email:'valid@email.com',
            roleId:1
          }).then(()=>done(new Error('It requires a password!')))
            .catch(()=>done())
        });

        it('should throw an error if password is invalid',(done)=>{
          User.create({
            email:'valid@email.com',
            password:'invalidPassword',
            roleId:1
          }).then(()=>done(new Error('Password must be 6-10 characters!')))
            .catch(()=>done())
        });

        it('should work with a valid password',()=>{
          User.create({
            email:'valid@email.com',
            password:'validpass',
            roleId:1
          })
        })
      })

      describe('RoleID',()=>{
        it('should throw an error if roleId is null',(done)=>{
          User.create({
            email:'valid@email.com',
            password:'validpass'
          }).then(()=>done(new Error('It requires a roleId!')))
            .catch(()=>done())
        });

        it('should work with a roleId',()=>{
          User.create({
            email:'valid@email.com',
            password:'validpass',
            roleId:1
          })
        })
      })
    })
  })
  


});

