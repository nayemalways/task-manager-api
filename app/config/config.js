// DEPENDENCIE
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// MONGODB CONNECTION
export const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

// DATABASE USERNAME, PASSWORD
export const USERNAME = process.env.user;
export const PASSWORD = process.env.pass;

// JSON WEB TOKEN
export const JWT_SECRET =  process.env.JWT_SECRET;
export const JWT_EXPIRATION_TIME =  process.env.JWT_EXPIRATION_TIME; // (30 days)


// EMAIL SENDING CONFIG
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT =  process.env.EMAIL_PORT;
export const EMAIL_USER =  process.env.EMAIL_USER;
export const EMAIL_PASSWORD =  process.env.EMAIL_PASSWORD;
export const MAIL_ENCRYPTION = true;
 


// RATE LIMITING CONFIG
export const REQUEST_RATE_LIMIT_TIME = process.env.REQUEST_RATE_LIMIT_TIME; // 15 MIN
export const REQUEST_RATE_LIMIT_NUMBER = process.env.REQUEST_RATE_LIMIT_NUMBER;

// JSON MAZIMUM SIZE
export const MAX_JSON_SIZE = process.env.MAX_JSON_SIZE;

// WEB CACHE 
export const WEB_CACHE = false;

// URL ENCODE 
export const URL_ENCODE = process.env.URL_ENCODE;

// PORT
export const PORT = process.env.PORT || 3000;


// FILE UPLOAD PATH
export function UPLOAD_PATH (filename){
    return path.resolve(process.cwd(), 'storage', filename);
}