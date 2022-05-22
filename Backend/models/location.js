const { DataTypes } = require('sequelize');
const db = require('../config/database-config')

const location = db.define('locations',{
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    mobileNumber:{
        type: DataTypes.BIGINT(10),
        allowNull:false
    },
    address: {
        type: DataTypes.STRING,
        allowNull:false
    }, 
    landmark: {
        type: DataTypes.STRING,
        allowNull:false
    }

});


module.exports = location