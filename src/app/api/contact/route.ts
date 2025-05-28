import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/emailjs-utils";
import { validateContactForm } from "@/components/contact-form-validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the form data
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    // Format data for email service
    const emailData = {
      from_name: body.name,
      from_email: body.email,
      message: body.message,
      [body.email]: body.email,
    };

    // Send email
    await sendEmail(emailData);

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
