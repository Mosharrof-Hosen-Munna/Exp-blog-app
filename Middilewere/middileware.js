const express = require('express')
const morgan= require('morgan')
const config = require('config')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')
const {bindUserWithRequest} = require('./authMiddleware')
const setLocals = require('./Localset')
const MONGODB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@project.wytfk.mongodb.net/blog-application?retryWrites=true&w=majority`

var store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24
});

const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({
        extended: true
    }),
    express.json(),
    session({
        secret: config.get('secret'),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        store: store
    }),
    flash(),
    bindUserWithRequest(),
    setLocals(),
    
]

module.exports = app=>{
    middleware.forEach(m=>{
        app.use(m)
    })
}