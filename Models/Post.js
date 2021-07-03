// title, body,author ,thumbnail,tags ,readtime,likes, dislikes, comments
const {Schema,model}=require('mongoose')
// const Comment = require('./Comment')
// const User = require('./User')

const postSchema = new Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        maxlength:100
    },
    body:{
        type:String,
        trim:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    tags:{
        type:String,
        required:true
    },
    thumbnail:String,
    readtime:String,
    likes:[Schema.Types.ObjectId],
    dislikes:[Schema.Types.ObjectId],
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{timestamps:true})

const Post = model('Post',postSchema)
module.exports = Post