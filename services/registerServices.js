const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

class registerServices{
    constructor(models){
        this.models = models
    }
    async createUser(body){
        const doc = await this.models.users(body)
        const user = await doc.save()

        const token = jwt.sign({_id : user._id}, "123", {expiresIn : "1d"})
        const {password, __v ,...userData} = user._doc
        return {...userData,token}
    }

    async loginUser(body){
        const user = await this.models.users.find({email : body.email})

        if(!user){
            return {"msg" : "invalid email or password"}
        }
        
        const vallPassword = await bcrypt.compare(body.password, user[0].password)
        if(!vallPassword){
            return {"msg" : "invalid email or password"}
        }

        const token = jwt.sign({_id : user[0]._id}, "123", {expiresIn : "1d"})
        const {password, __v ,...userData} = user[0]._doc
        return {...userData,token}
    }

    async authMe(id){
        const user = await this.models.users.findById(id)
        const {password, __v ,...userData} = user._doc
        return {...userData}
    }

    async updateProfileAvatar(id,file){
        console.log(file)
        const user = await this.models.users.findByIdAndUpdate(id, {avatar : file.filename})
        const {password, __v ,...userData} = user._doc
        return {...userData}
    }
}

module.exports = registerServices   