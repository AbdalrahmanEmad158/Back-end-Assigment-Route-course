import { MailJetProvider } from "../../pkg/email/mailjet.js";
import envConfig from "../config/env.config.js";

export const initMailJet =new MailJetProvider({
    apiKey: envConfig.MAIL_JET_API_KEY,
    apiSecret: envConfig.MAIL_JET_SECRET_KEY,
    fromEmail: envConfig.MAIL_JET_FROM_EMAIL,
    fromName: envConfig.MAIL_JET_FROM_NAME,
})