const Users = require("../models/userModel")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../tokens/generateToken")
const { default: mongoose } = require("mongoose")

const userCtrl = {
    signUp: async (req, res) => {
        try {
            const { username, name, email, password } = req.body
    
            const user = await Users.findOne({ $or: [{ email }, { username }]})
            if(user) return res.status(400).json({error: "This Username or Email already Exists"})
                    
            const passHash = await bcrypt.hash(password, 10)

            const newUser = new Users({
                username, name, email, password: passHash
            })

            await newUser.save()

            if(newUser) {
                generateToken(newUser._id, res)
                res.status(201).json({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    username: newUser.username,
                })
            } else {
                res.status(400).json({error: "Invalid user data"})
            }
            
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log("Error", error.message)    
        }
    },

    logIn: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            const isMatch = await bcrypt.compare(password, user?.password || "")

            if(!user || !isMatch) return res.status(400).json({error: "Invalid Email or Password"})

            generateToken(user._id, res)

            res.status(200).json({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log("Error", error.message)  
        }
    },

    logOut: async (req, res) => {
        try {
            res.cookie("jwt", "", {maxAge: 1})
            res.status(200).json({ message: "User Log Out Successfully" })
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log("Error", error.message) 
        }
    },

    getUserProfile: async (req, res) => {
        const { query } = req.params;
        console.log("Received query:", query);
    
        try {
            let user;
    
            if (mongoose.Types.ObjectId.isValid(query)) {
                user = await Users.findOne({ _id: query }).select("-password -updatedAt");
            } else {
                user = await Users.findOne({ username: query }).select("-password -updatedAt");
            }
    
            console.log("User found:", user);
    
            if (!user) return res.status(404).json({ error: "User not found" });
    
            res.status(200).json(user);
        } catch (err) {
            console.error("Error in getUserProfile: ", err.message);
            res.status(500).json({ error: err.message });
        }
    }
    
}

module.exports = userCtrl