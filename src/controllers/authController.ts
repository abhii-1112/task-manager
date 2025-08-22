import User from '../models/userModel'
import { Request, Response  } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


//register User
export const register = async (req: Request, res: Response) => {
    try{
        const { username, email, password} = req.body

        //check if user exists
        const existingUser = await User.findOne({email})
        if (existingUser){
            return res.status(400).json({message: "User already exists"})
        }

        //hashpassword
        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            password: hashpassword
        })
        return res.status(200).json({message: "User created successfully", userId: newUser._id})
    } catch(error){
            return res.status(500).json({message: "Internal server error",error})
    }
}

//login

export const login = async (req: Request, res:Response)=>{
    try{
        const {email, password} = req.body

        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message: "Invalid Credentials"}) 
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }
        
        if (!process.env.JWT_KEY) throw new Error("JWT_KEY not defined");
        const secret = process.env.JWT_KEY 

        const token = jwt.sign({userId: user._id}, secret, {expiresIn: "1h"})
        // ✅ Return token in response
        
        return res.status(200).json({message: "Login Successfull",token})
    } catch(error){
        return res.status(500).json({message: "Internal Server Error",error})
    }


}