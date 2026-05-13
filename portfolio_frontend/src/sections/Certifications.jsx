import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";

const certifications = [
  {
    title: "Machine Learning & AI",
    provider: "Udacity / Online Learning",
    category: "Artificial Intelligence",
    image: "/certificates/ml-ai.png",
  },

  {
    title: "Frontend Web Development",
    provider: "Safari Talent cloud",
    category: "Frontend Development",
    image: "/certificates/react.png",
  },

  {
    title: "STEM training",
    provider: "Mekelle university",
    category: "Technology",
    image: "/certificates/STEM.png",
  },

  {
    title: "Cyber Security Awareness",
    provider:"hp Foundation / Online Learning",
    category: "Networking",
    image: "/certificates/cyber-security.png",
  },
];

export const Certifications = () => {
  return (
    <section
      id="certifications"
      className="py-32 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-indigo-400">
            Certifications
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-tight">
            Continuous learning through{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              certifications & technical training
            </span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            A collection of certifications and technical courses focused on
            software engineering, artificial intelligence, machine learning,
            and modern web development.
          </p>
        </div>

        {/* CERTIFICATE GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl
              bg-white/5 backdrop-blur-xl border border-white/10
              hover:border-primary/40 transition duration-300
              hover:-translate-y-2
              hover:shadow-[0_0_25px_rgba(32,178,166,0.15)]"
            >
              {/* IMAGE */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <span className="text-sm text-primary font-medium">
                  {cert.category}
                </span>

                <h3 className="text-xl font-semibold text-white mt-2 mb-2">
                  {cert.title}
                </h3>

                <p className="text-zinc-400">
                  {cert.provider}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-14">
          <a
            href="/All-Certificates_merged.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimatedBorderButton>
              View All Certificates
            </AnimatedBorderButton>
          </a>
        </div>
      </div>
    </section>
  );
};