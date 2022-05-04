const express = require('express');
const router = express.Router();
const user = require('./models/user');
const location = require('./models/location')
const token_model = require('./models/token_model')
const bcrypt = require('bcrypt')
const cors = require('cors');
const jwtTokenGenerator = require('./Jwt_helper/tokenGenerator')
const passport = require('passport');
require('./Middlewares/passport');
router.use(express.json())
router.use(cors())

router.get('/token', passport.authenticate('refreshtoken', { session: false }), async (req, res) => {

    refreshTokenFromHeader = req.headers.authorization.split(' ')[1];

    const isTokenExist = await token_model.findOne({ where: { refreshToken: refreshTokenFromHeader } }) ? true : false;

    if (isTokenExist) {
        const access_token = jwtTokenGenerator.genAccessToken(req.user.sub)
        res.send({ access_token: access_token })
    } else {
        res.status(404).send("Token not found!")
    }
})

router.post('/signup', async (req, res) => {

    const { username, password } = req.body;

    const isUserExist = (await user.findOne({ where: { username: username } })) ? true : false;

    if (isUserExist) {
        res.send("User with this email exists already!");
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await user.create({ username: username, password: hashedPassword });
        res.send("User created with ID:" + createdUser.id);
    }
})


router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    const userFound = await user.findOne({ where: { username: username } });

    if (userFound != null) {
        bcrypt.compare(password, userFound.password).then(isValid => {
            if (!isValid) {
                res.send("User not found!")
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
                                    console.log(msg)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    })

                res.status(200).send({ access_token: access_token, refresh_token: refresh_token })

            }
        })
    }
})

router.post('/addlocation', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    const addedLocation = await location.create({ userId: req.user.sub, location: req.body.location })
    res.send("Location addedd successfully" + addedLocation);
})


router.get('/getlocation', passport.authenticate('accesstoken', { session: false }), async (req, res) => {
    const locations = await location.findAll({ where: { userId: req.user.sub } })
    res.json(locations)
})

router.delete('/logout', passport.authenticate('refreshtoken', { session: false }), async (req, res) => {
    
    token_model.destroy({
        where: { userId: req.user.sub },
        truncate: true
    })
    
    res.send("Logged out successfully!")
})

module.exports = router