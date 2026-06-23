import { useState, useEffect, useCallback, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const throttleRef = useRef<number | null>(null);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (throttleRef.current !== null) return;
    throttleRef.current = requestAnimationFrame(() => {
      setPosition({ x: clientX, y: clientY });
      throttleRef.current = null;
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (event: MouseEvent) => {
      updatePosition(event.clientX, event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleRef.current !== null) {
        cancelAnimationFrame(throttleRef.current);
      }
    };
  }, [updatePosition]);

  return position;
}
