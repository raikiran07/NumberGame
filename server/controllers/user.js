const User = require("../model/users.js")


const savePoint = async (req,res) => {
    try {
        
        const {username,mark} = req.body
        const user = await User.create({name:username,points:mark})
        
        res.status(201).json({user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({msg:error.message})
    }
}

module.exports = savePoint