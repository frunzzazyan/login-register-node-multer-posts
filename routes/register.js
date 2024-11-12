const express = require("express")
const router = express.Router()
const path = require("path")
const {checkAuth} = require("../middleware/checkAuth.js")
const registerControllers = require("../controllers/registerControllers.js")
const controllers = new registerControllers()
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

router.post("/register", controllers.createUser)
router.post("/login", controllers.loginUser)
router.get("/me", checkAuth ,controllers.authMe)
router.patch("/me/updateAvatar",checkAuth ,upload.single("avatar"),controllers.updateProfileAvatar)

module.exports = router