const express = require('express')
const router = express.Router()

const { getUsers } = require('../controller/userController')
const decoratorHTML = require('../middlewares/common/decorateHTML')
const avatarUploader = require('../middlewares/users/avatarUpload')
const { addUserValidators } = require('../middlewares/users/userValidators')

router.get('/', decoratorHTML("Users"), getUsers)

router.post('/',avatarUploader, addUserValidators)

module.exports = router;