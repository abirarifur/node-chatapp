const express = require('express')

const router = express.Router()
const { getUsers } = require('../controller/userController')
const decoratorHTML = require('../middlewares/common/decorateHTML')

router.get('/', decoratorHTML("Users"), getUsers)

module.exports = router