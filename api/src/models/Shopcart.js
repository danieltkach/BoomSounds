const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("shopcart", {
		status: {
			type: DataTypes.ENUM('open','completed','cancelled'),
			allowNull: false
		},
		payment_id:{
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: true
		},
		payment_status:{
			type: DataTypes.STRING,
			defaultValue: '',
		}
	});
};
