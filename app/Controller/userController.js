import UserModel from "../model/UserModel.js";
import * as tokenUtility from '../utility/tokenUtility.js'; 

// USER REGISTRATIN
export const Registration = async (req, res) => {

    try{
        let reqBody = req.body;
        await UserModel.create(reqBody);
        res.json({status: "Success", message: "user registration successfull"});
    }catch(error){
        return res.json({status: "fail", Message: error.toString()});
    }

}

// USER LOGIN
export const Login = async (req, res) => {
    try{
        const reqBody = req.body;
        const data = await UserModel.findOne(reqBody);

        if(data === null){
            return res.status(404).json({status: "fail", message: "User not found"});
        }else{
            const token = tokenUtility.TokenEncode(data['email'], data['_id']);
            res.json({status: "Success", Token: token, message: "User login successfull"});
        }
    }catch(error){
        console.log(error);
        return res.json({status: "fail", Message: error.toString()});
    }
        
 
   
}

// USER PROFILE DETAILS
export const ProfileDetails = async (req, res) => {
    const user_id = req.headers['user_id'];
    const data = await UserModel.findOne({"_id": user_id});
    
    if(data === null){
        res.status(404).json({status: "Fail"});
    }else{
        res.json({status: "Success", user: data});
    }
}

// USER PROFILE UPDATE
export const Profile_Update = async (req, res) => {
    res.json({status: "Success", message: "user profile-update successull"});
}

// USER PROFILE DELETE
export const Profile_Delete = async (req, res) => {
    res.json({status: "Success", message: "user profile-delete successull"});
}


// EMAIL VERIFY
export const Email_Verify = async (req, res) => {
    res.json({status: "Success", message: "user email verify successull"});
};


// CODE VERIFY
export const Code_Verify = async (req, res) => {
    res.json({status: "Success", message: "user  code verify successull"});
};


// Password Reset
export const Password_Reset = async (req, res) => {
    res.json({status: "Success", message: "user password reset successull"});
}