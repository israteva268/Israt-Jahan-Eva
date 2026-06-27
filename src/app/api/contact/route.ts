import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields: name, email, and message" },
        { status: 400 }
      );
    }

    const recipientEmail = "israteva8084@gmail.com";

    // SMTP Credentials Configuration
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      // Simulation/Development Mode fallback
      console.log("-----------------------------------------");
      console.log("CONTACT FORM SUBMISSION (Simulation Mode)");
      console.log(`From: ${name} <${email}>`);
      console.log(`To: ${recipientEmail}`);
      console.log("Message:");
      console.log(message);
      console.log("-----------------------------------------");
      console.log("Tip: Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS env variables to send live emails.");

      return NextResponse.json({
        message: "Message received (simulated success). In production, set your SMTP environment variables.",
        simulated: true,
      });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: parseInt(smtpPort) === 465, // True for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Compile email message content
    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // Send via authenticated user
      replyTo: email, // Set sender email as replyTo
      to: recipientEmail,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Portfolio Contact Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Your message has been sent successfully!",
    });
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { message: "Internal server error. Failed to forward message.", error: error?.message || error },
      { status: 500 }
    );
  }
}
