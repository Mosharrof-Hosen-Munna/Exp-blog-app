//user, title , bio ,pics ,link[fb ,twi],posts,bookmarks

const { Schema,model} = require('mongoose')
// const Post = require('./Post')
// const User = require('./User')
const profileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:30
    },
    title:{
        type:String,
        maxlength:100,
        trim:true,
    },
    bio:{
        type:String,
        maxlength:500,
        trim:true
    },
    pic:String,
    link:{
        facebook:String,
        twitter:String,
        websites:String,
        github:String
    },
    post:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'

        }
    ],
    bookmarks:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }
},{timestamps:true})

const Profile = model('Profile',profileSchema)
module.exports = Profile