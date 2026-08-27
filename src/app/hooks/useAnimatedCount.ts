import { useState, useEffect, useRef } from "react";

function useAnimatedCount(value: number, duration: number = 1000): number {
  const [count, setCount] = useState<number>(0);
  const previousValue = useRef<number>(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime: number = performance.now();
    const start: number = previousValue.current;
    const end: number = value;

    function animate(now: number): void {
      const elapsed: number = now - startTime;
      const progress: number = Math.min(elapsed / duration, 1);
      const current: number = start + (end - start) * progress;
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
        previousValue.current = end;
      }
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return count;
}

export default useAnimatedCount;
