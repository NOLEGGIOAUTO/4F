import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  target: number;
  duration?: number; // duration in ms
  delayOffset?: number; // stagger delay between digits (ms)
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 1800,
  delayOffset = 120,
  prefix = "",
  suffix = ""
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Format to clean digits
  const formattedString = target.toString();
  const chars = formattedString.split('');

  // 3 copies of 0-9 to allow scrolling past many digits, creating a real spinning reel visual
  const digitSequence = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  ];

  return (
    <span ref={elementRef} className="inline-flex items-baseline font-sans font-extrabold tracking-tight">
      {prefix && <span className="select-none select-all-none mr-0.5">{prefix}</span>}
      
      {chars.map((char, index) => {
        const isDigit = /\d/.test(char);
        if (!isDigit) {
          return (
            <span key={index} className="select-none">
              {char}
            </span>
          );
        }

        const digitVal = parseInt(char, 10);
        
        // Spin through 2 full cycles (20 digits) and land on the correct item in the 3rd cycle
        const finalIndex = 20 + digitVal;
        
        const translateYValue = isIntersecting ? `-${finalIndex * 100 / 30}%` : '0%';
        const transitionDelay = `${index * delayOffset}ms`;
        const transitionDuration = `${duration}ms`;

        return (
          <span 
            key={index} 
            className="relative inline-block overflow-hidden h-[1.12em] leading-none"
          >
            {/* Passive invisible placeholder keeping correct natural width & typography kerning */}
            <span className="invisible block h-[1.12em] select-none" style={{ lineHeight: '1.2' }}>
              {char}
            </span>
            
            {/* Active rolling list container */}
            <span
              className="absolute left-0 top-0 flex flex-col items-center w-full transition-transform"
              style={{
                transform: `translate3d(0, ${translateYValue}, 0)`,
                transitionDuration: transitionDuration,
                transitionDelay: transitionDelay,
                transitionTimingFunction: 'cubic-bezier(0.12, 0.88, 0.28, 1.01)', // decelerates with elegant momentum
                willChange: 'transform'
              }}
            >
              {digitSequence.map((num, idx) => (
                <span 
                  key={idx} 
                  className="h-[1.12em] flex items-center justify-center select-none"
                  style={{ height: '1.12em', lineHeight: '1.2' }}
                >
                  {num}
                </span>
              ))}
            </span>
          </span>
        );
      })}
      
      {suffix && <span className="select-none select-all-none ml-1">{suffix}</span>}
    </span>
  );
};
