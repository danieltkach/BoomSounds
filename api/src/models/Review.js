const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("review", {
        description: {
            type: DataTypes.TEXT,
            validate: {
                len: [1, 1000]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
				is: /^[1-5]$/
			}
        }
    })
}