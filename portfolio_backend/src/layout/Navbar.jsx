import { Button } from "@/components/Button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState("dark");

  // Theme effect
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) =>
        document.querySelector(link.href),
      );

      let current = "home";

      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section.id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll
  const handleScrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-500 z-50 ${
        isScrolled ? "glass-strong py-3 shadow-md" : "bg-slate-700 py-5"
      }`}
    >
      <nav className="container mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between">
        {/* LOGO */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection("home");
          }}
          className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold tracking-tight hover:text-primary transition shrink-0"
        >
          <img
            src="/logo.png"
            alt="Kiros profile"
            className="w-9 h-9 px- sm:h-12 sm:w-12 rounded-full object-cover border border-primary/40"
          />
          <span className="hidden lg:inline">
            Kiros <span className="text-primary">.</span>
          </span>
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-2">
          <div className="glass rounded-full px-3 sm:px-5 lg:px-8 py-1 flex items-center gap-0.5 sm:gap-1">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace("#", "");

              return (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(link.href);
                    setActiveSection(link.href.replace("#", ""));
                  }}
                  className={`px-2 sm:px-3 lg:px-4 py-2 text-sm sm:text-md  md:text-md lg:text-lg transition duration-300 relative ${
                    isActive
                      ? "text-primary font-semibold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary"
                      : "text-muted-foreground hover:text-foreground hover:text-orange-300"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE CONTROLS (FIXED LAYOUT) */}
        <div className="hidden md:flex items-center lg:gap-3 gap-2">
          {/* CTA */}
          <Button
            size="sm"
            onClick={() => {
              handleScrollTo("#contact");
              setActiveSection("contact");
            }}
          >
            Contact Me
          </Button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 text-foreground cursor-pointer"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace("#", "");

              return (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(link.href);
                    setActiveSection(link.href.replace("#", ""));
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-lg font-medium py-2 transition ${
                    isActive
                      ? "text-primary underline underline-offset-4"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <Button
              onClick={() => {
                handleScrollTo("#contact");
                setActiveSection("contact");
                setIsMobileMenuOpen(false);
              }}
            >
              Contact Me
            </Button>

            {/* Mobile Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-white/10 w-fit"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
