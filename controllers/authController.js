const User = require("../models/userModel")

const bcrypt = require("bcryptjs")


exports.signUp = async (req, res) => {
    const { Username, password } = req.body
    const hashpassword = await bcrypt.hash(password, 12)

    try { 
        console.log(req.body)
         const newUser = await User.create({
            Username,
            password: hashpassword
         })
        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: 'fail'

        })
    }
}
//get All userS already signed up 

exports.getAllUsers = async (req, res) => {
    try {

        const users = await User.find();
        res.status(200).json ({
            status: "succes",
            results: users.length,
            data: {
                users
            }
        })
    } catch (e) {
        res.status(404).json ({
            status: 'fail'
        })
    }
}

//delete user already signed up

exports.deleteUser = async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'sucess'
        })

    } catch(e) {
        res.status(404).json({
            status: 'fail'
        })
    }
}

exports.login = async (req, res) => {
    const { Username, password } = req.body;
    try {
        const user = await User.findOne({ Username })

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: "user not found"
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if (isCorrect) {
            res.status(200).json({
                status: 'sucess'
            })
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'incorrect username or password'
            })
        }

    } catch (e) {
        res.status(400).json({
            status: 'fail'

        })
    }
}