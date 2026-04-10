import { FaGithub, FaLinkedin, FaTwitter, FaTelegram } from "react-icons/fa";
import { Heart } from "lucide-react";

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/kikikatg", label: "GitHub" },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/kiros-asefa/",
    label: "LinkedIn",
  },
  { icon: FaTwitter, href: "https://twitter.com/kikikatg", label: "Twitter" },
  { icon: FaTelegram, href: "https://t.me/kikikatg", label: "Telegram" },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 overflow-hidden border-t border-border">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-highlight/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="glass rounded-3xl p-8 md:p-10 border border-primary/20 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo & Copyright */}
            <div className="text-center md:text-left">
              <a
                href="#"
                className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent"
              >
                Kiros Asefa
              </a>

              <p className="text-sm text-muted-foreground mt-3">
                © {currentYear} Kiros Asefa. All rights reserved.
              </p>

              <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center md:justify-start gap-1">
                Made with <Heart className="w-3 h-3 text-red-500" /> using React
                and vite.{" "}
              </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-full bg-background/40 border border-border hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-all duration-300 shadow-sm hover:shadow-primary/20"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
