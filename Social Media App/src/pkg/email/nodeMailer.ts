import nodemailer, { Transport ,Transporter,createTransport} from "nodemailer"
import {env} from "../../lib/confiq/env"
import { MailProvider } from "./mail.interface";
interface INodeMailerConfig {
    host?: string;
    port?: number;
    service?: string;
    secure?: boolean;
    user?: string;
    pass?: string;
    fromEmail: string;
  
}

export class nodeMailerProvider implements MailProvider{
   private client : Transporter
   private readonly fromEmail: string

    constructor(config: any){
        this.client = createTransport({
            host: config.host||"smtp.gmail.com",
            port: config.port||587,
         service : config.service||"gmail",
         secure : config.secure||false,
                  auth:{
                   user:config.user//||process.env.MAIL_USER||env.EMAIL_USER,
                  , pass : config.pass//||process.env.MAIL_PASS||env.EMAIL_PASS,
                  },
        })
        this.fromEmail = config.fromEmail
   
    }

   async sendEmail(emailTo :string,subject:string,html:string,TextPart:string)
   {
     this.client.sendMail({
        from: this.fromEmail,
        to: emailTo,
        subject: subject,
        text: TextPart,
        html: html,
     })
     
   }
}