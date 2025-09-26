
import React, { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface SmoothCollapseProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  duration?: number;
}

// SmoothCollapse component that handles dynamic height transitions
const SmoothCollapse: React.FC<SmoothCollapseProps> = ({ 
  isOpen, 
  children, 
  className = '', 
  duration = 500 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const prevHeightRef = useRef<number>(0);

  useEffect(() => {
    if (!contentRef.current) return;

    const updateHeight = (): void => {
      if (isOpen) {
        // Measure the actual content height
        const contentHeight = contentRef.current!.scrollHeight;
        
        // If we're transitioning from closed to open
        if (height === 0) {
          setIsAnimating(true);
          // First set to 0 explicitly for animation start point
          setHeight(0);
          // Force reflow
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setHeight(contentHeight);
              prevHeightRef.current = contentHeight;
            });
          });
        } else if (prevHeightRef.current !== contentHeight) {
          // Content changed while open - smooth transition to new height
          setIsAnimating(true);
          setHeight(contentHeight);
          prevHeightRef.current = contentHeight;
        }
      } else {
        // Closing - animate to 0
        if (height > 0) {
          setIsAnimating(true);
          setHeight(0);
        }
      }
    };

    updateHeight();

    // Create ResizeObserver to handle content changes
    const resizeObserver = new ResizeObserver(() => {
      if (isOpen && contentRef.current) {
        const newHeight = contentRef.current.scrollHeight;
        if (newHeight !== prevHeightRef.current) {
          setHeight(newHeight);
          prevHeightRef.current = newHeight;
        }
      }
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, [isOpen, children, height]);

  // Handle animation end
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{
        height: isOpen || isAnimating ? `${height}px` : '0px',
        transition: `height ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
         <div ref={contentRef} className='pb-[42px] font-normal text-[12px] md:text-[14px] leading-[140%] text-grey-400 font-roboto'>
           {children}
        </div>
    </div>
  );
};

export default SmoothCollapse;