const express = require('express')

const router = express.Router()
const { getInbox } = require('../controller/inboxController')
const decoratorHTML = require('../middlewares/common/decorateHTML')

router.get('/', decoratorHTML("Inbox"), getInbox)

module.exports = router