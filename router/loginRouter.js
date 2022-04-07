const express = require('express')

const { getLogin, login, logout } = require('../controller/loginController')

const decoratorHTML = require('../middlewares/common/decorateHTML')
const { doLoginValidators, doLoginValidationHandlers } = require('../middlewares/login/loginValidator')
const router = express.Router()

const page_title = "Login"


router.get('/', decoratorHTML(page_title), getLogin)
router.post('/',decoratorHTML(page_title),doLoginValidators, doLoginValidationHandlers, login)
router.delete('/', logout)

module.exports = router