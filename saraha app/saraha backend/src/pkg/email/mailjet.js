import Mailjet from 'node-mailjet'


export class MailJetProvider{
    client 
    fromEmail
    fromName
    constructor(convig){
        this.client = new Mailjet({
            apiKey: convig.apiKey,
            apiSecret: convig.apiSecret,
        })
        this.fromEmail = convig.fromEmail
        this.fromName = convig.fromName
    }

   async sendEmail(to,subject,html,TextPart){
 this.client.post('send', { version: 'v3.1' }).request({
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