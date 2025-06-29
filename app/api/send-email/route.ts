import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, message } = await request.json();

    const data = await resend.emails.send({
      from: "Sky Insurance <onboarding@resend.dev>",
      to: ["ib@sky.eg"],
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="text-align: center; color: #333;">New Contact Form Submission</h2>
          <p style="font-size: 16px; color: #555;">
            You have received a new contact form submission. Below are the details:
          </p>
          <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
          <table style="width: 100%; font-size: 16px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>First Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${firstName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Last Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Message:</strong></td>
              <td style="padding: 8px;">${message}</td>
            </tr>
          </table>
          <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 14px; color: #888; text-align: center;">
            Sky Insurance | <a href="mailto:ib@sky.eg" style="color: #007bff; text-decoration: none;">ib@sky.eg</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
