import UserModel from "../model/UserModel.js";
import SendEmail from "../utility/emailUtility.js";
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


// CODE VERIFY
export const Code_Verify = async (req, res) => {
    res.json({status: "Success", message: "user  code verify successull"});
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
