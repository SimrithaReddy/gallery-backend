const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');
const uploadImage = require('./uploadImage.js');
const fileUpload = require('express-fileupload');
const app = express();
const Imagepost = require('./model/posts')

dotenv.config()
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})
app.use(fileUpload({ useTempFiles: true }))

app.get("/",async(req,res)=>{
    try{
        let userPosts = await Imagepost.find().sort({ _id: -1 });
        res.json(userPosts)
    }catch(e){
        res.json(e.message)
    }
})

app.get("/:find",async(req,res)=>{
    try{
        let userPosts = await Imagepost.find({title:req.params.find});
        res.json(userPosts)
    }catch(e){
        res.json(e.message)
    }
})

app.post("/uploads", async (req, res) => {   
    try {
        const file = req.files.PostImage
        console.log(file);
        const result = await uploadImage.uploader.upload(file.tempFilePath, {
            public_id: `${Date.now()}`,
            resource_type: "auto",
            folder: "images"
        })

        let userPosts = await Imagepost.create({
            title: req.body.title,
            PostImage: result.secure_url
        })

        res.json(userPosts)

    } catch (e) {
        console.log(e.message)
        res.json(e.message)
    }
})


app.delete("/:id",async(req,res)=>{
    try{
        let userPosts = await Imagepost.deleteOne({_id:req.params.id})
        res.json(userPosts)
    }catch(e){
        res.json(e.message)
    }
})


mongoose.connect('mongodb+srv://Simritha_Reddy_k04:v7SunNMZjGh21fOa@cluster0.ppxra6j.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true} ,
    () => {
      console.log("connected to DB");
    }
  );

app.listen(5000, () => {
    console.log(`Server is up at 5000.....`);
})
