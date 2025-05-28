export const EMAIL_CONFIG = {
  SERVICE_ID: "service_t8r0g1v",
  TEMPLATE_ID: "template_h12ra9l",
  PUBLIC_KEY: "_M9jMRrHBMUZbteBj",
  FROM_EMAIL: "contact@mohamedwaelportfolio.site",
  TEMPLATES: {
    CONTACT_FORM: {
      subject: (name: string) => `New Contact Form Submission from ${name}`,
      text: (data: { name: string; email: string; message: string }) =>
        `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    },
  },
};
