import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

const SENDER_EMAIL = "no-reply@reaper-digital.com";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, zipcode } = await req.json();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    const msg = {
      to: email,
      from: SENDER_EMAIL,
      subject: `New Contact Form Submission from '${name}'`,
      text: `
      Name: ${name}\n
      Email: ${email || "N/A"}\n
      Phone: ${phone}\n
      Zipcode: ${zipcode}\n
      Message: ${message}`,
    };

    sgMail.send(msg);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
