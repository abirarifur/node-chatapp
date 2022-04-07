const User = require('../Models/People')
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const getLogin = (req, res, next) => {
    res.render('index')
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            $or: [
                {
                    email: req.body.username
                },
                {
                    mobile: req.body.username
                }
            ]
        })
        if(user && user._id){
            const isValidPassword = bcrypt.compare(user.password, req.body.password )
            if(isValidPassword){
                const userObject = {
                    username: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: "user"
                }
                const token = jwt.sign(userObject, process.env.JWT_SECRET, { expiresIn: 60 * 60 })

                res.cookie(process.env.COOKIE_NAME, token, { maxAge: 8640000, httpOnly: true, signed: true });

                res.locals.loggedInUser= userObject;

                res.render('inbox')
            }else{
                throw createError("login failed, please try again")
            }
        }else{
            throw createError("login failed, please try again")
        }
    } catch (error) {
        res.render('index', {
            data:{
                username: req.body.username,
            },
            errors:{
                common:{
                    msg: error.message
                }
            }
        })
    }
}

const logout = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("logged out")
}
module.exports = {
    getLogin,
    login,
    logout
}