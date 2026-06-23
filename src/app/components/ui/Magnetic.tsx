import { useRef, useState } from "react";
import { motion } from "motion/react";

interface MagneticProps {
  children: React.ReactElement;
  range?: number; // Distance from button where effect kicks in
  strength?: number; // Attraction intensity (stiffness factor)
}

export default function Magnetic({ children, range = 60, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Middle points of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Distance from pointer to center
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    // Calculate diagonal distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < range) {
      // Pull element closer to the mouse
      setPosition({ x: deltaX * strength, y: deltaY * strength });
    } else {
      // Outside range, return back
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
