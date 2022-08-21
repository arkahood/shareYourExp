import User from "../model/user.js";
import Token from "../model/token.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const signupUser = async(req, res)=>{
    try {
        const user = req.body;
        const newUser = new User(user);
        await newUser.save();
        return res.status(200).json({msg : "Signup Succesfull"});
    } catch (error) {
        return res.status(500).json({msg : "Error while Signup"})
    }
}

export const loginUser = async(req,res)=>{
    let user = await User.findOne({username : req.body.username});
    if(!user){
        return res.status(400).json({msg : "User doesn't exist"});
    }
    try {
        if(user.password === req.body.password){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn:'15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({token : refreshToken})
            await newToken.save();

            return res.status(200).json(
                {accessToken : accessToken,
                refreshToken:refreshToken, 
                name : user.name, 
                username : user.username
            });
        }else{
            return res.status(400).json({msg : "PassWord doesn't match"});
        }
    } catch (error) {
        return res.status(500).json({msg : "Error while login"});
    }
}