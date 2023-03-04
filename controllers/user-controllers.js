const User = require('../model/User')
const bcrypt = require('bcryptjs')

const getAllUser = async (req,res,next) =>{
    let users;
    // console.log("hh")
    try{
        users = await User.find()
    }catch(err){
        console.log(err)
    }
    if(!users){
        res.status(404).json({message: "No user found" })
    }
    res.status(200).json({users})
}

const signup = async (req,res,next)=>{
    const { name, email, password } = req.body;
    let existinguser;
    try{
        existinguser = await User.findOne({email})
    }catch(err){
        return console.log(err)
    }

    if(existinguser){
         res.status(400).json({message: "User already exist please Login Instead"})
    }
    const hashpassword = bcrypt.hashSync(password)
    const user = new User({
        name,
        email,
        password: hashpassword,
        blogs: [],
    });

    try{
        await user.save()
    }catch(err){
        return console.log(err)
    }

    return res.status(201).json({user})
}

const login = async (req,res,next)=>{
    const { email,password} = req.body;
    let existinguser;
    try{
        existinguser = await User.findOne({email})
    }catch(err){
        return console.log(err)
    }

    if(!existinguser){
         res.status(404).json({message: "Coudnot find user by this email"})
    }

    const ispasswordcorrect = bcrypt.compareSync(password,existinguser.password)
    if(!ispasswordcorrect){
        res.status(404).json({message: "Incorrect Password"})
    }
    res.status(200).json({existinguser})
}
 
module.exports = {getAllUser,signup,login}