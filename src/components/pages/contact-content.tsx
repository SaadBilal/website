"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Clock,
  Send,
  Calendar,
  MessageSquare,
  Briefcase,
  CheckCircle2,
  Loader2,
  ExternalLink,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data/profile";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject too long"),
  type: z.enum(["job", "consulting", "collaboration", "other"]),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message too long"),
  budget: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inquiryTypes = [
  { value: "job", label: "Job Opportunity", icon: Briefcase },
  { value: "consulting", label: "Consulting", icon: MessageSquare },
  { value: "collaboration", label: "Collaboration", icon: CheckCircle2 },
  { value: "other", label: "Other", icon: Mail },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: profile.github,
    username: "@saadbilal",
    description: "Open source & projects",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: profile.linkedin,
    username: "in/saadbilal",
    description: "Professional network",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: profile.twitter,
    username: "@saadbilal_dev",
    description: "Tech thoughts & updates",
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${profile.email}`,
    username: profile.email,
    description: "Direct email",
  },
];

export function ContactContent() {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: "job" },
  });

  const selectedType = watch("type");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send message");
      }

      setSubmitted(true);
      reset();
      toast.success("Message sent successfully! I'll get back to you within 24 hours.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section
        ref={headerRef}
        className="section-padding relative overflow-hidden"
        aria-label="Contact header"
      >
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Let&apos;s{" "}
              <span className="gradient-text">Work Together</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Available for senior remote roles, technical consulting, and
              startup collaborations. I respond to all serious inquiries within
              24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-32" aria-label="Contact form and info">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Left sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <h3 className="font-semibold text-foreground">
                    Currently Available
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Open to senior remote roles, consulting engagements, and
                  technical leadership opportunities worldwide.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span>{profile.timezone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>{profile.phone}</span>
                  </div>
                </div>
              </motion.div>

              {/* What I'm looking for */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-semibold text-foreground mb-4">
                  What I&apos;m Looking For
                </h3>
                <ul className="space-y-3">
                  {[
                    "Senior Full-Stack / Backend roles",
                    "Solutions Architect positions",
                    "Technical Lead opportunities",
                    "Cloud architecture consulting",
                    "Startup technical co-founder",
                    "Enterprise system design",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Calendly */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <Button variant="gradient" size="lg" className="w-full" asChild>
                  <a
                    href={profile.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule a Call
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-3"
              >
                <h3 className="font-semibold text-foreground">Connect</h3>
                {socialLinks.map(({ icon: Icon, label, href, username }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-muted/50 transition-all duration-200 group"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {label}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {username}
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-12 text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    Message Sent!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. I&apos;ll review your message and
                    get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Send a Message
                  </h2>
                  <p className="text-muted-foreground text-sm mb-8">
                    Fill out the form below and I&apos;ll get back to you
                    promptly.
                  </p>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                  >
                    {/* Inquiry type */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Inquiry Type
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {inquiryTypes.map(({ value, label, icon: Icon }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() =>
                              setValue(
                                "type",
                                value as ContactFormData["type"]
                              )
                            }
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all duration-200 ${
                              selectedType === value
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border bg-muted/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          {...register("name")}
                          className={`w-full px-4 py-2.5 rounded-lg border bg-muted/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 ${
                            errors.name
                              ? "border-destructive"
                              : "border-border"
                          }`}
                          placeholder="John Smith"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-destructive">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          {...register("email")}
                          className={`w-full px-4 py-2.5 rounded-lg border bg-muted/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 ${
                            errors.email
                              ? "border-destructive"
                              : "border-border"
                          }`}
                          placeholder="saad@company.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Subject *
                      </label>
                      <input
                        id="subject"
                        type="text"
                        {...register("subject")}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-muted/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 ${
                          errors.subject
                            ? "border-destructive"
                            : "border-border"
                        }`}
                        placeholder="Senior Backend Engineer Role at Acme Corp"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Budget (for consulting) */}
                    {selectedType === "consulting" && (
                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Budget Range (Optional)
                        </label>
                        <select
                          id="budget"
                          {...register("budget")}
                          className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select budget range</option>
                          <option value="<5k">Under $5,000</option>
                          <option value="5k-15k">$5,000 - $15,000</option>
                          <option value="15k-50k">$15,000 - $50,000</option>
                          <option value="50k+">$50,000+</option>
                          <option value="ongoing">Ongoing retainer</option>
                        </select>
                      </div>
                    )}

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        {...register("message")}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-muted/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none ${
                          errors.message
                            ? "border-destructive"
                            : "border-border"
                        }`}
                        placeholder="Tell me about the opportunity, project, or how I can help..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Privacy note */}
                    <p className="text-xs text-muted-foreground">
                      Your information is kept private and never shared with
                      third parties. I typically respond within 24 hours.
                    </p>

                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
