import { Service } from "typedi";
import * as nodemailer from "nodemailer";

import config from "../config";

@Service()
export default class EmailService {
  private smtpTransport;
  constructor() {
    this.smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.GMAIL.USER,
        type: config.GMAIL.TYPE,
        refreshToken: config.GMAIL.REFRESH_TOKEN,
        clientId: config.GMAIL.CLIENT_ID,
        clientSecret: config.GMAIL.CLIENT_SECRET
      }
    });
  }

  async sendMail(options: {
    to: string;
    subject: string;
    html?: string;
    text?: string;
  }) {
    const mailOptions = {
      from: "noreply@xydev.io",
      to: options.to,
      subject: options.subject,
      text: options.text || "",
      html: options.html || ""
    };

    return new Promise((resolve, reject) => {
      // resolve("EMAIL IS DISABLED FOR A WHILE");
      this.smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
          reject(error);
        }
        console.log("email sent");
        this.smtpTransport.close();
        resolve(response);
      });
    });
  }
}
