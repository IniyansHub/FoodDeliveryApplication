const { DataTypes } = require('sequelize');
const db = require('../config/database-config')

const category = db.define('categories',{
    categoryId:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryName:{
        type:DataTypes.STRING
    },
    image1:{
        type:DataTypes.INTEGER
    },
    image2:{
        type:DataTypes.STRING
    },
    image3: {
        type:DataTypes.STRING
    },
    categoryDescription: {
        type:DataTypes.STRING
    }
});


module.exports = category