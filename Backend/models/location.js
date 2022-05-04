const { DataTypes } = require('sequelize');
const db = require('../config/database-config')

const location = db.define('locations',{
    userId:{
        type:DataTypes
    },
    location:{
        type:DataTypes.STRING
    }
});


module.exports = location