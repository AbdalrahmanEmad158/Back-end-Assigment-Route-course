import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer"
import envConfig from "../config/env.config.js";
import {logger} from "../../pkg/logger/logger.js"
import { AppError } from "../../pkg/error/error.js";

  const transporter = nodemailer.createTransport(
        {
            service : "gmail",
           auth:{
            user:process.env.MAIL_USER||envConfig.EMAIL,
            pass : process.env.MAIL_PASS||envConfig.EMAIL_PASS,
           },
         

        }
    )

    export const nodeMailerConnection = async()=>{
        try {
  await transporter.verify();
  logger.info("Server is ready to take our messages");
} catch (err) {
 logger.error("Verification failed:", err);
}

    }
    
export async function sendEmail(to,subject,text,html,attachments) {
try {
    if (!text && !html && !attachments) {
    throw new AppError("message or attachments are required",400)
}

     transporter.sendMail({
     
        from: `"Ngl Team" <${process.env.MAIL_USER||envConfig.EMAIL}>`,
        to: to,
        subject:subject,
        text,
        html:html,
        attachments

    })
return true
} catch (error) {
     throw new AppError("Error while sending email",400)
}
}