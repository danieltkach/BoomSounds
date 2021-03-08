const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('track', {
		name: {
			type: DataTypes.TEXT
		},
		audioUrl: {
			type: DataTypes.TEXT
		},
		duration: {
			type: DataTypes.INTEGER
		},
		description: {
			type: DataTypes.TEXT
		}
	})
}