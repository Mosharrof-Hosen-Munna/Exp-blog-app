require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')

const app = express()

// Import routers
const setRoutes =require('./Routes/routes')

//Import Middleware
const setMiddleware = require('./Middilewere/middileware')

//Mongodb database uri
const MONGODB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@project.wytfk.mongodb.net/blog-application?retryWrites=true&w=majority`

// view engine setup
app.set('view engine', 'ejs')
app.set('views', 'views')

//Using middleware from middleware
setMiddleware(app)

// Using routes from routes
setRoutes(app)

app.use((req,res,next)=>{
    let error = new Error('404 not found')
    error.status = 404
    next(error)
})
app.use((error,req,res,next)=>{
    
    if(error.status = 404){
        console.log(error);
     return res.render('pages/error/404',{flashMessage:{}})
    }else{
        res.render('pages/error/500',{flashMessage:{}})
    }
    
})
const PORT = process.env.PORT || 8080

mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(chalk.green('database connected'));
        app.listen(PORT, () => {
            console.log(chalk.green(`Server is running on PORT ${PORT}`));
        })
    })
    .catch(e => {
        console.log(e);
    })