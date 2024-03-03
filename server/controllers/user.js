import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({message: "user doesn't exist"})
        }
        const passwordIsCorrect = await bcrypt.compare(password, existingUser.password)
        if (!passwordIsCorrect) {
            return res.status(404).json({message: "password Incorrect"})
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, "test", {expiresIn: "1h"})
        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message: "something went wrong"})
    }
}

export const signup = async (req, res) => {
    const {firstName, lastName, password, confirmPassword, email} = req.body
    try {
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({message: "user already exists"})
        }
        if (password !== confirmPassword) {
            return res.status(400).json({message: "password doesn't match"})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})
        const token = jwt.sign({email: result.email, id: result._id}, "test", {expiresIn: "1h"})
        res.status(200).json({result, token})
    } catch (error) {
        res.status(500).json({message: "something went wrong"})
    }
}
