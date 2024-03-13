const  mongoose = require("mongoose");

const travelBlogSchema=new mongoose.Schema({
    title:{
        type:String
    },
    subtitle:{
        type:String,
        require:true
    },
    writer:{
        type:String
    },
    image:{
        type:String,
        require:true
    },
    content:{
        type:String
        
    },
    map:{
        type:String,
        require:true
    }

})

const Blog = mongoose.model("travelblogdetails",travelBlogSchema)

module.exports ={Blog}
