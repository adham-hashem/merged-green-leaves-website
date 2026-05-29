import { useEffect, useRef } from 'react';

export default function AnnouncementBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Clone content for seamless loop
    const clone = content.cloneNode(true);
    container.appendChild(clone);

    // Get content width
    const contentWidth = content.offsetWidth;

    let position = 0;
    const speed = 0.5; // Pixels per frame

    const animate = () => {
      position -= speed;

      // Reset position when first content is fully out of view
      if (Math.abs(position) >= contentWidth) {
        position = 0;
      }

      content.style.transform = `translateX(${position}px)`;
      (clone as HTMLElement).style.transform = `translateX(${position}px)`;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white overflow-hidden py-3 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10"></div>

      {/* Scrolling content container */}
      <div
        ref={containerRef}
        className="relative flex whitespace-nowrap"
        style={{ width: 'max-content' }}
      >
        <div
          ref={contentRef}
          className="flex items-center gap-8 px-4"
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="font-medium">We handle everything from small garden jobs like tree cutting and grass trimming to full landscaping projects</span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="font-medium">We handle everything from small garden jobs like tree cutting and grass trimming to full landscaping projects</span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="font-medium">We handle everything from small garden jobs like tree cutting and grass trimming to full landscaping projects</span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
          </span>
        </div>
      </div>

      {/* Fade edges for smooth appearance */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-green-700 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-green-700 to-transparent pointer-events-none"></div>
    </div>
  );
}
