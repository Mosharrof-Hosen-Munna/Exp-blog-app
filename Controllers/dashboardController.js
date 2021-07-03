const Flash = require("../utils/Flash")
const Profile = require('../Models/Profile')
exports.getDashboardController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({
            user: req.user._id
        })

        if (!profile) {
            return res.redirect('/dashboard/create-profile')

        } else {

            res.render('pages/dashboard/dashboard', {
                title: 'My Dashboard',
                active: 'active',
                flashMessage: Flash.getMessage(req)
            })
            console.log('there are Profile');

        }

    } catch (error) {
        console.log(error);
        next(error)
    }

}
exports.createProfileGetController = (req, res, next) => {

    res.render('pages/dashboard/createProfile', {
        title: 'Create Your Profile',
        active: 'active',
        flashMessage: Flash.getMessage(req)
    })
    

}

exports.createProfilePostController = (req, res, next) => {
    res.render('pages/dashboard/createProfile', {
        title: 'Create Your Profile',
        active: 'active',
        flashMessage: Flash.getMessage(req)
    })
}

exports.editProfileGetController = (req, res, next) => {

}
exports.editProfilePostController = (req, res, next) => {

}