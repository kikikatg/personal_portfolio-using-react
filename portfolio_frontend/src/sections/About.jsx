import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { TypingName } from "@/components/TypingName";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing maintainable, scalable solutions with best practices.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Building fast, optimized applications with smooth user experience.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively in teams to deliver impactful solutions.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Exploring modern technologies in Web, ML, and AI.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            {/* Section Tag */}
            <span className="text-sm font-semibold tracking-widest uppercase text-indigo-400">
              About Me
            </span>

            {/* HEADER */}
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Turning ideas into{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                real-world solutions
              </span>
              <br />
              with code & intelligence.
            </h2>

            {/* DESCRIPTION */}
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p className="leading-relaxed">
                Hi, I'm{" "}
                <span className="text-green-400 font-semibold inline-block min-w-[110px]">
                  <TypingName text="Kiros              Asefa  " />
                </span>
                , Computer Science student and passionate developer focused on
                building modern web applications and intelligent systems
              </p>

              <p>
                Computer Science student and passionate developer focused on
                building modern web applications and intelligent systems
              </p>
              <p>
                I specialize in{" "}
                <span className="text-white font-medium">
                  React, JavaScript, HTML, and Tailwind CSS
                </span>{" "}
                for frontend development, while also working with{" "}
                <span className="text-white font-medium">
                  Node.js, Express.js, and MongoDB
                </span>{" "}
                on the backend. Additionally, I build intelligent systems using{" "}
                <span className="text-white font-medium">
                  Python, Machine Learning, and NLP
                </span>{" "}
                to create smart, scalable, and real-world solutions.
              </p>

              <p>
                My goal is to combine software engineering with AI to solve real
                problems — especially in areas like agriculture, automation, and
                intelligent systems.
              </p>
            </div>

            {/* MISSION BOX */}
            <div className="relative p-6 rounded-2xl overflow-hidden group">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20  bg-slate-600 via-transparent to-primary/10 opacity-50 group-hover:opacity-80 transition" />

              <div className="relative glass rounded-2xl p-6 border border-primary/20">
                <p className="text-lg italic font-medium text-white leading-relaxed">
                  “My mission is to build impactful digital solutions that
                  combine{" "}
                  <span className="text-green-400 font-semibold">
                    software engineering
                  </span>{" "}
                  and{" "}
                  <span className="text-green-400 font-semibold">
                    artificial intelligence
                  </span>{" "}
                  to solve real-world problems.”
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT (CARDS) */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl transition duration-300 bg-zinc-700
                hover:-translate-y-2 hover:shadow-lg hover:bg-gray-800"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-green-300" />
                </div>

                <h3 className="text-lg font-semibold mb-2 text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
