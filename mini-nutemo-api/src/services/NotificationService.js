const nodemailer = require('nodemailer');
const axios = require('axios');
const UserModel = require('../models/UserModel');

class NotificationService {
  constructor() {
    // Initialize email transporter with Mailtrap
    this.emailTransporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    });
  }

  async sendEmail(userId, subject, message) {
    try {
      const user = await UserModel.getUserById(userId);
      if (!user || !user.email) return;

      await this.emailTransporter.sendMail({
        from: '"Mini-Netumo" <noreply@mininetumo.com>',
        to: user.email,
        subject,
        text: message,
        html: `<p>${message}</p>`
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendWebhook(userId, message) {
    try {
      const user = await UserModel.getUserById(userId);
      if (!user || !user.webhook_url) return;

      await axios.post(user.webhook_url, {
        text: message
      });
    } catch (error) {
      console.error('Error sending webhook:', error);
    }
  }

  async notify(userId, subject, message) {
    // Send both email and webhook notifications
    await Promise.all([
      this.sendEmail(userId, subject, message),
      this.sendWebhook(userId, message)
    ]);
  }
}

module.exports = new NotificationService(); 