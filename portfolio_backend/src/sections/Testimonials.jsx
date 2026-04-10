import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "Kiros built the Sheqlee platform with great attention to detail. His ability to combine frontend and backend technologies is impressive for a student developer.",
    author: "Project manager ",
    role: "Metnee Systems plc CEO.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    quote:
      "The Tigrigna fake news detection project shows strong understanding of NLP and machine learning. Kiros handled both the model and the interface effectively.",
    author: "AI Instructor",
    role: "Machine Learning Course",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    quote:
      "His crop disease detection system is practical and impactful. It demonstrates how technology can solve real-world agricultural problems.",
    author: "Project Reviewer",
    role: "Final Year Evaluation",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    quote:
      "Kiros is a fast learner with strong problem-solving skills. His projects clearly show growth in both web development and AI.",
    author: "Peer Developer",
    role: "Collaborator",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
];

export const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setActiveIdx(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-md font-semibold tracking-widest uppercase text-indigo-400">
            Testimonials
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6">
            What people say about{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              my work
            </span>
          </h2>

          <p className="text-muted-foreground text-lg">
            Feedback from mentors, reviewers, and collaborators based on my
            projects and technical skills.
          </p>
        </div>

        {/* CARD */}
        <div className="max-w-4xl mx-auto relative">
          <div
            className="relative p-8 md:p-12 rounded-3xl 
          bg-white/5 backdrop-blur-xl border border-white/10 
          hover:border-primary/40 transition duration-300
          hover:shadow-[0_0_40px_rgba(32,178,166,0.2)]"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-cyan-400/10 opacity-0 hover:opacity-100 transition duration-500" />

            {/* Quote icon */}
            <div className="absolute -top-5 left-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>

            <div className="relative z-10">
              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 pt-6 text-white">
                "{testimonials[activeIdx].quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[activeIdx].avatar}
                  alt={testimonials[activeIdx].author}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div>
                  <div className="font-semibold text-white">
                    {testimonials[activeIdx].author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[activeIdx].role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={previous}
              className="p-3 rounded-full bg-white/5 border border-white/10 
              hover:bg-primary/10 hover:text-primary transition"
            >
              <ChevronLeft />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIdx
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-white/5 border border-white/10 
              hover:bg-primary/10 hover:text-primary transition"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
