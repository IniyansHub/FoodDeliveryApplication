const jwt = require('jsonwebtoken')
require('dotenv').config();

genAccessToken = userId =>{
    return jwt.sign({
        iss:'iniyan',
        sub:userId,
        iat:Math.floor(Date.now()/1000),
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'5s'
    });

}

genRefreshToken = userId =>{
    return jwt.sign({
        iss:'iniyan',
        sub:userId,
        iat:Math.floor(Date.now()/1000),
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:'5m'
    });
}

module.exports = {
    genAccessToken,
    genRefreshToken
}

