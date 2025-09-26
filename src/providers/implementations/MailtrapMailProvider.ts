import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";
import { Config } from "../../config/Config";

export class MailtrapMailProvider implements IMailProvider {

    private emailSender: Mail;

    constructor() {
        this.emailSender = nodemailer.createTransport({
            host: Config.MAIL_HOST,
            port: Config.MAIL_PORT,
            auth: {
                user: Config.MAIL_USER,
                pass: Config.MAIL_PASS
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
