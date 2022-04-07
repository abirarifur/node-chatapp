const express = require('express')
const router = express.Router()

const { getUsers, addUser, removeUser } = require('../controller/userController')
const checkLogin = require('../middlewares/common/checkLogin')
const decoratorHTML = require('../middlewares/common/decorateHTML')
const avatarUploader = require('../middlewares/users/avatarUpload')
const { addUserValidators, addUserValidationHandler } = require('../middlewares/users/userValidators')

router.get('/', decoratorHTML("Users"),checkLogin, getUsers)

router.post('/',avatarUploader,  addUser)
// router.post('/',avatarUploader, addUserValidators, addUserValidationHandler, addUser)
router.delete('/:id', removeUser)

module.exports = router;