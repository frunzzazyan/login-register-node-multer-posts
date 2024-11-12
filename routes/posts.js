const express = require("express")
const router = express.Router()

const {checkAuth} = require("../middleware/checkAuth.js")

const PostsController = require("../controllers/postsController.js")
const controllers = new PostsController()

router.post("/",checkAuth ,controllers.createPost)
router.get("/" ,controllers.getPosts)
router.get("/:id" ,controllers.getPostId)
router.patch("/like/:id", controllers.likePost)
router.delete("/:id" ,controllers.deletePost)


module.exports = router