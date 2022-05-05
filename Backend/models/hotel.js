const { DataTypes } = require('sequelize');
const db = require('../config/database-config')

const hotel = db.define('hotels',{
    hotelName:{
        type:DataTypes.STRING
    },
    categoryId:{
        type:DataTypes.INTEGER
    },
    categoryType:{
        type:DataTypes.STRING
    }
});

module.exports = hotel;