const express = require('express');
const adminRouter = express.Router();
const user = require('../models/user');
const hotel = require('../models/hotel')
const menu = require('../models/menu')
const cors = require('cors');
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

adminRouter.put('/updateuser/:id', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    const { newEmail,isAdmin } = req.body;
    await user.update(
        {
            username: newEmail,
            isAdmin:isAdmin
        },
        {
            where:{id:req.params.id}
        }
    ).then(msg => {
        if (msg == 1) res.status(200).json({ "Message": "Updation successfull" })
        else res.status(400).json({"Message":`Cannot update user's email with id ${req.params.id}. Maybe user not found or req.body is empty`})
    }).catch(err=>{console.log(err)})
        
});




adminRouter.delete('/deleteuser/:id', passport.authenticate('accesstoken', { session: false }), async (req, res) => {

    user.destroy({ where: { id: req.params.id } })
        .then(msg => {
            if (msg == 1) res.status(200).json({ "Message": "User account deleted successfully!" })
            else {
                res.status(400).json({"Message":`Cannot delete user account with id ${req.params.id}. Maybe user not found or req.body is empty`})
            }
    })

})

//routes for user ends

//routes for category and hotels starts
adminRouter.get('/hotel',passport.authenticate('accesstoken', { session: false }), async(req,res)=>{
    const hotelData =  await hotel.findAll()
     res.status(200).json(hotelData)
 })
 
adminRouter.get('/hotel/:id',passport.authenticate('accesstoken', { session: false }), async(req,res)=>{
     const hotelData =  await hotel.findAll({where:{categoryId:req.params.id}})
     return res.status(200).json(hotelData)
})

adminRouter.post('/addhotel', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    
    const { hotelName, categoryId, categoryType, imageRef } = req.body;

    if (hotelName == undefined || categoryId == undefined || categoryType == undefined || imageRef == undefined) {
        return res.status(400).json({"Message":"Provide all the data to create a new hotel record"})
    }
    
    const isHotelExists = (await hotel.findOne({ where: { hotelName: hotelName } })) ? true : false;

    if (isHotelExists) return res.status(409).json({ "Message": "Hotel with this name exists already" })
    
    await hotel.create({ hotelName: hotelName, categoryId: categoryId, categoryType: categoryType, hotelImage: imageRef })
    .then(record=>{res.status(201).json({"Message":"New hotel addedd successfully"})})
    .catch(err => { res.status(422).json({ "Message": "Unable to create a new record for the hotel" })})
    
})
 
adminRouter.put('/updatehotel/:id', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    
    const { hotelName, categoryId, categoryType, imageRef } = req.body;

    if (hotelName == undefined || categoryId == undefined || categoryType == undefined || imageRef == undefined) {
        return res.status(400).json({"Message":"Provide all the data to update a hotel record"})
    }

    const isHotelExists = (await hotel.findOne({ where: { hotelName: hotelName } })) ? true : false;

    if (isHotelExists) return res.status(409).json({ "Message": "Hotel with this name exists already" })

    await hotel.update(
        {
            hotelName: hotelName,
            categoryId: categoryId,
            categoryType: categoryType,
            hotelImage:imageRef
        },
        {
            where:{hotelId:req.params.id}
        }
    ).then(updated => {
        if (updated == 1) return res.status(200).json({ "Message": "updation successfull" });
    }).catch(err => {
        return res.status(202).json({"Message":"unable to update the record"})
    })

})


adminRouter.delete('/deletehotel/:id', passport.authenticate('accesstoken', { session: false }), async (req, res) => {

    await hotel.destroy({ where: { hotelId: req.params.id } })
        .then(msg => {
            if (msg == 1)
                menu.destroy({ where: { hotelId: req.params.id } })
                    .then(msg => {
                        if (msg == 1) res.status(200).json({ "Message": "hotel deleted successfully!" })
                    }).catch(err => {
                        res.status(404).json({"Message":"Hotel deleted successfully but no menu found for this hotel to delete"})
            })
        }).catch(err => {
        res.status(404).json({"Message":"Not hotel found with this id "+req.params.id})
    })

})
//routes for hotels ends

//routes for menu starts
adminRouter.post('/addmenu', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    const { hotelId, hotelName, dish, price } = req.body;

    if (hotelName == undefined || hotelId == undefined || dish == undefined || price == undefined){
        return res.status(400).json({"Message":"Provide all the data to create a menu record"})
    }

    const isMenuExists = (await menu.findOne({ where: { dishes: dish } })) ? true : false;

    if (isMenuExists) return res.status(409).json({ "Message": "Menu already exists in your list" })
    
    await menu.create({ hotelId: hotelId, hotelName: hotelName, dishes: dish, price: price })
    .then(record=>{return res.status(201).json({"Message":"New menu addedd successfully"})})
    .catch(err => {return res.status(422).json({ "Message": "Unable to create a new record for the menu table" })})

})

adminRouter.put('/updatemenu', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    const { menuId, dish, price } = req.body;

    if (dish == undefined || price == undefined || menuId==undefined){
        return res.status(400).json({"Message":"Provide all the data to update a menu record"})
    }

    const isMenuExists = (await menu.findOne({ where: { dishes: dish } })) ? true : false;

    if (isMenuExists) {
        
        await menu.update(
            {
                dishes: dish,
                price: price
            },
            {

                where: { menuId: menuId }
            
            }
        )
            .then(record => { return res.status(201).json({ "Message": "Menu updated successfully" }) })
            .catch(err => { return res.status(422).json({ "Message": "Unable to update menu "+err }) })
    } else {
        return res.status(404).json({ "Message": "Menu not found!" });
    }

})

adminRouter.delete('/deletemenu/:id', passport.authenticate('accesstoken', { session: false }), async (req, res) => {

    await menu.destroy({ where: { menuId: req.params.id } })
        .then(msg => {
            if (msg == 1) return res.status(200).json({"Message":"Deleted the menu with Id:"+req.params.id})
        }).catch(err => {
            return res.status(404).json({ "Message": "Unable to delete the menu" })
        })

})

module.exports = adminRouter