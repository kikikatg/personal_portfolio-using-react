import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { TypingName } from "@/components/TypingName";

const highlights = [
  {
    icon: Code2,
    title: "Clean Architecture",
    description:
      "Developing scalable and maintainable applications using modern engineering practices.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimizing applications for speed, responsiveness, and smooth user experiences.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Collaborating effectively in teams to design and deliver impactful solutions.",
  },
  {
    icon: Lightbulb,
    title: "AI Innovation",
    description:
      "Building intelligent systems using Machine Learning, NLP, and modern AI technologies.",
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
              Building intelligent{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                digital experiences
              </span>
              <br />
              with AI & modern web technologies.
            </h2>

            {/* DESCRIPTION */}
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p className="leading-relaxed">
  Hi, I'm{" "}
  <span className="text-green-400 font-semibold inline-block min-w-[110px]">
    <TypingName text="Kiros Asefa" />
  </span>
  , a final-year Computer Science and Engineering student at Mekelle University focused on full-stack development, artificial intelligence, and intelligent system design.
</p>

              
            <p>
  I develop responsive web applications using modern frontend and backend technologies while also building AI-powered systems with Machine Learning, NLP, and Computer Vision to solve real-world problems.
</p>

              <p>
  My work focuses on creating scalable and impactful solutions in areas such as agriculture, automation, and intelligent information systems.
</p>
<p>
  I’m continuously improving my expertise in software engineering, backend architecture, and AI deployment to build reliable and user-focused digital products.
</p>
            </div>

            {/* MISSION BOX */}
            <div className="relative p-6 rounded-2xl overflow-hidden group">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20  bg-slate-600 via-transparent to-primary/10 opacity-50 group-hover:opacity-80 transition" />

              <div className="relative glass rounded-2xl p-6 border border-primary/20">
                <p className="text-lg italic font-medium text-white leading-relaxed">
                  “My goal is to develop intelligent and scalable software solutions that combine{" "}
                  <span className="text-green-400 font-semibold">
                   modern engineering principles 
                  </span>{" "}
                  with{" "}
                  <span className="text-green-400 font-semibold">
                    artificial intelligence
                  </span>{" "}
                  to create meaningful real-world impact.”
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
