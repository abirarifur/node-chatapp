const express = require('express')

const { getLogin } = require('../controller/loginController')

const decoratorHTML = require('../middlewares/common/decorateHTML')
const router = express.Router()


router.get('/', decoratorHTML("Login"), getLogin)

module.exports = router