const User = require('../Models/User')
const bcrypt = require('bcrypt')
const {
    validationResult
} = require('express-validator')
const formatter = require('../utils/validatorErrorFormatter')
const Flash = require('../utils/Flash')
const active = {
    active: 'active'
}
let errorMessage = {
    msg: 'Invalid Credentials'
}


exports.singupgetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Create A new account',
        errors: {},
        values: {},
        active,
        flashMessage: Flash.getMessage(req)
    })
}

exports.singupPostController = async (req, res, next) => {
    let {
        username,
        email,
        password
    } = req.body
    let errors = validationResult(req).formatWith(formatter)

    let values = {
        username,
        email,
        password
    }

    if (!errors.isEmpty()) {
        req.flash('fail', 'Please fill up all input with valid imformation')
        return res.render('pages/auth/signup', {
            title: 'Create A new account',
            errors: errors.mapped(),
            values,
            active,
            flashMessage: Flash.getMessage(req)
        })

    }


    try {
        let hashedPassword = await bcrypt.hash(password, 11)
        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        await user.save()
        req.flash('success', 'Successfully Login Your Account')
        res.redirect('/auth/login')

    } catch (error) {
        console.log(error);
        next(error)
    }

}

exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', {
        title: 'Login your account | Exp-blog',
        active,
        errorMessage: {},
        value: {},
        flashMessage: Flash.getMessage(req)
    })
}

exports.loginPostController = async (req, res, next) => {
    let {
        email,
        password
    } = req.body
    let value = {
        email,
        password
    }

    try {

        if (!email) {
            req.flash('success', 'Please provide a valid credentials')
            return res.render('pages/auth/login', {
                title: 'Login your account | Exp-blog',
                active,
                errorMessage: {
                    msg: 'Please Provide valid Credentials'
                },
                value: {},
                flashMessage: Flash.getMessage(req)
            })
        }
        if (!password) {
            req.flash('success', 'Please provide a valid credentials')
            return res.render('pages/auth/login', {
                title: 'Login your account | Exp-blog',
                active,
                errorMessage: {
                    msg: 'Please Provide valid Credentials'
                },
                value,
                flashMessage: Flash.getMessage(req)
            })
        }

        let user = await User.findOne({
            email
        })
        if (!user) {
            req.flash('success', 'Please provide a valid credentials')
            return res.render('pages/auth/login', {
                title: 'Login your account | Exp-blog',
                active,
                errorMessage,
                value,
                flashMessage: Flash.getMessage(req)
            })
        }
        let passwordMatched = await bcrypt.compare(password, user.password)
        if (!passwordMatched) {
            req.flash('success', 'Please provide a valid credentials')
            return res.render('pages/auth/login', {
                title: 'Login your account | Exp-blog',
                active,
                errorMessage,
                value,
                flashMessage: Flash.getMessage(req)
            })
        }

        req.session.isLoggedIn = true,
            req.session.user = user
        req.flash('success', 'Successfully Login Your Account')
        res.redirect('/dashboard')

    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.LogoutController = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        return next(err)
    })

    return res.redirect('/auth/login')
}