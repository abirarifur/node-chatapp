const {check, validationResult} = require('express-validator')
const User = require('../../Models/People')
const {unlink} = require('fs');
const path = require('path')
const addUserValidators = [
    check('name').isLength({min: 1})
    .withMessage("Name is required")
    .isAlpha("en-US", {ignore: " -"})
    .withMessage("Name Must not contain anything other than alphabet")
    .trim(),
    check('email').isEmail().withMessage("Invalid email address").trim().custom(
        async (value) => {
            try {
                const user = await User.findOne({email: value})
                if(user){
                    throw createError("Email already in use")
                }
            } catch (error) {
                throw createError(error.message)
            }
        }
    ),
    check('mobile')
    .isMobilePhone("bn-80",{
        strictMode: true
    })
    .withMessage("Mobile Number must not be a valid Bangladesh number")
    .isAlpha("en-US", {ignore: " -"})
    .withMessage("Name Must not contain anything other than alphabet")
    .trim().custom(
        async (value) => {
            try {
                const user = await User.findOne({mobile: value})
                if(user){
                    throw createError("Mobile already in use")
                }
            } catch (error) {
                throw createError(error.message)
            }
        }
    ),
    check('password').isStrongPassword()
    .withMessage("Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol"),

]
const addUserValidationHandler = function(req, res, next) {
    console.log(req);
    const errors = validationResult(req);
    const mappedError = errors.mapped()
    if(Object.keys(mappedError).length == 0){
        next();
    }else{
        if(req.files.length > 0){
            const {filename} = req.files[0];
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${filename}`), (err) => {
                    if(err) console.log(err);
                }
            )
        }
        res.status(500).json({
            errors: mappedError
        })
    }
}

module.exports = {
    addUserValidators,
    addUserValidationHandler
}