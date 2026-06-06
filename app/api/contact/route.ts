import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { SITE } from "@/lib/constants";

/** Basic HTML-escape to prevent injection */
function esc(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const toEmail = process.env.SENDGRID_TO_EMAIL;
    const fromName = process.env.SENDGRID_FROM_NAME || "Portfolio Contact";

    if (!apiKey || !apiKey.startsWith("SG.")) {
      console.error("SENDGRID_API_KEY is missing or invalid");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503 }
      );
    }

    if (!toEmail) {
      console.error("SENDGRID_TO_EMAIL is not configured");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503 }
      );
    }

    sgMail.setApiKey(apiKey);

    const safeName = esc(name);
    const safeEmail = esc(email);
    const safeMessage = esc(message);

    await sgMail.send({
      to: toEmail,
      from: { email: toEmail, name: `${SITE.name} Portfolio - ${fromName}` },
      replyTo: { email, name },
      subject: `${name} — via portfolio`,
      categories: ["portfolio-contact"],
      text: [
        `From: ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
      html: `<p><b>From:</b> ${safeName} &lt;${safeEmail}&gt;</p>
<p><b>Message:</b></p>
<p>${safeMessage.replace(/\n/g, "<br>")}</p>`,
    });

    return NextResponse.json(
      { success: true, message: "Message sent!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("SendGrid error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
