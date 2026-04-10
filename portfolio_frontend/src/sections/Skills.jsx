import { Code2, Database, Brain, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    skills: ["React", "JavaScript", "HTML", "CSS", "vite", "Tailwind CSS"],
  },
  {
    title: "Backend & Database",
    icon: Database,
    skills: ["Node.js", "MongoDB", "Express.js"],
  },
  {
    title: "Machine Learning & NLP",
    icon: Brain,
    skills: [
      "Python",
      "Machine Learning",
      "NLP",
      "CNN",
      "Jupyter Notebook",
      "Google Colab",
    ],
  },
  {
    title: "Tools & Others",
    icon: Wrench,
    skills: ["Git", "GitHub", "UI/UX Design"],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-cyan-400/10 blur-3xl rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-md font-semibold tracking-widest uppercase text-indigo-400">
            My Skills
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6">
            Technologies I use to{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              build and innovate
            </span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            I combine{" "}
            <span className="text-white font-medium">
              modern web development
            </span>{" "}
            with{" "}
            <span className="text-white font-medium">machine learning</span> to
            create scalable and intelligent applications.
          </p>
        </div>

        {/* SKILLS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-2xl transition duration-300 
bg-white/5 backdrop-blur-xl border border-white/10 
hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(32,178,166,0.2)] 
hover:border-primary/40"
            >
              {/* ICON + TITLE */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              {/* SKILLS LIST */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm rounded-full 
                    bg-surface border border-border/50 
                    text-muted-foreground 
                    hover:text-primary hover:border-primary 
                    transition duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
