import Mailjet from 'node-mailjet'
import { MailProvider } from "./mail.interface";

interface IMailJetConfig {
    apiKey: string;
    apiSecret: string;
    fromEmail: string;
    fromName: string;
}

export class MailJetProvider implements MailProvider{
   private client : Mailjet
   private readonly fromEmail: string
   private readonly fromName : string
    constructor(config: IMailJetConfig){
        this.client = new Mailjet({
            apiKey: config.apiKey,
            apiSecret: config.apiSecret,
        })
        this.fromEmail = config.fromEmail
        this.fromName = config.fromName
    }

   async sendEmail(to :string,subject:string,html:string,TextPart:string){
 await this.client.post('send', { version: 'v3.1' }).request({
  Messages: [
    {
      From: {
        Email: this.fromEmail,
        Name: this.fromName,
      },
      To: [
        {
          Email: to,
         
        },
      ],
      Subject: subject,
      TextPart: TextPart,
      HTMLPart: html,
    },
  ],
})

    }

}