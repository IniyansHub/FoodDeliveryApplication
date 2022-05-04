const passport = require('passport')
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const user = require('../models/user')
require('dotenv').config();

passport.use('accesstoken',new JWTStrategy({
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.ACCESS_TOKEN_SECRET
},async (jwtPayload,done)=>{
    return await user.findOne({where:{id:jwtPayload.sub}})
                .then(user=>{
                    return done(null,jwtPayload);
                })
                .catch(err=>{
                    return done(err);
                });
    }
))

passport.use('refreshtoken',new JWTStrategy({
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.REFRESH_TOKEN_SECRET
},async (jwtPayload,done)=>{
    return await user.findOne({where:{id:jwtPayload.sub}})
                .then(user=>{
                    return done(null,jwtPayload);
                })
                .catch(err=>{
                    return done(err);
                });
    }
))
