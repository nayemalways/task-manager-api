import UserModel from "../model/UserModel.js";
import SendEmail from "../utility/emailUtility.js";
import * as tokenUtility from '../utility/tokenUtility.js'; 
import { UserData } from "../utility/UserDataValidation.js";
import bcrypt from 'bcrypt';

// USER REGISTRATION
export const Registration = async (req, res) => {

    try{
        let reqBody = req.body;

        // Cheking User Data Valid or not by utility function
        const isDataValid = await UserData(reqBody);
        if(!isDataValid){
            res.json({status: "fail", message: "Invalid data inputed"});
        }

        // User Registration by Valid User Data
        let newUser = new UserModel(isDataValid);
        await newUser.save();
        res.json({status: "Success", data: newUser});
       
    }catch(e){
        console.log(e);
        return res.json({status: "fail", Message: "Inernal server error"});
    }

}

// USER LOGIN
export const Login = async (req, res) => {
    try{
        const  {email, password} = req.body;
  
        // Input Validation
        if(!email || !password) {
            return res.status(400).json({status: "fail", message: "Invalid input"})
        }

        // Find User
        const user = await UserModel.findOne({email});
        if(!user) {
            return res.status(404).json({status: "fail", message: "User not found"})
        }

        // Password Verification
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({status: "fail", message: "Invalid password or email"});
        }

        // Token Generate
        const token = tokenUtility.TokenEncode(user["email"], user["_id"]);

        return res.json({status: "Success", token, message: "User login successful"})
    }catch(error){
        console.log(error);
        return res.json({status: "Error", Message: "Inernal server error"});
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
        const id = {_id: req.headers["user_id"]};
        const reqBody = req.body;
        const update = await UserModel.updateOne(id, reqBody);
 
        if(update.modifiedCount === 0){
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
    try {
        const email = req.params["email"];
        const data = await UserModel.find({email: email});

        if(data === null){
            res.json({status: "failed", message: "No user found"});
        }else{
            const Code = Math.floor( (100000 + Math.random() * 900000));
            const EmailTo = data[0]['email'];
            const EmailSubject = `Task manager verification code!`;
            const EmailText = `Your verification code is: ${Code}`;
            const EmailHTMLBody = `
                <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Task Manager Verification Code</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #f4f4f4;
                            }
                            .email-container {
                                max-width: 600px;
                                margin: 20px auto;
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                text-align: center;
                                margin-bottom: 20px;
                            }
                            .header h1 {
                                color: #333333;
                                font-size: 24px;
                                margin: 0;
                            }
                            .content {
                                text-align: center;
                                color: #666666;
                                line-height: 1.6;
                            }
                            .content p {
                                font-size: 16px;
                            }
                            .code {
                                font-size: 24px;
                                font-weight: bold;
                                color: #000000;
                                margin: 20px 0;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 20px;
                                font-size: 14px;
                                color: #999999;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="header">
                                <h1>Task Manager Verification Code</h1>
                            </div>
                            <div class="content">
                                <p>Hi,</p>
                                <p>Your verification code is:</p>
                                <div class="code">${Code}</div>
                                <p>Please use this code to verify your account. This code is valid for the next 10 minutes.</p>
                            </div>
                            <div class="footer">
                                <p>If you did not request this code, please ignore this email.</p>
                            </div>
                        </div>
                    </body>
                    </html>
            `
           
            await SendEmail(EmailTo, EmailText, EmailSubject, EmailHTMLBody); // Sending Email to user's
            await UserModel.updateOne({email: email}, {otp: Code}); //If successfully sent the verification Code. Then "otp" will update in DB.
            res.json({status: "Success", message: "Email has beeen sent success!"})
        }
    }catch(e) {
        res.json({status: "failed", error: e.toString()});
    }
};


// OTP CODE VERIFY
export const Code_Verify = async (req, res) => {
    try {
        const {email, code} = req.params;

        const filteringByCode = await UserModel.find({email, otp: code});

        if(filteringByCode === null) {
            return res.status(401).json({status: "fail", message: "Did not match code"})
        }
        res.json({status: "Success", message: "Verification successful"});
    } catch(e) {
        console.log(e);
        res.json({status: "fail", message: "Internal server error"});
    }
};


// Password Reset
export const Password_Reset = async (req, res) => {
    res.json({status: "Success", message: "user password reset successull"});
}

export const WrongUrlHit = (req, res) => {
    res.status(404).json({
        status: "failed",
        message: `The requested URL '${req.originalUrl}' was not found on this server. Please check and try again.`,
    });
};
