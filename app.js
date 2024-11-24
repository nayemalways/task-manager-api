import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import mongoose from "mongoose";
import nodemailer from 'nodemailer';
import rateLimit from "express-rate-limit";
import {PORT, WEB_CACHE, REQUEST_RATE_LIMIT_NUMBER, REQUEST_RATE_LIMIT_TIME, URL_ENCODE, MONGODB_CONNECTION, MAX_JSON_SIZE} from './app/config/config.js';
import router from './routes/api.js';


const app = express();

// APPLICATION GLOBAL MIDDLEWARE
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODE}));

// RATE LIMIT
const limitter = rateLimit({windowMs: REQUEST_RATE_LIMIT_TIME, max: REQUEST_RATE_LIMIT_NUMBER});
app.use(limitter);

// WEB CACHE
app.set('etag', WEB_CACHE);

// MONGODB CONNECTION
const options = {
    user: "nayemalways",       
    pass: "nayem#dev017",   
    autoIndex: true,           
    serverSelectionTimeoutMS: 30000   
};
mongoose.connect(MONGODB_CONNECTION , options)
    .then(() => console.log('DB connect success'))
    .catch((err) => console.error(err));

 

// STATIC STORAGE FILE
app.use(express.static('storage'));


// ROUTING SETUP
app.use('/api', router);


// *** APPLICATION LISTENING ***
app.listen(PORT, () => {
    console.log(`Application running on http://localhost:${PORT}`);
})