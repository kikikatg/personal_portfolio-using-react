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
  { href: "#contact", label: "Contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-14 overflow-hidden border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="glass rounded-3xl p-10 border border-white/10 shadow-xl backdrop-blur-xl">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            
            {/* LEFT — BRAND */}
            <div className="text-center md:text-left space-y-2">
              <a
                href="#"
                className="text-xl font-bold bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent"
              >
                Kiros Asefa
              </a>

              <p className="text-sm text-zinc-400">
                © {currentYear} All rights reserved.
              </p>

              <p className="text-xs text-zinc-500 flex items-center justify-center md:justify-start gap-2">
                Built with
                <Heart className="w-3 h-3 text-red-500" />
                React + Vite
              </p>
            </div>

            {/* CENTER — NAV */}
            <nav className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm text-zinc-400 hover:text-white transition group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* RIGHT — SOCIAL */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group p-3 rounded-xl bg-white/5 border border-white/10
                  hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-zinc-400 group-hover:text-primary transition" />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};