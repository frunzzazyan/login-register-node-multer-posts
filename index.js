const express = require("express")
const port  = 3000
const app = express()

const registerRouter = require("./routes/register.js")
const postsRouter = require("./routes/posts.js")

const registerServices = require("./services/registerServices.js")
const PostsServices = require("./services/postsServices.js")
const mongoose = require("mongoose")
const models = require("./models")
const path = require("path")

mongoose.connect("mongodb://localhost:27017/person")
.then(()=>console.log("db ok"))
.catch(()=>console.log("db err"))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'uploads')));

app.locals.models = {
    users : models.users,
    posts : models.posts
}

app.locals.services = {
    users : new registerServices(app.locals.models),
    posts : new PostsServices(app.locals.models)
}

app.use("/auth", registerRouter)
app.use("/posts", postsRouter)

app.listen(port,()=>{
    console.log(`Example app listening on port ${port} `)
})