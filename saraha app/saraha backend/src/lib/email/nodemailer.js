import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer"
import envConfig from "../config/env.config.js";

  const transporter = nodemailer.createTransport(
        {
            service : "gmail",
           auth:{
            user:process.env.MAIL_USER||envConfig.EMAIL,
            pass : process.env.MAIL_PASS||envConfig.EMAIL_PASS,
           },
           secure : false

        }
    )

    
export async function sendEmail(to,subject,text,html) {


    transporter.sendMail({
     
        from: `"Ngl Team" <${process.env.MAIL_USER||envConfig.EMAIL}>`,
        to: to,
        subject:subject,
        text,
        html:html

    })
}