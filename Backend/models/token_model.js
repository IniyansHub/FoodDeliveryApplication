const { DataTypes } = require('sequelize');
const db = require('../config/database-config')

const token_model = db.define('refreshtokens',{
    userId:{
        type:DataTypes
    },
    refreshToken:{
        type:DataTypes.STRING
    }
});
 

module.exports = token_model