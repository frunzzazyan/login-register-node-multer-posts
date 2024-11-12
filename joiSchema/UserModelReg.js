const joi = require("joi")

const UserModelReg = joi.object({
    name : joi.string().required(),
    email : joi.string().email().required(),
    age : joi.number().min(18).required(),
    password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    rpassword: joi.ref('password')
})

module.exports = {UserModelReg}