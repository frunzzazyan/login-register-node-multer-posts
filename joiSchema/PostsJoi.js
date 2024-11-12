const joi = require("joi")

const postsUserModel = joi.object({
    title : joi.string().required(),
    text : joi.string().required(),
    tags : joi.string()
})

module.exports = {postsUserModel}