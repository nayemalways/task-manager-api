import { DecodeToken } from "../utility/tokenUtility.js";

export const AuthVerify = async (req, res, next) => {
    const token = req.headers['token'];
    let decoded = DecodeToken(token);

    if(decoded === null){
        res.status(401).json({status: "failed", message: "Unauthorized"});
    }else{
        // Retrived email and user_id from "decoded" token.
        let email = decoded.email;
        let user_id = decoded.user_id;

        // Set the email and user_id in the request headers
        req.headers.email = email;
        req.headers.user_id = user_id;

        next(); // Go next you are authenticate user
    }
}