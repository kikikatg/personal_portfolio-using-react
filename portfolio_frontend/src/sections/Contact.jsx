import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

import { Button } from "@/components/Button";
import { useState } from "react";
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "kiru.katg@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=kiru.katg@gmail.com",
  },

  {
    icon: Phone,
    label: "Phone",
    value: "+251 948491557",
    href: "tel:+251948491557",
  },

  {
    icon: MapPin,
    label: "Location",
    value: "Mekelle, Ethiopia",
    href: "https://www.google.com/maps/place/Mekelle+Institute+of+Technology/@13.4573947,39.4874238,17z/data=!3m1!4b1!4m6!3m5!1s0x166ae333a05e3cab:0xaea31654d48314f1!8m2!3d13.4573895!4d39.4899987!16s%2Fm%2F02r8y5n?entry=ttu",
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
 const API_URL = import.meta.env.VITE_API_URL;
 console.log("API URL:", API_URL);
  const [isLoading, setIsLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      return "All fields are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return "Invalid email format";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm();

    if (errorMessage) {
      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });

      toast.error(errorMessage);

      return;
    }

    setIsLoading(true);

    setSubmitStatus({
      type: null,
      message: "",
    });

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed");
      }

      toast.success("Message sent successfully 🚀");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast.error("Something went wrong ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-indigo-400 text-sm font-semibold tracking-[0.2em] uppercase">
            Contact
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight">
            Let’s{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              build something impactful
            </span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            Currently open to internships, junior software engineering roles,
            freelance projects, and collaborations in web development,
            artificial intelligence, and machine learning.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* LEFT — FORM */}
          <div
            className="glass rounded-3xl p-8
            border border-primary/20
            shadow-xl hover:shadow-primary/10
            transition-all"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* NAME */}
              <div>
                <label className="text-sm text-muted-foreground">
                  Name
                </label>

                <input
                  type="text"
                  required
                  value={formData.name}
                  placeholder="Your name"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="mt-2 w-full px-4 py-3 rounded-xl
                  bg-background/40 text-black caret-black
                  placeholder:text-zinc-500
                  border border-white/10
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/20
                  outline-none transition"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm text-muted-foreground">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={formData.email}
                  placeholder="your@email.com"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="mt-2 w-full px-4 py-3 rounded-xl
                  bg-background/40 text-black caret-black
                  placeholder:text-zinc-500
                  border border-white/10
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/20
                  outline-none transition"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="text-sm text-muted-foreground">
                  Subject
                </label>

                <input
                  type="text"
                  required
                  placeholder="Internship opportunity"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subject: e.target.value,
                    })
                  }
                  className="mt-2 w-full px-4 py-3 rounded-xl
                  bg-background/40 text-black caret-black
                  placeholder:text-zinc-500
                  border border-white/10
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/20
                  outline-none transition"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-sm text-muted-foreground">
                  Message
                </label>

                <textarea
                  rows={6}
                  required
                  value={formData.message}
                  placeholder="Write your message..."
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="mt-2 w-full px-4 py-3 rounded-xl
                  bg-background/40 text-black caret-black
                  placeholder:text-zinc-500
                  border border-white/10
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/20
                  outline-none transition resize-none"
                />
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 transition ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* CONTACT INFO */}
            <div className="glass rounded-3xl p-8 border border-primary/20 shadow-xl">
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={
                      item.href.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-4 p-4 rounded-2xl
                    bg-background/40
                    hover:bg-primary/10
                    transition group"
                  >
                    <div
                      className="w-12 h-12 flex items-center
                      justify-center rounded-xl
                      bg-primary/10
                      group-hover:bg-primary/20
                      transition"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>

                      <div className="font-medium text-white">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* LINKEDIN BUTTON */}
              <a
                href="https://www.linkedin.com/in/kiros-asefa/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center
                justify-center px-5 py-3 rounded-xl
                bg-primary/10 hover:bg-primary/20
                transition text-white font-medium"
              >
                Connect on LinkedIn
              </a>
            </div>
            

            {/* AVAILABILITY */}
            <div className="glass rounded-3xl p-8 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />

                <span className="font-medium text-white">
                  Open to Opportunities
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Actively seeking internship and junior software engineering
                opportunities focused on full-stack development,
                AI systems, and modern web technologies.
              </p>
            </div>

            {/* RESPONSE TIME */}
            <div className="glass rounded-3xl p-8 border border-primary/20">
              <h3 className="text-lg font-semibold mb-3">
                Response Time
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                I usually respond within 24 hours.
                For urgent communication, feel free to
                reach out through Telegram or LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};