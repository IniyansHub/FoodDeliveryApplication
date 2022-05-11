const { DataTypes } = require('sequelize');
const db = require('../config/database-config')

const hotel = db.define('hotels',{
    hotelId:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    hotelName:{
        type:DataTypes.STRING
    },
    categoryId:{
        type:DataTypes.INTEGER
    },
    categoryType:{
        type:DataTypes.STRING
    },
    hotelImage: {
        type:DataTypes.STRING
    }
});

module.exports = hotel;