import nodemailer from 'nodemailer';
import {EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER, MAIL_ENCRYPTION} from '../config/config.js';
import express from 'express';

export const SendEmail = async (EmailTo, EmailText, EmailSubject, EmailHTMLBody) => {

    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: MAIL_ENCRYPTION,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    const MailOptions = {
        from: EMAIL_USER,
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText,
        html: EmailHTMLBody
    }

    // SEND EMAIL
    try{
        await transporter.sendMail(MailOptions);
        return true;
    }catch(error){
        return false;
    }
};


export default SendEmail;