import { Button } from "@/components/Button";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaTelegram } from "react-icons/fa";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";
import { TypingName } from "@/components/TypingName";

const skills = [
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "Python",
  "Machine Learning",
  "NLP",
  "Jupyter Notebook",
  "Google Colab",
  "UI/UX Design",
  "Tailwind CSS",
  "Git",
];
export const Hero = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
      {/* Green Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${
                10 + Math.random() * 20
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      {/* Content */}
      <div className="container mt-32 mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            {/* Badge */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-md text-indigo-400">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Software Engineer • Full Stack Developer
              </span>
            </div>

            {/* HEADLINE */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight">
                Building{" "}
                <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  modern web
                </span>
                <br />
                experiences that
                <br />
                <span className="font-serif italic font-normal text-white">
                  stand out.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Hi, I'm{" "}
                <span className="text-primary font-semibold inline-block min-w-[110px]">
                  <TypingName text="Kiros Asefa" />
                </span>{" "}
                — a software engineer focused on building fast, scalable, and
                user-friendly web applications.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo("#contact")}>
                Contact Me <ArrowRight className="w-5 h-5" />
              </Button>

              <AnimatedBorderButton
                as="a"
                href="/transcript document1.pdf"
                download
              >
                <Download className="w-5 h-5" />
                Download CV
              </AnimatedBorderButton>
            </div>

            {/* SOCIALS */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Follow me:</span>

              {[
                { icon: FaGithub, href: "https://github.com/kikikatg" },
                {
                  icon: FaLinkedin,
                  href: "https://www.linkedin.com/in/kiros-asefa/",
                },
                { icon: FaTwitter, href: "https://twitter.com/kikikatg" },
                { icon: FaTelegram, href: "https://t.me/kikikatg" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT (Clean Profile Image) */}
          <div className="relative">
            <div className="relative max-w-md mx-auto">
              {/* Soft background glow (very subtle) */}
              <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-2xl" />

              {/* Image container */}
              <div className="relative glass rounded-3xl p-2 border border-primary/20 shadow-lg transition">
                <img
                  src="/hero_image.jpg"
                  alt="Kiros Asefa"
                  className="w-full aspect-[4/5] object-cover rounded-2xl"
                />
                {/* Optional simple badge */}
                {/* Stats Badge */}{" "}
                <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500">
                  {" "}
                  <div className="text-2xl font-bold text-primary">5+</div>{" "}
                  <div className="text-xs text-muted-foreground">
                    {" "}
                    Years Exp.{" "}
                  </div>{" "}
                </div>
                <div className="absolute -bottom-3 -right-3 glass rounded-xl px-3 py-2 border border-primary/20">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-float animation-delay-500 animate-pulse" />
                    <span className="text-xs font-medium">
                      Available for work
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-20">
          <p className="text-md text-indigo-400 text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>

          {/* Moving skills */}
          <div className="flex animate-marquee whitespace-nowrap">
            {[...skills, ...skills].map((skill, idx) => (
              <div key={idx} className="flex-shrink-0 px-8 py-4">
                <span className="text-md text-neutral-300 font-semibold text-muted-foreground/60 hover:text-primary transition">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SCROLL DOWN */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 
  animate-fade-in animation-delay-800"
      >
        <button
          onClick={() => {
            document.querySelector("#about")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase text-teal-300 *:tracking-wider">
            Scroll
          </span>
          <ChevronDown className="w-6 h-6 animate-bounce text-lime-400" />
        </button>
      </div>
    </section>
  );
};
