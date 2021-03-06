const express = require('express');
const router = express.Router();
const user = require('../models/user');
const location = require('../models/location')
const category = require('../models/category')
const hotel = require('../models/hotel')
const menu = require('../models/menu')
const order = require('../models/order')
const token_model = require('../models/token_model')
const bcrypt = require('bcrypt')
const cors = require('cors');
const jwtTokenGenerator = require('../Jwt_helper/tokenGenerator')
const passport = require('passport');
require('../Middlewares/passport');
router.use(express.json())
router.use(cors())

router.post('/token', passport.authenticate('refreshtoken', { session: false }), async (req, res) => {

    refreshTokenFromHeader = req.headers.authorization.split(' ')[1];

    const isTokenExist = await token_model.findOne({ where: { refreshToken: refreshTokenFromHeader } }) ? true : false;

    if (isTokenExist) {
        const access_token = jwtTokenGenerator.genAccessToken(req.user.sub)
        res.status(201).json({ access_token: access_token })
    } else {
        res.status(404).json({"message":"Token not found!"})
    }
})

router.post('/signup', async (req, res) => {

    const { username, password } = req.body;

    if (username == undefined || password == undefined || username == null || password == null)
        return res.status(400).json({ "message": "Invalid username and password" })

    const isUserExist = (await user.findOne({ where: { username: username } })) ? true : false;

    if (isUserExist) {
        return res.status(409).json({ "message": "User with this email exists already!" });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await user.create({ username: username, password: hashedPassword }); 
        return res.status(201).json(createdUser);
    }
})



router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    const userFound = await user.findOne({ where: { username: username } });

    if (userFound == null) {
        return res.status(400).send("Invalid email or password")
    }

    if (userFound != null) {
        bcrypt.compare(password, userFound.password).then(isValid => {
            if (!isValid) {
                return res.status(404).json({"message":"User not found!"})
            } else {
                
                const access_token = jwtTokenGenerator.genAccessToken(userFound.id);

                const refresh_token = jwtTokenGenerator.genRefreshToken(userFound.id);

                token_model.findOne({ where: { userId: userFound.id } })
                    .then(records => {
                        if (records == null) {
                            token_model.create({ userId: userFound.id, refreshToken: refresh_token })
                        } else {
                            token_model.update({ refreshToken: refresh_token }, { where: { userId: userFound.id } })
                                .then(msg => {
                                    
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    })

                return res.status(200).send({
                    access_token: access_token,
                    refresh_token: refresh_token,
                    isAdmin: userFound.isAdmin,
                    userId:userFound.id
                })

            }
        })
    }
})

router.put('/addlocation', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    const { mobile, address, landmark } = req.body;

    await location.update(
        {
            userId: req.user.sub,
            mobileNumber: mobile,
            address: address,  
            landmark: landmark
  
        },
        {
            where: {userId: req.user.sub}
        }
    )
    .then(
            async (result) => {
                if (result== 1) res.status(200).json({ "Message": "Location updated successfully" })
                else {
                    await location.create({ userId: req.user.sub, mobileNumber: mobile, address: address, landmark: landmark })
                        .then(created => {
                            res.status(201).json({ "message": "Location addedd successfully!" });
                        })
                        .catch(err => {
                            res.status(209).json({"Message":"No changes in data"}) 
                        })
                    
                }
            }
        )
    .catch(err => {
        console.log(err)
    })
    
})


router.get('/getlocation', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    const locations = await location.findOne({ where: { userId: req.user.sub } })
    res.status(200).send(locations)
})

router.get('/category', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    await category.findAll().then(categories => {
        res.status(200).json(categories)
    }).catch(err => {
        res.status(404).json({"Message":"Unable to fetch categories from the database"})
    })
    
})

router.get('/hotel',passport.authenticate('accesstoken', { session: false }), async(req,res)=>{
   const hotelData =  await hotel.findAll()
    res.status(200).json(hotelData)
})

router.get('/hotel/:id',passport.authenticate('accesstoken', { session: false }), async(req,res)=>{
    const hotelData =  await hotel.findAll({where:{categoryId:req.params.id}})
    return res.status(200).json(hotelData)
 })

router.get('/menu/:id', passport.authenticate('accesstoken', { session: false }) , async(req,res)=>{
    const menuData = await menu.findAll({where:{hotelId:req.params.id}})
    res.status(200).json(menuData)
})
 
router.get('/authorize', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    res.status(200).json("Authorized");
})

router.delete('/logout', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    token_model.destroy({
        where: { userId: req.user.sub },
        truncate: true 
    })
    res.status(200).json({"message":"Logged out successfully!"})
})

router.post('/addorder', passport.authenticate('accesstoken', { session: false }), async (req, res) => { 
    const { orderId, mobile, address, foods, total } = req.body;
    order.create({ orderId: orderId, mobile: mobile, address: address, foods: foods, totalPrice: total, userId: req.user.sub })
        .then((result) => {
            res.status(201).json({"Message":"order created successfully"})
        }) 
        .catch((err) => {
            res.status(400).json({"Message":"Unable to create an order"})
        })
})

router.get('/getorder', passport.authenticate('accesstoken', { session: false }), async (req, res) => { 

    order.findAll({ where: { userId: req.user.sub } })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json({"Message":"No record found"})
        })
})




module.exports = router