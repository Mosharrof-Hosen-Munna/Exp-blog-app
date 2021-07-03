const {Schema,model}= require('mongoose')
// const Profile = require('./Profile')

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        maxlength:20,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref:'Profile'
    }
},{timestamps:true})

const User = model('User',userSchema)

module.exports = User