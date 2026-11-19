export interface MailProvider {
    sendEmail(to: string, subject: string, html: string, TextPart?: string): Promise<void>;
  }