import React from "react";

interface MapBlipProps {
  x: string;
  y: string;
  title?: string;
  subtitle?: string;
  isActive?: boolean;
  onMouseEnter?: () => void;
}

const MapBlip: React.FC<MapBlipProps> = ({
  x,
  y,
  title,
  subtitle,
  isActive,
  onMouseEnter,
}) => {
  const numX = parseFloat(x);
  const numY = parseFloat(y);

  const tooltipPath = `
    M ${numX + 10} ${numY} 
    h ${123 - 20} 
    a 10,10 0 0 1 10,10 
    v ${73 - 20} 
    a 10,10 0 0 1 -10,10 
    h -43.5 
    l -8,8 
    l -8,-8 
    h -43.5 
    a 10,10 0 0 1 -10,-10 
    v -53 
    a 10,10 0 0 1 10,-10 
    z
  `;

  return (
    <g className="cursor-pointer" onMouseEnter={onMouseEnter}>
      <defs>
        <linearGradient
          id="gradient-orange-1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>

      {/* Combined Background and Arrow Pointer */}
      <path
        d={tooltipPath}
        fill={isActive ? "url(#gradient-orange-1)" : "white"}
        stroke={isActive ? "transparent" : "#e5e7eb"}
        strokeWidth={1}
        style={{ transition: "stroke 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
      />
      {/* Title */}
      <text
        x={numX + 61.5}
        y={numY + 38}
        textAnchor="middle"
        fill={isActive ? "white" : "#f36633"}
        className="font-alte-hans font-normal leading-[140%] text-[28px]"
      >
        {title}
      </text>
      {/* Subtitle */}
      <text
        x={numX + 61.5}
        y={numY + 55}
        textAnchor="middle"
        fill={isActive ? "white" : "#99a1af"}
        className="font-roboto font-normal text-[12px]"
      >
        {subtitle}
      </text>
    </g>
  );
};

export default MapBlip;