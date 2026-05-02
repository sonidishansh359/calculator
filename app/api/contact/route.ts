import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,       // sonidishansh359@gmail.com
      pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
    },
  });

  const mailOptions = {
    from: `"Bharat Hub Contact" <${process.env.GMAIL_USER}>`,
    to: "sonidishansh359@gmail.com",
    replyTo: email,
    subject: `[Contact Form] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #1e293b; margin-bottom: 24px;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 8px 0; color: #1e293b;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Subject:</td>
            <td style="padding: 8px 0; color: #1e293b;">${subject}</td>
          </tr>
        </table>
        <hr style="margin: 20px 0; border-color: #e2e8f0;" />
        <p style="color: #64748b; font-weight: bold; margin-bottom: 8px;">Message:</p>
        <p style="color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        <hr style="margin: 20px 0; border-color: #e2e8f0;" />
        <p style="color: #94a3b8; font-size: 12px;">Sent via Bharat Hub Contact Form</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
