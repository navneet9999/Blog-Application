const express = require('express')
const {getAllBlogs,addBlogs,updateBlog,getById,deleteBlog,getByuserId} = require('../controllers/Blog-controller')

const blogrouter = express.Router();

blogrouter.get("/" , getAllBlogs);
blogrouter.post('/add' , addBlogs);
blogrouter.put("/update/:id" , updateBlog);
blogrouter.get("/:id" , getById) 
blogrouter.delete("/:id" , deleteBlog)
blogrouter.get("/user/:id" , getByuserId)

module.exports = blogrouter