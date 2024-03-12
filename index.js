const mongoose = require('mongoose')
const express = require("express")
const {Blog}=require('./schema.js')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

async function connectToDB(){
    try{
        
        await mongoose.connect('mongodb+srv://abisheik:Truegod7@cluster0.x8oghx9.mongodb.net/TravelBlog?retryWrites=true&w=majority&appName=Cluster0')
        console.log("DB connection established")
        const port = process.env.PORT || 8000
        app.listen(port,function(){
        console.log(`Listening on port ${port}...`)})

    }

catch(error){
    console.log(error)
    console.log("Could'nt Establish Connection")
}

}


connectToDB()


app.post('/add-blog',async function(request,response){
    try{
    await Blog.create({
       "title" :request.body.title,
        "subtitle:": request.body.subtitle,
        "writer":request.body.writer,
        "content":request.body.content

        })
        response.status(201).json(
            {
                'status': "success",
                "message":"Entry Created"
            }
    )
    }
        catch(error){
            response.status(500).json({
                "status":"failure",
                "message":"Entry not created",
                "error":error
            })
        }
    })

    app.get('/get-blog',async function(request,response){
        try {
            const blogDetails = await Blog.find()
            response.status(200).json(blogDetails)
       } 
        
        catch (error) {
            response.status(500).json({
                "status":"failure",
                "message":"Could Not fetch Data",
                "error":error
            })
            
        }
        
    })                          //mvc pattern

    app.delete('/delete-blog/:id',async function(request,response){
        try{
        const blogEntry = await Blog.findById(request.params.id)
        if(blogEntry){
            await Blog.findByIdAndDelete(request.params.id)
            response.status(200).json({
                'status': "success",
                "message":"Entry Deleted"
            })
        }

        else{
            response.status(404).json({
                'status': "Failure",
                "message":"Counld'nt Find Entry"
            });
        }
        }
        catch(error){
            response.status(500).json({
                "status":"failure",
                "message":"Entry not found",
               'error':error
            })
        }
    })

    app.patch('/update-blog/:id',async function(request,response){
        try{
        const blogEntry = await Blog.findById(request.params.id)
        if(blogEntry){
            await blogEntry.updateOne({
                "title" :request.body.title,
                "subtitle:": request.body.subtitle,
                 "writer":request.body.writer,
                 "content":request.body.content
            }) 
            response.status(200).json({
                'status': "success",
                "message":"Entry Updated"
            })
        }

        else{
            response.status(404).json({
                'status': "Failure",
                "message":"Counld'nt Update Entry"
            });
        }
        }
        catch(error){
            response.status(500).json({
                "status":"failure",
                "message":"Entry not found",
                'error':error
            })
        }
    })