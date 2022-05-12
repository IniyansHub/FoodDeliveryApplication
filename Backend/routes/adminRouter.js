const express = require('express');
const adminRouter = express.Router();
const user = require('../models/user');
const location = require('../models/location')
const hotel = require('../models/hotel')
const menu = require('../models/menu')
const token_model = require('../models/token_model')
const bcrypt = require('bcrypt')
const cors = require('cors');
const jwtTokenGenerator = require('../Jwt_helper/tokenGenerator')
const passport = require('passport');
require('../Middlewares/passport');

adminRouter.use(express.json())
adminRouter.use(cors())

//routes for users starts

adminRouter.get('/users', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    userList = await user.findAll({
        where: { isAdmin: 0 },
        attributes: {exclude: ['password']},
    })
    res.status(200).json(userList)
})

adminRouter.put('/users/:id', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    const { newEmail } = req.body;
    await user.update(
        {
            username:newEmail
        },
        {
            where:{id:req.params.id}
        }
    ).then(msg => {
        if (msg == 1) res.status(200).json({ "Message": "Updation successfull" })
        else res.status(400).json({"Message":`Cannot update user's email with id ${req.params.id}. Maybe user not found or req.body is empty`})
    })
        
});


adminRouter.delete('/users/:id', passport.authenticate('accesstoken', { session: false }), async (req, res) => {

    user.destroy({ where: { id: req.params.id } })
        .then(msg => {
            if (msg == 1) res.status(200).json({ "Message": "User account deleted successfully!" })
            else {
                res.status(400).json({"Message":`Cannot delete user account with id ${req.params.id}. Maybe user not found or req.body is empty`})
            }
    })

})

//routes for user ends




module.exports = adminRouter