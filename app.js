const express = require('express')
const mongoose = require('mongoose')
const bodyParse = require("body-parser")
// import router from "./routes/user-routes"
const router = require('./routes/user-routes')
const blogrouter = require('./routes/blog-routes')

const app = express()
app.use(express.json())
app.use(bodyParse.urlencoded({
    extended:true
}))

app.use('/api/user', router)
app.use('/api/blog', blogrouter)
 



mongoose.connect("mongodb://localhost:27017/project2",{
    useNewUrlParser :true,
}).then(()=>{
    console.log("Connection Successfull")
}).catch(()=>{
    console.log("No connection")
})

app.listen(3000,()=>{
    console.log("server connected")
})

