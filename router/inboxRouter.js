const express = require('express')

const router = express.Router()
const { getInbox } = require('../controller/inboxController')
const checkLogin = require('../middlewares/common/checkLogin')
const decoratorHTML = require('../middlewares/common/decorateHTML')

router.get('/', decoratorHTML("Inbox"),checkLogin, getInbox)

module.exports = router