"use client";
import { ReactNode, useEffect } from "react";
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

  // Hide on unmount so a slide/card disappearing from under the pointer cannot
  // leave the label stuck on screen. cursor.hide is a stable identity, so this
  // is not a stale closure.
  useEffect(() => cursor.hide, [cursor]);

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      // onMouseMove is intentional: after an onClick calls cursor.hide() (see
      // MeetMinds), onMouseEnter will not fire again until the pointer leaves
      // and re-enters, so the label would stay hidden. setGlobalCursor is
      // idempotent now, so repeat calls with the same title do no work.
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default CustomCursorTrigger;
