const express = require('express')
const {check} = require('express-validator')
const router = express.Router()

const { getUsers } = require('../controller/userController')
const decoratorHTML = require('../middlewares/common/decorateHTML')
const avatarUploader = require('../middlewares/users/avatarUpload')

router.get('/', decoratorHTML("Users"), getUsers)

router.post('/',avatarUploader, getUsers)

module.exports = router;