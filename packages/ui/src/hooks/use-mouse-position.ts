import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number;
    let latestEvent: MouseEvent | null = null;

    const processEvent = () => {
      if (latestEvent) {
        setPosition({ x: latestEvent.clientX, y: latestEvent.clientY });
        latestEvent = null;
      }
      rafId = requestAnimationFrame(processEvent);
    };

    const handleMouseMove = (event: MouseEvent) => {
      latestEvent = event;
    };

    rafId = requestAnimationFrame(processEvent);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
}
