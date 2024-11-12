const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const postsModel = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    text : {
        type : String,
        required : true
    },
    tags : {
        type : Array,
        default : []
    },
    viewCount : {
        type : Number,
        default : 0
    },
    likeCount : {
        type : Number,
        default : 0
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
})



module.exports = mongoose.model("posts", postsModel)