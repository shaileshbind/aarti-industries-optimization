type SplitTextProps = {
  text: string;
  className?: string;
};

const SplitText: React.FC<SplitTextProps> = ({ text, className }) => {
  return (
    <>
      <style>{`
        .split-mask {
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
        }
      `}</style>

      <span
        className={`relative inline-block overflow-hidden split-mask ${className ?? ""}`}
      >
        {/* Top text */}
        <span className="flex">
          {text?.split("").map((char, i) => (
            <span
              key={`top-${i}`}
              style={{ 
                transitionDelay: `${i * 15}ms`,
                willChange: 'transform'
              }}
              className="inline-block translate-y-0 group-hover:-translate-y-full
                transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>

        {/* Bottom text */}
        <span className="absolute left-0 top-0 flex">
          {text?.split("").map((char, i) => (
            <span
              key={`bottom-${i}`}
              style={{ 
                transitionDelay: `${i * 15}ms`,
                willChange: 'transform'
              }}
              className="inline-block translate-y-full group-hover:translate-y-0
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