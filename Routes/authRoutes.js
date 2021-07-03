const Router = require('express').Router()
const signupValidator = require('../validator/authValidator/signupValidator')
const {
    singupgetController,
    singupPostController,
    loginGetController,
    loginPostController,
    LogoutController
} = require('../Controllers/authController')
const {
    IsAuthenticated,
    IsUnAuthenticated
} = require('../Middilewere/authMiddleware')



Router.get('/signup', IsUnAuthenticated, singupgetController)
Router.post('/signup', IsUnAuthenticated, signupValidator, singupPostController)
Router.get('/login', IsUnAuthenticated, loginGetController)
Router.post('/login', IsUnAuthenticated, loginPostController)
Router.get('/logout', IsAuthenticated, LogoutController)

module.exports = Router