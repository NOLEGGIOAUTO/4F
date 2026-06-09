import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxVehicleImageProps {
  src: string;
  alt: string;
  fallback: string;
  children?: React.ReactNode;
}

export function ParallaxVehicleImage({ src, alt, fallback, children }: ParallaxVehicleImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create an array of candidate sources to try in order
  const getCandidates = (originalSrc: string): string[] => {
    const list: string[] = [originalSrc];
    
    // Extract filename and determine alternatives
    const filenameWithExt = originalSrc.split('/').pop() || '';
    const lastDotIndex = filenameWithExt.lastIndexOf('.');
    if (lastDotIndex === -1) return list;
    
    const name = filenameWithExt.substring(0, lastDotIndex);
    const ext = filenameWithExt.substring(lastDotIndex + 1).toLowerCase();
    
    // 1. Try root version (without /images/)
    list.push(`/${filenameWithExt}`);
    
    // 2. Try alternate extensions in /images/ and root
    const altExts = ext === 'webp' ? ['png', 'jpg', 'jpeg'] : ['webp', ext === 'png' ? 'jpg' : 'png'];
    
    altExts.forEach(altExt => {
      list.push(`/images/${name}.${altExt}`);
      list.push(`/${name}.${altExt}`);
    });
    
    // 3. Try space vs dash replacement (e.g. "fiat panda" vs "fiat-panda")
    const changedName = name.includes('-') ? name.replace(/-/g, ' ') : name.replace(/ /g, '-');
    list.push(`/images/${changedName}.${ext}`);
    list.push(`/${changedName}.${ext}`);
    
    altExts.forEach(altExt => {
      list.push(`/images/${changedName}.${altExt}`);
      list.push(`/${changedName}.${altExt}`);
    });

    // 4. Try casing varieties (lowercase name)
    const lowerName = name.toLowerCase();
    const lowerChangedName = changedName.toLowerCase();
    if (lowerName !== name) {
      list.push(`/images/${lowerName}.${ext}`);
      list.push(`/${lowerName}.${ext}`);
      altExts.forEach(altExt => {
        list.push(`/images/${lowerName}.${altExt}`);
        list.push(`/${lowerName}.${altExt}`);
      });
    }
    if (lowerChangedName !== changedName) {
      list.push(`/images/${lowerChangedName}.${ext}`);
      list.push(`/${lowerChangedName}.${ext}`);
      altExts.forEach(altExt => {
        list.push(`/images/${lowerChangedName}.${altExt}`);
        list.push(`/${lowerChangedName}.${altExt}`);
      });
    }
    
    // Append remote unsplash fallback at the very end
    list.push(fallback);
    
    // Remove duplicates while preserving order
    return Array.from(new Set(list));
  };

  const [candidates] = useState<string[]>(() => getCandidates(src));
  const [candidateIndex, setCandidateIndex] = useState(0);

  // If candidateIndex is out of range, default or keep at last (Unsplash fallback)
  const currentSrc = candidates[candidateIndex] || fallback;

  const handleError = () => {
    if (candidateIndex < candidates.length - 1) {
      // Try next candidate
      setCandidateIndex(prev => prev + 1);
    }
  };

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
        src={currentSrc} 
        alt={alt} 
        style={{ y }}
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="w-full h-full object-contain p-2" 
        onError={handleError}
      />
      {children}
    </div>
  );
}
