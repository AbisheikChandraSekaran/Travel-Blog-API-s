const  mongoose = require("mongoose");

const travelBlogSchema=new mongoose.Schema({
    title:{
        type:String
    },
    subtitle:{
        type:String
    },
    writer:{
        type:String},
    /*image:{
        type:image
    }*/
    content:{
        type:String
        
    }
})

const Blog = mongoose.model("travelblogdetails",travelBlogSchema)

module.exports ={Blog}
