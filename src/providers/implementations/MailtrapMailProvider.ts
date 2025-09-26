import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export class MailtrapMailProvider implements IMailProvider {

    private emailSender: Mail;

    constructor() {
        this.emailSender = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '6035f8ac2b7a9a',
                pass: '25dac87ead06e9'
            }
        })
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.emailSender.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body
        })
    }
}
