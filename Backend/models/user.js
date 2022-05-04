const { DataTypes } = require('sequelize');
const db = require('../config/database-config')

const user = db.define('user',{
    username:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }
});


module.exports=user