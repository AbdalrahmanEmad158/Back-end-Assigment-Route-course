import { MailJetProvider } from "../../pkg/email/mailjet";
import { nodeMailerProvider } from "../../pkg/email/nodeMailer";
import { env as envConfig } from "../confiq/env.js";

export const initMailJet =new MailJetProvider({
    apiKey: envConfig.mailjet.apiKey,
    apiSecret: envConfig.mailjet.apiSecret,
    fromEmail: envConfig.mailjet.fromEmail,
        fromName: envConfig.mailjet.fromName,
    })

    export const initnodemailer = new nodeMailerProvider({
        
        user: process.env.MAIL_USER||envConfig.nodeMailer.user,
        pass: process.env.MAIL_PASS||envConfig.nodeMailer.password,
    })