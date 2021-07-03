const router = require('express').Router()
const {
    getDashboardController,
    createProfileGetController,
    editProfilePostController,
    createProfilePostController,
    editProfileGetController
} = require('../Controllers/dashboardController')
const {
    IsAuthenticated
} = require('../Middilewere/authMiddleware')

router.get('/', IsAuthenticated, getDashboardController)

router.get('/create-profile', IsAuthenticated, createProfileGetController)
router.post('/create-profile', IsAuthenticated, createProfilePostController)

router.get('/edit-profile', IsAuthenticated, editProfileGetController)
router.post('/edit-profile', IsAuthenticated, editProfilePostController)
module.exports = router