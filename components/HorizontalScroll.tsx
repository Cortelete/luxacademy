import React, { useRef, useEffect, forwardRef, ReactNode } from 'react';

interface HorizontalScrollProps {
  children: ReactNode;
}

const HorizontalScroll = forwardRef<HTMLDivElement, HorizontalScrollProps>(({ children }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Set height based on content width to define the scrollable area
    const onResize = () => {
      const scrollableWidth = content.scrollWidth - window.innerWidth;
      container.style.height = `${scrollableWidth}px`;
    };
    
    onResize();
    window.addEventListener('resize', onResize);

    const onScroll = () => {
      if (container.getBoundingClientRect().top <= 0 && container.getBoundingClientRect().bottom >= 0) {
        const distance = container.getBoundingClientRect().top;
        content.style.transform = `translateX(${distance}px)`;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={ref}>
        <div ref={containerRef} className="relative w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <div ref={contentRef} className="absolute top-0 left-0 h-full flex flex-nowrap items-center">
                    {children}
                </div>
            </div>
        </div>
    </div>
  );
});

export default HorizontalScroll;
