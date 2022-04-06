const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const User = require('../Models/People');
const {unlink} = require('fs');
const path = require('path');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.render('users',{users: users})
    } catch (error) {
        next(error)
    }
}

async function addUser(req, res, next) {
    console.log(req.body);
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if(req.files && req.files.length > 0){
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword
        })
    }else{
        newUser = new User({
            ...req.body,
            password: hashedPassword
        })
    }
    
    try {
        const result = await newUser.save()
        res.status(200).json({
            message: "User was added successfully."
        })
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "unknown error occurred"
                }
            }
        })
    }
}

const removeUser = async (req, res, next) => {

    try {
        const user = await User.findByIdAndDelete({_id: req.params.id})
        if(user.avatar){
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`), (err) => {
                    if(err) console.log(err);
                }
            )
        }
        res.status(200).json({
            message: "User was removed successfully"
        })
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Could not delete the user!"
                }
            }
        })
    }
}



module.exports = {
    getUsers,
    addUser,
    removeUser
}