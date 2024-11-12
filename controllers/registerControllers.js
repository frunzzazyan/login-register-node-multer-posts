const {UserModelReg} = require("../joiSchema/UserModelReg.js")
const {loginUserModel} = require("../joiSchema/LoginUserModel.js")
class registerControllers{
    async createUser(req,res){
        try {
            const body = await UserModelReg.validateAsync(req.body)
            const users = await req.app.locals.services.users.createUser(body)
            res.json(users)
        } catch (error) {
            res.json(error)
        }
    }

    async loginUser(req,res){
        try {
            const body = await loginUserModel.validateAsync(req.body)
            const user = await req.app.locals.services.users.loginUser(body)
            res.json(user) 
        } catch (error) {
            res.json(error) 
        }
    }
    
    async authMe(req,res){
        try {
            const user = await req.app.locals.services.users.authMe(req.app.locals.tokenId)
            res.json(user)
        } catch (error) {
            res.json(error) 
        }
    }
    
    async updateProfileAvatar(req,res){
        try {
            const {file} = req
            const user = await req.app.locals.services.users.updateProfileAvatar(req.app.locals.tokenId ,file)
            res.json(user)
        } catch (error) {
            res.json(error) 
        }
    }
}

module.exports = registerControllers