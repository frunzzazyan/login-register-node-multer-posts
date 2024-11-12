const {postsUserModel} = require("../joiSchema/PostsJoi.js")
class PostsController{
    async createPost(req,res){
        try {
            const body = await postsUserModel.validateAsync(req.body)
            const id = req.app.locals.tokenId
            const user = await req.app.locals.services.posts.createPost(body,id)
            res.json(user)
        } catch (error) {
            res.json(error)
        }
    }

    async getPosts(req,res){
        try {
            const {tags} = req.query
            console.log(tags)
            if(tags){
                const posts = await req.app.locals.services.posts.getPosts(tags)
                res.json(posts)
            }else{
                const posts = await req.app.locals.services.posts.getPosts()
                res.json(posts)
            }
        } catch (error) {
            res.json(error)
        }
    }
    
    async getPostId(req,res){
        try {
            const post = await req.app.locals.services.posts.getPostId(req.params.id)
            res.json(post)
        } catch (error) {
            res.json(error)
        }
    }

    async likePost(req,res){
        try {
            const post = await req.app.locals.services.posts.likePost(req.params.id)
            res.json(post)
        } catch (error) {
            res.json(error)
        }
    }

    async deletePost(req,res){
        try {
            const id = req.params.id
            const delId = await req.app.locals.services.posts.deletePost(id)
            res.json(delId)
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = PostsController