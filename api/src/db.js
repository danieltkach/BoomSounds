require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,
	{
		logging: false,
		native: false,
	}
);
const basename = path.basename(__filename);
const modelDefiners = [];

fs
	.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});

modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Product, Category, User, Shopcart, Review, Track } = sequelize.models;

Product.belongsToMany(Category, { through: "product_category" });
Category.belongsToMany(Product, { through: "product_category" });
Shopcart.belongsToMany(Product, { through: "shopcart_product" });
Product.belongsToMany(Shopcart, { through: "shopcart_product" });
User.hasOne(Shopcart);
User.hasMany(Review);
Review.belongsTo(User);
Product.hasMany(Review);
Review.belongsTo(Product);
Track.belongsTo(Product);
Product.hasMany(Track);

module.exports = {
	...sequelize.models,
	conn: sequelize,
};