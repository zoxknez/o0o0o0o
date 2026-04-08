'use client';

import { useEffect, useRef } from 'react';

export default function ReadingProgress({ color = '#00d4ff' }: { color?: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(currentScroll / scrollHeight, 1) : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const queueUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateProgress);
      }
    };

    queueUpdate();

    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate);

    return () => {
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div
        ref={barRef}
        className="reading-progress-bar"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </div>
  );
}
