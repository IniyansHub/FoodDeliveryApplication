const { DataTypes } = require('sequelize');
const db = require('../config/database-config')

const order = db.define('orders',{
    orderId:{
        type:DataTypes.BIGINT(10),
        primaryKey: true
    },
    mobile:{
        type:DataTypes.BIGINT(10)
    },
    address:{
        type:DataTypes.STRING
    },
    foods:{
        type:DataTypes.STRING
    },
    totalPrice: {
        type:DataTypes.INTEGER
    },
    userId: {
        type:DataTypes.INTEGER
    }
});

module.exports = order;