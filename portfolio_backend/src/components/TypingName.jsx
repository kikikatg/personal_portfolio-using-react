import { useEffect, useState } from "react";

export const TypingName = ({ text = "Kiros Asefa", speed = 200 }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          setIndex(index + 1);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        // Deleting backward
        if (index > 0) {
          setDisplayText(text.slice(0, index - 1));
          setIndex(index - 1);
        } else {
          setIsDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, speed]);

  return (
    <span className="text-primary font-semibold inline">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};
