import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { useState } from "react";
const projects = [
  {
    title: "Tigrigna Fake News Detection System",
    description:
      "An AI-powered NLP system designed to detect fake news in the Tigrigna language using machine learning, text preprocessing, and real-time classification techniques.",

    image: "/projects/fake_news_detection_UI.png",

    tags: [
      "Python",
      "FastAPI",
      "NLP",
      "Scikit-learn",
      "Machine Learning",
      "Streamlit",
    ],

    link: "https://tigrigna-fake-news-detection-using.vercel.app/",

    github:
      "https://github.com/kikikatg/tigrigna_fake_news_detection_using_NLP",
  },

  {
    title: "Sheqlee Opportunity Platform",

    description:
      "A full-stack platform that connects users with jobs, opportunities, and resources through a modern and responsive web application.",

    image: "/projects/sheqlee_1.png",

    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "REST API",
      "Tailwind CSS",
    ],

    link: "YOUR_DEPLOYMENT_LINK",

    github: "https://github.com/kikikatg/sheqlee-project.git",
  },

  {
    title: "Crop Disease Detection System",

    description:
      "A deep learning application that detects crop diseases using CNN models to support smart agriculture and early disease diagnosis.",

    image: "/projects/mini-project.png",

    tags: [
      "Python",
      "TensorFlow",
      "CNN",
      "Keras",
      "Computer Vision",
      "Deep Learning",
    ],

    link: "YOUR_DEPLOYMENT_LINK",

    github:
      "https://github.com/kikikatg/Mini_project/tree/main/Corn-Disease-Detection-using-CNN-main",
  },
];

export const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 4);
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-md font-semibold tracking-widest uppercase text-indigo-400">
            My Projects
          </span>
<h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6">
  Building{" "}
  <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
    intelligent systems
  </span>{" "}
  & scalable applications
</h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            A selection of projects focused on{" "}
            <span className="text-white font-medium">artificial intelligence,full-stack development</span> and{" "}
            <span className="text-white font-medium">scalable digital solutions built</span> to solve real-world challenges.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2  gap-8 ">
          {displayedProjects.map((project, idx) => (
            <div
              key={idx}
              className="group glass rounded-2xl overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20"
            >
              {/* IMAGE */}
              <div className="relative transition-all duration-500 overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80" />

                {/* ICONS */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition">
                  {/* Live Link */}
                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full glass hover:bg-primary hover:text-white transition"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  )}

                  {/* GitHub */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:bg-primary hover:text-white transition"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold group-hover:text-primary transition">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs bg-surface border border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <AnimatedBorderButton onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "Show Less" : "View More Projects"}
            <ArrowUpRight className="w-5 h-5" />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
};
