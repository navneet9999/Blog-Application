const Blog = require('../model/Blog')
const User = require('../model/User')
const mongoose = require('mongoose')

const getAllBlogs = async (req,res,next)=>{
    let blogs;
    try{
        blogs = await Blog.find()
    }catch(err){
        return console.log(err)
    }
    if(!blogs){
        return res.status(400).json({message: "No Blogs found"})
    }

    res.status(200).json({blogs})
}

const addBlogs = async (req,res,next)=>{
    const {title,description,image,user} = req.body;

    let existinguser;
    try{
        existinguser = await User.findById(user);
    }catch(err){
        return console.log(err);
    }

    if(!existinguser){
        return res.status(400).json({message: "Cannot find user by this Id"})
    }

    const blog = new Blog ({
        title,
        description,
        image,
        user,
    })
    // console.log(existinguser)
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existinguser.blogs.push(blog);
        await existinguser.save({session});
        await session.commitTransaction();
    }catch(err){
        return console.log(err)
        return res.status(500).json({message: err})
    }

    return res.status(200).json({blog})
    
}

const updateBlog = async (req,res,next)=>{
    const {title,description} = req.body;
    const blogid = req.params.id;

    let ublog;
    try{
        ublog = await Blog.findByIdAndUpdate(blogid, {
            title,
            description
        })
    }catch(err){
        console.log(err)
    }

    if(!ublog){
        return res.status(500).json({message: "Unable to update blog"})
    }

    return res.status(200).json({ublog}); 

}

const getById = async (req,res,next)=>{
    const blogid = req.params.id;

    let ublog;
    try{
        ublog = await Blog.findById(blogid)
    }catch(err){
        console.log(err)
    }

    if(!ublog){
        return res.status(500).json({message: "Unable to update blog"})
    }

    return res.status(200).json({ublog}); 
}

const deleteBlog = async (req,res,next)=>{
    const blogid = req.params.id;

    let ublog;
    try{
        ublog = await Blog.findByIdAndDelete(blogid).populate('user');
        console.log(ublog)
        await ublog.user.blogs.pull(ublog);
        await ublog.user.save();
    }catch(err){
        console.log(err)
    }

    if(!ublog){
        return res.status(500).json({message: "Unable to find blog"})
    }

    return res.status(200).json({message: "Blog deleted Successfully"}); 
}

const getByuserId = async (req,res,next)=>{
    let userid = req.params.id;
    let userblogs;
    try{
        userblogs = await User.findById(userid).populate("blogs");
    }catch(err){
        return console.log(err);
    }
   
    if(!userblogs){
        return res.status(404).json({message: "no blog found"})
    }
    return res.status(200).json({blogs: userblogs});
}

module.exports = {getAllBlogs,addBlogs,updateBlog,getById,deleteBlog,getByuserId}