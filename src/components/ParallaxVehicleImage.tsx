import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxVehicleImageProps {
  src: string;
  alt: string;
  fallback: string;
  children?: React.ReactNode;
}

export function ParallaxVehicleImage({ src, alt, fallback, children }: ParallaxVehicleImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Listen to the vertical scroll progress of this container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map the scroll progress (0 when entering bottom of screen, 1 when exiting top) 
  // to a subtle vertical visual offset (Y translation)
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <div 
      ref={containerRef} 
      className="relative h-48 w-full bg-white rounded-xl mb-6 overflow-hidden flex items-center justify-center border border-gray-100"
    >
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y }}
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="w-full h-full object-contain p-2" 
        onError={(e) => {
          e.currentTarget.src = fallback;
        }}
      />
      {children}
    </div>
  );
}
