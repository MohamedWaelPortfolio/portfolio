import emailjs from "@emailjs/browser";

interface EmailParams {
  from_name: string;
  from_email: string;
  message: string;
  [key: string]: string; // Add index signature to allow dynamic properties
}

export const sendEmail = async (params: EmailParams) => {
  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      params,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );
    return result;
  } catch (error) {
    // Log error silently
    throw error;
  }
};
