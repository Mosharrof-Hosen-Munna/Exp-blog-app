const Router = require('express').Router()
const {check, validationResult} = require('express-validator')
const Flash = require('../utils/Flash')

const active = {
    active:'active'
}
Router.get("/play",(req,res,next)=>{
    res.render("playground/play",{title:'Play Ground',active,flashMessage:{}})
})
Router.post("/play",
 
    (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash('fail',"Can not Create a new user, Some error")
    }else{
        req.flash('success',"User Created successfully")
    }
    res.redirect('/validator')
})

module.exports = Router