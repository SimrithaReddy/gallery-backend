const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    date:{
        type: String,
        default: new Date().toLocaleDateString()
    },
    PostImage:{
        type: String,
        required:true
    }
})


const posts = mongoose.model("posts", postSchema);

module.exports = posts;