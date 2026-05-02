import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  // Validate environment variables first
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error("Missing env vars: GMAIL_USER or GMAIL_APP_PASSWORD not set.");
    return NextResponse.json(
      { error: "Server email configuration is missing. Please contact the admin." },
      { status: 500 }
    );
  }

  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const mailOptions = {
    from: `"Bharat Hub Contact" <${gmailUser}>`,
    to: "sonidishansh359@gmail.com",
    replyTo: email,
    subject: `[Contact Form] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #1e293b; margin-bottom: 24px;">📬 New Contact Form Submission</h2>
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
    console.error("Nodemailer send error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
