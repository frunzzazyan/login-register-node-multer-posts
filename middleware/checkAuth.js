const jwt = require("jsonwebtoken")
function checkAuth(req,res,next){
    const token = (req.headers.authorization || "").replace(/Bearer\s/, "")
    if(token){
        const decoded = jwt.verify(token, "123")
        req.app.locals.tokenId = decoded._id
        next()
    }else{
        res.json({"msg" : "invalid token"})
    }
}

module.exports = {checkAuth}