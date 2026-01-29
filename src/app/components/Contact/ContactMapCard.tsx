import { useState, useLayoutEffect, useRef } from "react";

interface CardItem {
  tag?: string;
  title?: string;
  description?: string;
  subTitle?: string;
}

interface ContactMapCardProps {
  cardData: CardItem[];
  x?: number | string;
  y?: number | string;
  width?: number;
}

const ContactMapCard = ({
  cardData,
  x = 0,
  y = 0,
  width = 300,
}: ContactMapCardProps) => {
  const numX = typeof x === "string" ? parseFloat(x) : x;
  const numY = typeof y === "string" ? parseFloat(y) : y;

  const contentRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const padding = 20;
  const sectionGap = 24;

  // Measures exact height of content + padding
  useLayoutEffect(() => {
    if (contentRef.current) {
      setMeasuredHeight(contentRef.current.offsetHeight);
    }
  }, [cardData, width]);

  return (
    <g transform={`translate(${numX}, ${numY})`}>
      <defs>
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(250, 129, 41, 1)" />
          <stop offset="100%" stopColor="rgba(220, 76, 3, 1)" />
        </linearGradient>
      </defs>

      <rect
        width={width}
        height={measuredHeight}
        rx={20}
        ry={20}
        fill="url(#cardGradient)"
      />

      <image
        href="/images/home/flower-t.svg"
        x={width - 90}
        y={-40}
        width={130}
        height={130}
        preserveAspectRatio="xMidYMid meet"
      />

      <foreignObject
        x={0}
        y={0}
        width={width}
        height={measuredHeight}
        style={{ overflow: "visible" }}
      >
        <div
          ref={contentRef}
          style={{
            padding: `${padding}px`,
            boxSizing: "border-box",
          }}
        >
          {cardData?.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom:
                  index < cardData.length - 1 ? `${sectionGap}px` : "0",
              }}
            >
              {item?.tag && (
                <div
                  style={{
                    color: "#DC4C03",
                    fontSize: "12px",
                    fontWeight: "400",
                    fontFamily: "var(--font-alte-hans), sans-serif",
                    marginBottom: "10px",
                    backgroundColor: "white",
                    border: "1px",
                    borderColor: "#DC4C03",
                    borderRadius: "20px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    width: "fit-content",
                    textTransform: "uppercase",
                  }}
                >
                  {item?.tag}
                </div>
              )}
              {item?.title && (
                <div
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "400",
                    fontFamily: "var(--font-alte-hans), sans-serif",
                    marginBottom: "6px",
                  }}
                >
                  {item?.title}
                </div>
              )}
              {item?.subTitle && (
                <div
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "Roboto",
                    marginBottom: "6px",
                  }}
                >
                  {item?.subTitle}
                </div>
              )}
              {item?.description && (
                <div
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "Roboto",
                  }}
                >
                  {item?.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </foreignObject>
    </g>
  );
};

export default ContactMapCard;
