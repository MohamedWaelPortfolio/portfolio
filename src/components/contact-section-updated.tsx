"use client";

import { useState, useRef } from "react";
import {
  validateContactForm,
  ContactFormData,
} from "./contact-form-validation";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef(null);

  const contactInfo = {
    email: "Modywaelabdo@gmail.com",
    phone: "+201062137061",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormErrors({});
    const formData = new FormData(formRef.current);
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    const validation = validateContactForm(data);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      formRef.current.reset();
    } catch (err) {
      // Handle error silently
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 dark:from-[#0a0a0a] dark:to-[#111]"
    >
      {/* Your existing JSX */}
    </section>
  );
}
