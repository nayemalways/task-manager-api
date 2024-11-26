import UserModel from "../model/UserModel.js";
import * as tokenUtility from '../utility/tokenUtility.js'; 
import { UserData } from "../utility/UserDataValidation.js";

// USER REGISTRATION
export const Registration = async (req, res) => {

    try{
        let reqBody = req.body;
        const DataValidation = UserData(reqBody); // Validate user data if the right data has inputed

        if(DataValidation){
            let data = await UserModel.create(reqBody);
            res.json({status: "Success", data: data});
        }else{
            res.json({status: "failed", message: "Not a valid data provided!"});
        }
       
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
        return res.json({status: "Error", Message: error.toString()});
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
    try {
        const _id = {_id: req.headers["user_id"]};
        const reqBody = req.body;
        const update = await UserModel.updateOne(_id, reqBody);

        if(!update || update.modifiedCount === 0){
            res.json({status: "failed", message: "Couldn't update. Something went wrong!"});
        }else{
            res.json({status: "Success", data: update});
        }
    }catch(e){
        res.json({status: "Error", error: e.toString()});
    }
}

// USER PROFILE DELETE
export const ProfileDelete = async (req, res) => {
    try {
        const id = req.headers["user_id"];
        const delete_user = await UserModel.findByIdAndDelete(id);

        if(delete_user === null) {
            res.json({status: "failed", message: "Couldn't delete"});
        }else{
            res.json({status: "Success", data: delete_user});
        }
    }catch(e){
        res.json({status: "Error", error: e.toString()});
    }
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




export const wrongUrlHit = (req, res) => {
    res.status(404).json({
        status: "failed",
        message: `The requested URL '${req.originalUrl}' was not found on this server. Please check and try again.`,
    });
};
