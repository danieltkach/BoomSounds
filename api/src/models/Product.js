const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("product", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		artist: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		views: {
			type: DataTypes.INTEGER,
			defaultvalue: 0,
		},
		imgUrl: {
			type: DataTypes.STRING,
		},
		length: {
			type: DataTypes.INTEGER,
		},
		rating: {
			type: DataTypes.INTEGER,
			validate: {
				is: /^[1-5]$/,
			},
		},
		audioUrl: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});
};
