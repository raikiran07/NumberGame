const router = require('express').Router()
const savePoint = require("../controllers/user")

router.post('/create',savePoint)

module.exports = router