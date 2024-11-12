class PostsServices{
    constructor(models){
        this.models = models
    }

    async createPost(body,id){
        const doc = await this.models.posts({...body, user : id})
        const post = await doc.save()
        return post
    }

    async getPosts(tags){
        if(tags){
            const posts = await this.models.posts.find({tags : {$all : [tags]}}).populate("user")
            return posts
        }else{
            const posts = await this.models.posts.find().populate("user")
            return posts
        }
    }

    async getPostId(id){
        const post = await this.models.posts.findByIdAndUpdate(id, {$inc : {viewCount : 1}})
        return post
    }

    async likePost(id){
        const post = await this.models.posts.findByIdAndUpdate(id, {$inc : {likeCount : 1}})
        return post
    }

    async deletePost(id){
        const delId = await this.models.posts.findOneAndDelete(id)
        return delId
    }   
}

module.exports = PostsServices