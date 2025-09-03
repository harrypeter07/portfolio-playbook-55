import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface MagicAnimateProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'bounce' | 'scale' | 'flip' | 'magic';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  trigger?: 'mount' | 'hover' | 'click' | 'scroll';
  className?: string;
}

const animationVariants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slide: {
    hidden: (direction: string) => ({
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0
    },
    exit: (direction: string) => ({
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0
    })
  },
  bounce: {
    hidden: { 
      opacity: 0, 
      scale: 0.3,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.3,
      y: 50
    }
  },
  scale: {
    hidden: { 
      opacity: 0, 
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8
    }
  },
  flip: {
    hidden: { 
      opacity: 0, 
      rotateY: -90,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      rotateY: 90,
      scale: 0.8
    }
  },
  magic: {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      rotate: -180,
      y: 100
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.5,
      rotate: 180,
      y: -100
    }
  }
};

export const MagicAnimate: React.FC<MagicAnimateProps> = ({
  children,
  type = 'fade',
  direction = 'up',
  delay = 0,
  duration = 0.5,
  trigger = 'mount',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(trigger === 'mount');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger === 'scroll') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }
  }, [trigger]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsClicked(!isClicked);
    }
  };

  const shouldAnimate = trigger === 'mount' ? isVisible : 
                       trigger === 'hover' ? isHovered :
                       trigger === 'click' ? isClicked : isVisible;

  const variants = animationVariants[type];
  const custom = type === 'slide' ? direction : undefined;

  return (
    <motion.div
      ref={elementRef}
      className={className}
      variants={variants}
      custom={custom}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      exit="exit"
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

// Staggered animation for lists
interface MagicStaggerProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export const MagicStagger: React.FC<MagicStaggerProps> = ({
  children,
  staggerDelay = 0.1,
  className = ''
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Magic transition wrapper
interface MagicTransitionProps {
  children: React.ReactNode;
  show: boolean;
  type?: 'fade' | 'slide' | 'bounce' | 'scale';
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const MagicTransition: React.FC<MagicTransitionProps> = ({
  children,
  show,
  type = 'fade',
  direction = 'up',
  className = ''
}) => {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="content"
          className={className}
          variants={animationVariants[type]}
          custom={type === 'slide' ? direction : undefined}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Magic floating animation
interface MagicFloatProps {
  children: React.ReactNode;
  intensity?: number;
  duration?: number;
  className?: string;
}

export const MagicFloat: React.FC<MagicFloatProps> = ({
  children,
  intensity = 10,
  duration = 3,
  className = ''
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-intensity, intensity, -intensity],
        rotate: [-1, 1, -1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Magic pulse animation
interface MagicPulseProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export const MagicPulse: React.FC<MagicPulseProps> = ({
  children,
  scale = 1.05,
  duration = 2,
  className = ''
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};
