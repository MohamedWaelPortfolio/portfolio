"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    email: "Modywaelabdo@gmail.com",
    phone: "+201062137061",
    social: {
      twitter: "https://x.com/MohamedTweetys",
    },
  };

  const handleCopy = async (type: "email" | "phone") => {
    const text = type === "email" ? contactInfo.email : contactInfo.phone;
    await navigator.clipboard.writeText(text);
    setCopiedField(type);
    setTimeout(() => setCopiedField(null), 2000);
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
    setSubmitStatus("idle");
    try {
      const emailData = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        [data.email]: data.email, // This adds the index signature requirement
      };
      await sendEmail(emailData);
      setSubmitStatus("success");
      formRef.current.reset();
    } catch (err) {
      setSubmitStatus("error");
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
      {/* Background pattern/decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Info Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-blue-500/50 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/50">
              <div className="mb-8">
                <h3 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  Contact Information
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Feel free to reach out through any of these channels
                </p>
              </div>

              {/* Email */}
              <div className="mb-6">
                <div className="mb-2 flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Email:</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-neutral-800/50">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {contactInfo.email}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleCopy("email")}
                    className="rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-700"
                    title="Copy email"
                  >
                    {copiedField === "email" ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-6">
                <div className="mb-2 flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Phone:</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-neutral-800/50">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {contactInfo.phone}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleCopy("phone")}
                    className="rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-700"
                    title="Copy phone"
                  >
                    {copiedField === "phone" ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="mb-3 text-gray-600 dark:text-gray-400">
                  Social Media:
                </h4>
                <div className="flex gap-4">
                  <a
                    href={contactInfo.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-gray-50 p-2 transition-colors hover:bg-gray-100 dark:bg-neutral-800/50 dark:hover:bg-neutral-700"
                  >
                    <Twitter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-blue-500/50 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/50"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full rounded-lg border bg-gray-50 px-4 py-3 dark:bg-neutral-800/50 ${
                    formErrors.name
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-neutral-700"
                  } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50`}
                  placeholder="Your name"
                />
                {formErrors.name && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full rounded-lg border bg-gray-50 px-4 py-3 dark:bg-neutral-800/50 ${
                    formErrors.email
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-neutral-700"
                  } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50`}
                  placeholder="your.email@example.com"
                />
                {formErrors.email && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={`w-full rounded-lg border bg-gray-50 px-4 py-3 dark:bg-neutral-800/50 ${
                    formErrors.message
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-neutral-700"
                  } resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50`}
                  placeholder="Your message..."
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white ${isSubmitting ? "cursor-not-allowed opacity-50" : "hover:from-blue-700 hover:to-purple-700"} flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {" "}
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="ml-2">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {submitStatus !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`rounded-lg p-4 ${
                      submitStatus === "success"
                        ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                        : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <p className="flex items-center gap-2">
                        <Check className="h-5 w-5" />
                        Message sent successfully!
                      </p>
                    ) : (
                      <p className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Failed to send message. Please try again.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
