import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";

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
    value: "Mekelle,Ethiopia",
    href: "https://www.google.com/maps/place/Mekelle+Institute+of+Technology/@13.4573947,39.4874238,17z/data=!3m1!4b1!4m6!3m5!1s0x166ae333a05e3cab:0xaea31654d48314f1!8m2!3d13.4573895!4d39.4899987!16s%2Fm%2F02r8y5n?entry=ttu",
  },
];
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
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
      return;
    }

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

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

      // ✅ IMPORTANT: check real backend success
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed");
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message: "Message failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-highlight/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-indigo-400 text-md font-medium tracking-wider uppercase">
            Contact
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Let’s{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              work together
            </span>
          </h2>

          <p className="text-muted-foreground">
            Got a project, internship opportunity, or collaboration idea? I’d
            love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form Card */}
          <div className="glass rounded-3xl p-8 border border-primary/20 shadow-xl hover:shadow-primary/10 transition-all">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="text-sm text-muted-foreground">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  placeholder="Your name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white text-black placeholder:text-gray-500 border border-border focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  placeholder="your@email.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white text-black placeholder:text-gray-500 border border-border focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm text-muted-foreground">Message</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  placeholder="Write your message..."
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white text-black placeholder:text-gray-500 border border-border focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              {/* Status */}
              {submitStatus.type && (
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8 border border-primary/20 shadow-xl">
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/40 hover:bg-primary/10 transition group cursor-pointer pointer-events-auto z-10 relative"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="font-medium">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass rounded-3xl p-8 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Available for work</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Open to internships, freelance work, and collaboration
                opportunities in software engineering, AI, and frontend
                development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
