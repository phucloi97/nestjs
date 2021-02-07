import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'phucloi1011@gmail.com',
    pass: process.env.passEmail,
  },
});

export class SendMail {
  private mailOption: object;
  constructor() {
    this.mailOption = {
      from: 'vindication@enron.com',
      to: 'phucloi97@hotmail.com',
      subject: 'Invoices due',
      text: 'Dudes, we really need your money111235.',
    };
  }
  send() {
    transporter.sendMail(this.mailOption, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
