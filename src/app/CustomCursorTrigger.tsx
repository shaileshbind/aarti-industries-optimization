"use client";
import { ReactNode } from "react";
import { useCustomCursor } from "./GlobalCursor";

interface CustomCursorTriggerProps {
  children: ReactNode;
  title?: string;
  customCursor?: boolean;
  className?: string;
  color?: string;
}

const CustomCursorTrigger: React.FC<CustomCursorTriggerProps> = ({
  children,
  title,
  customCursor = true,
  className = "",
  color,
}) => {
  const cursor = useCustomCursor();

  const handleMouseEnter = () => {
    if (customCursor) cursor.show(title, color);
  };

  const handleMouseLeave = () => {
    if (customCursor) cursor.hide();
  };

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default CustomCursorTrigger;