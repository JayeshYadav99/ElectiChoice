const { Signup, Login } = require('../Controllers/AuthController')
const { withJWTAuthMiddleware } = require("express-kun");
const{ getAllUsers } =require('../Controllers/UserController')
const router = require('express').Router()



router.post('/signup', Signup)
router.post('/login', Login)

module.exports = router