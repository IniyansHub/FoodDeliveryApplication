const { DataTypes } = require('sequelize');
const db = require('../config/database-config')

const menu = db.define('menus',{
    menu_id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'menu_id'
    },
    hotelId:{
        type:DataTypes.INTEGER
    },
    hotelName:{
        type:DataTypes.STRING
    },
    dishes:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.INTEGER
    }
});

module.exports = menu;