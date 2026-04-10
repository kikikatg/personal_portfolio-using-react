import { Briefcase } from "lucide-react";

const experiences = [
  {
    period: "2026 —for three months",
    role: "Full Stack Developer (Project-Based)",
    company: "Sheqlee Platform",
    description:
      "Developed a smart job and opportunity platform using React and Node.js. Designed responsive UI, implemented backend logic, and handled real-world application architecture.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind"],
    current: true,
  },
  {
    period: "2026-for three months",
    role: "Machine Learning Developer",
    company: "Tigrigna Fake News Detection",
    description:
      "Built an NLP-based system to detect fake news in Tigrigna language using machine learning techniques. Developed preprocessing pipeline and classification model.",
    technologies: ["Python", "NLP", "Scikit-learn", "Streamlit"],
    current: false,
  },
  {
    period: "2024 — 2025",
    role: "AI Developer",
    company: "Crop Disease Detection Project",
    description:
      "Developed a CNN-based model to detect crop diseases. Integrated the model with a user interface for real-time predictions to support agriculture.",
    technologies: ["Python", "CNN", "TensorFlow", "Streamlit"],
    current: false,
  },
  {
    period: "2024 — 2025",
    role: "Frontend Developer",
    company: "Academic & Personal Projects",
    description:
      "Built multiple responsive web applications while learning modern frontend technologies and UI/UX design principles.",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    current: false,
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 blur-3xl -translate-y-1/2 rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="max-w-3xl mb-16">
          <span className="text-md font-semibold tracking-widest uppercase text-indigo-400">
            Experience
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6">
            My journey of{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              building real-world solutions
            </span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            From web development to machine learning, I have worked on projects
            that solve real-world problems and improve user experiences.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative">
          {/* LINE */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative grid md:grid-cols-2 gap-8">
                {/* DOT */}
                <div className="absolute left-0 md:left-1/2 top-2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-70" />
                  )}
                </div>

                {/* CONTENT */}
                <div
                  className={`pl-8 md:pl-0 ${
                    idx % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16"
                  }`}
                >
                  <div
                    className="relative p-6 rounded-2xl 
                    bg-white/5 backdrop-blur-xl 
                    border border-white/10 
                    hover:border-primary/40 
                    transition duration-300 
                    hover:-translate-y-2 
                    hover:shadow-[0_0_30px_rgba(32,178,166,0.2)]"
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-cyan-400/10 opacity-0 hover:opacity-100 transition duration-500" />

                    <div className="relative z-10">
                      <span className="text-sm text-primary font-medium">
                        {exp.period}
                      </span>

                      <h3 className="text-xl font-semibold mt-2 text-white">
                        {exp.role}
                      </h3>

                      <p className="text-muted-foreground text-cyan-500">
                        {exp.company}
                      </p>

                      <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div
                        className={`flex flex-wrap gap-2 mt-4 ${
                          idx % 2 === 0 ? "md:justify-end" : ""
                        }`}
                      >
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full 
                            bg-surface border border-border/50 
                            text-muted-foreground 
                            hover:text-primary hover:border-primary transition"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
