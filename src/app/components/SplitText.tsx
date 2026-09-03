import React from "react";
type SplitTextProps = {
  text: string;
  className?: string;
};

const SplitText: React.FC<SplitTextProps> = ({ text, className }) => {
  return (
    <>
      {/* .split-mask lives in globals.css; an inline <style> here was emitted once per Button (14 copies on the homepage). */}
      <span
        className={`relative inline-flex items-baseline overflow-hidden split-mask leading-none ${className ?? ""}`}
        style={{ height: "1.2em" }}
      >
        {/* Top text */}
        <span className="flex items-baseline">
          {text?.split("").map((char, i) => (
            <span
              key={`top-${i}`}
              style={{
                transitionDelay: `${i * 15}ms`,
                willChange: "transform",
              }}
              className="inline-block translate-y-0 group-hover:-translate-y-[150%]
                transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>

        {/* Bottom text */}
        <span className="absolute left-0 top-0 flex items-baseline">
          {text?.split("").map((char, i) => (
            <span
              key={`bottom-${i}`}
              style={{
                transitionDelay: `${i * 15}ms`,
                willChange: "transform",
              }}
              className="inline-block translate-y-[150%] group-hover:translate-y-0
                transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </span>
    </>
  );
};

export default SplitText;
