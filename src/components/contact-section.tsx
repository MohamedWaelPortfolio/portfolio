"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { sendEmail } from "@/utils/emailjs-utils";
import {
  Send,
  Mail,
  Phone,
  Copy,
  ExternalLink,
  Check,
  Twitter,
  AlertCircle,
} from "lucide-react";
import {
  validateContactForm,
  ContactFormData,
} from "./contact-form-validation";

// Styles
const styles = {
  input: `w-full px-4 py-3 bg-black/30 backdrop-blur-sm 
    border border-white/10 rounded-lg 
    focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
    outline-none transition-colors text-white/90 placeholder:text-white/50`,
  label: "block text-sm font-medium text-white/70 mb-2",
  card: "bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-blue-500/20 hover:bg-black/40 transition-all duration-300",
  heading: "text-2xl font-semibold mb-6 text-white/90",
  errorMessage: "mt-1 text-sm text-red-400/90 flex items-center gap-1",
};

// Contact Info Component
const ContactInfo = ({
  email,
  phone,
  onCopy,
  copiedField,
}: {
  email: string;
  phone: string;
  onCopy: (type: "email" | "phone") => void;
  copiedField: "email" | "phone" | null;
}) => (
  <div className={styles.card}>
    <h3 className={styles.heading}>Contact Information</h3>

    {/* Email */}
    <div className="group mb-6">
      <div className="mb-2 flex items-center gap-3 text-white/70">
        <Mail className="h-5 w-5 text-blue-400" aria-hidden="true" />
        <span className="font-medium">Email:</span>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-white/5 p-3 backdrop-blur-sm transition-colors group-hover:bg-white/10">
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 text-blue-400 transition-colors hover:text-blue-300"
          aria-label={`Send email to ${email}`}
        >
          {email}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
        <button
          onClick={() => onCopy("email")}
          className="rounded-md p-2 transition-colors hover:bg-white/10"
          aria-label="Copy email address"
        >
          {copiedField === "email" ? (
            <Check className="h-5 w-5 text-green-400" aria-hidden="true" />
          ) : (
            <Copy className="h-5 w-5 text-white/50" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>

    {/* Phone */}
    <div className="group">
      <div className="mb-2 flex items-center gap-3 text-white/70">
        <Phone className="h-5 w-5 text-blue-400" aria-hidden="true" />
        <span className="font-medium">Phone:</span>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-white/5 p-3 backdrop-blur-sm transition-colors group-hover:bg-white/10">
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 text-blue-400 transition-colors hover:text-blue-300"
          aria-label={`Call ${phone}`}
        >
          {phone}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
        <button
          onClick={() => onCopy("phone")}
          className="rounded-md p-2 transition-colors hover:bg-white/10"
          aria-label="Copy phone number"
        >
          {copiedField === "phone" ? (
            <Check className="h-5 w-5 text-green-400" aria-hidden="true" />
          ) : (
            <Copy className="h-5 w-5 text-white/50" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  </div>
);

// Social Links Component
const SocialLinks = ({ twitter }: { twitter: string }) => (
  <div className={styles.card}>
    <h3 className={styles.heading}>Follow Me</h3>
    <a
      href={twitter}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-white/70 transition-colors hover:text-blue-400"
      aria-label="Follow me on Twitter"
    >
      <Twitter className="h-5 w-5" aria-hidden="true" />
      <span>Twitter</span>
      <ExternalLink className="ml-auto h-4 w-4" aria-hidden="true" />
    </a>
  </div>
);

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(
    null
  );
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef(null);

  const contactInfo = {
    email: "contact@mohamedwaelportfolio.site",
    phone: "+201062137061",
    social: {
      twitter: "https://x.com/MohamedTweetys",
    },
  };

  // Optimize performance: memoize handlers and reduce animation durations
  const handleCopy = useCallback(
    async (type: "email" | "phone") => {
      const text = type === "email" ? contactInfo.email : contactInfo.phone;
      try {
        await navigator.clipboard.writeText(text);
        setCopiedField(type);
        setTimeout(() => setCopiedField(null), 1500); // reduce timeout
      } catch (error) {
        console.error("Failed to copy text:", error);
      }
    },
    []
  );

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

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

    setFormErrors({});
    setIsSubmitting(true);

    try {
      await sendEmail({
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      });
      setSubmitStatus("success");
      formRef.current.reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000); // reduce timeout
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[url('/images/sections/contact/waves-bg.svg')] bg-cover bg-no-repeat py-24"
      aria-label="Contact section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            <span className="animate-gradient bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-lg text-white/60">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <ContactInfo
              email={contactInfo.email}
              phone={contactInfo.phone}
              onCopy={handleCopy}
              copiedField={copiedField}
            />
            <SocialLinks twitter={contactInfo.social.twitter} />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`${styles.card} space-y-6`}
              aria-label="Contact form"
            >
              <h3 className={styles.heading}>Send a Message</h3>

              {/* Name Input */}
              <div>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder="Your name"
                  aria-required="true"
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                />
                {formErrors.name && (
                  <p
                    id="name-error"
                    className={styles.errorMessage}
                    role="alert"
                  >
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    {formErrors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  placeholder="your.email@example.com"
                  aria-required="true"
                  aria-invalid={!!formErrors.email}
                  aria-describedby={
                    formErrors.email ? "email-error" : undefined
                  }
                />
                {formErrors.email && (
                  <p
                    id="email-error"
                    className={styles.errorMessage}
                    role="alert"
                  >
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className={styles.label}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`${styles.input} resize-none`}
                  placeholder="Your message..."
                  aria-required="true"
                  aria-invalid={!!formErrors.message}
                  aria-describedby={
                    formErrors.message ? "message-error" : undefined
                  }
                />
                {formErrors.message && (
                  <p
                    id="message-error"
                    className={styles.errorMessage}
                    role="alert"
                  >
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500/80 px-6 py-3 font-medium text-white backdrop-blur-sm transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-75"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                aria-label={
                  isSubmitting ? "Sending message..." : "Send message"
                }
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex items-center gap-2 text-sm text-green-400"
                    role="status"
                  >
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Message sent successfully!
                  </motion.p>
                )}
                {submitStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex items-center gap-2 text-sm text-red-400"
                    role="alert"
                  >
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    Failed to send message. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
