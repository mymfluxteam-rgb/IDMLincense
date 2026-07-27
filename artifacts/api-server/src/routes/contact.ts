import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const RECIPIENT_EMAIL = "mahar80729@gmail.com";

router.post("/contact", async (req, res) => {
  const { name, email, reason, message } = req.body ?? {};

  if (!name || !email || !message) {
    res.status(400).json({ error: "name, email, and message are required." });
    return;
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    logger.error("SMTP_USER or SMTP_PASS environment variables are not configured.");
    res.status(503).json({ error: "Email service is not configured." });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const subject = reason
    ? `[SoftStore Contact] ${reason} — from ${name}`
    : `[SoftStore Contact] New message from ${name}`;

  const html = `
    <h2>New Contact Form Submission — SoftStore</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td style="font-weight:bold;padding-right:16px;">Name</td><td>${name}</td></tr>
      <tr><td style="font-weight:bold;padding-right:16px;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
      ${reason ? `<tr><td style="font-weight:bold;padding-right:16px;">Reason</td><td>${reason}</td></tr>` : ""}
      <tr><td style="font-weight:bold;padding-right:16px;vertical-align:top;">Message</td><td style="white-space:pre-wrap;">${message}</td></tr>
    </table>
  `;

  try {
    await transporter.sendMail({
      from: `"SoftStore Contact" <${smtpUser}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject,
      html,
    });

    logger.info({ from: email }, "Contact form email sent successfully");
    res.status(200).json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to send contact form email");
    res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

export default router;
