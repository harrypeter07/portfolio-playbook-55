import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Star, 
  Zap, 
  Heart, 
  Sparkles,
  Target,
  Rocket,
  Lightbulb
} from 'lucide-react';

interface MotionPathProps {
  children: React.ReactNode;
  path: 'curve' | 'zigzag' | 'spiral' | 'wave' | 'bounce' | 'custom';
  duration?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

// Path definitions using SVG paths
const pathDefinitions = {
  curve: "M 0,100 Q 200,0 400,100 T 800,100",
  zigzag: "M 0,100 L 100,50 L 200,100 L 300,50 L 400,100 L 500,50 L 600,100 L 700,50 L 800,100",
  spiral: "M 400,400 A 50,50 0 1,1 450,400 A 50,50 0 1,1 400,400 A 100,100 0 1,1 500,400 A 100,100 0 1,1 400,400 A 150,150 0 1,1 550,400 A 150,150 0 1,1 400,400",
  wave: "M 0,100 Q 100,50 200,100 T 400,100 T 600,100 T 800,100",
  bounce: "M 0,100 Q 200,0 400,100 Q 600,200 800,100",
  custom: "M 0,100 C 100,0 200,200 300,100 C 400,0 500,200 600,100 C 700,0 800,200 900,100"
};

export const MotionPath: React.FC<MotionPathProps> = ({
  children,
  path = 'curve',
  duration = 3,
  delay = 0,
  className = '',
  onComplete
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [path]);

  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, { 
    stiffness: 100, 
    damping: 30 
  });

  const x = useTransform(springProgress, [0, 1], [0, pathLength]);
  const y = useTransform(springProgress, [0, 1], [0, pathLength]);

  useEffect(() => {
    const timer = setTimeout(() => {
      progress.set(1);
      if (onComplete) {
        setTimeout(onComplete, duration * 1000);
      }
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [progress, delay, duration, onComplete]);

  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 200"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={pathDefinitions[path]}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeDasharray={`${pathLength} ${pathLength}`}
          strokeDashoffset={useTransform(springProgress, [0, 1], [pathLength, 0])}
          className="opacity-30"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
      
      <motion.div
        className="absolute"
        style={{
          x: useTransform(springProgress, [0, 1], [0, 800]),
          y: useTransform(springProgress, [0, 1], [100, 100])
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Interactive Storytelling Component
interface StoryStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  delay: number;
}

interface InteractiveStoryProps {
  steps: StoryStep[];
  onStepComplete?: (stepId: string) => void;
  className?: string;
}

export const InteractiveStory: React.FC<InteractiveStoryProps> = ({
  steps,
  onStepComplete,
  className = ''
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const handleStepClick = (stepId: string, index: number) => {
    if (index <= activeStep + 1) {
      setActiveStep(index);
      setCompletedSteps(prev => new Set([...prev, stepId]));
      if (onStepComplete) {
        onStepComplete(stepId);
      }
    }
  };

  return (
    <div className={`relative w-full h-96 ${className}`}>
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {steps.map((step, index) => {
          if (index === 0) return null;
          const prevStep = steps[index - 1];
          const isActive = index <= activeStep;
          
          return (
            <motion.line
              key={`line-${index}`}
              x1={prevStep.position.x}
              y1={prevStep.position.y}
              x2={step.position.x}
              y2={step.position.y}
              stroke={isActive ? "#8B5CF6" : "#E5E7EB"}
              strokeWidth="2"
              strokeDasharray={isActive ? "0" : "5,5"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, delay: step.delay }}
            />
          );
        })}
      </svg>

      {/* Story Steps */}
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = completedSteps.has(step.id);
        const isAccessible = index <= activeStep + 1;

        return (
          <motion.div
            key={step.id}
            className="absolute"
            style={{
              left: step.position.x - 60,
              top: step.position.y - 60
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: isActive ? [0, -5, 5, 0] : 0
            }}
            transition={{ 
              duration: 0.5, 
              delay: step.delay,
              rotate: { duration: 0.3, repeat: isActive ? Infinity : 0, repeatType: "reverse" }
            }}
          >
            <Card
              className={`
                w-32 h-32 cursor-pointer transition-all duration-300
                ${isCompleted ? 'bg-green-100 border-green-300' : 
                  isActive ? 'bg-purple-100 border-purple-300 shadow-lg' :
                  isAccessible ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' :
                  'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'}
                hover:scale-105
              `}
              onClick={() => isAccessible && handleStepClick(step.id, index)}
            >
              <div className="p-4 text-center">
                <div className={`
                  w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center
                  ${isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-purple-500 text-white' :
                    isAccessible ? 'bg-blue-500 text-white' :
                    'bg-gray-400 text-white'}
                `}>
                  {step.icon}
                </div>
                <h4 className="text-xs font-semibold text-center mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground text-center">
                  {step.description}
                </p>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

// Bouncing Elements Component
interface BouncingElementProps {
  children: React.ReactNode;
  bounceType?: 'gentle' | 'energetic' | 'playful' | 'dramatic';
  delay?: number;
  className?: string;
}

export const BouncingElement: React.FC<BouncingElementProps> = ({
  children,
  bounceType = 'gentle',
  delay = 0,
  className = ''
}) => {
  const bounceVariants = {
    gentle: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    energetic: {
      y: [0, -20, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    playful: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    dramatic: {
      y: [0, -30, 0],
      scale: [1, 1.1, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={bounceVariants}
      animate={bounceType}
      initial={{ y: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

// Flying Icon Component
interface FlyingIconProps {
  icon: React.ReactNode;
  path: 'curve' | 'zigzag' | 'spiral' | 'wave';
  duration?: number;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FlyingIcon: React.FC<FlyingIconProps> = ({
  icon,
  path = 'curve',
  duration = 3,
  delay = 0,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <MotionPath
      path={path}
      duration={duration}
      delay={delay}
      className={className}
    >
      <motion.div
        className={`
          ${sizeClasses[size]} 
          bg-gradient-primary rounded-full flex items-center justify-center text-white
          shadow-lg
        `}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {icon}
      </motion.div>
    </MotionPath>
  );
};

// Sticky Note with Motion
interface StickyNoteProps {
  children: React.ReactNode;
  color?: 'yellow' | 'pink' | 'blue' | 'green' | 'purple';
  position?: { x: number; y: number };
  onDrag?: (position: { x: number; y: number }) => void;
  className?: string;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  children,
  color = 'yellow',
  position = { x: 0, y: 0 },
  onDrag,
  className = ''
}) => {
  const colorClasses = {
    yellow: 'bg-yellow-200 border-yellow-300',
    pink: 'bg-pink-200 border-pink-300',
    blue: 'bg-blue-200 border-blue-300',
    green: 'bg-green-200 border-green-300',
    purple: 'bg-purple-200 border-purple-300'
  };

  return (
    <motion.div
      className={`
        absolute w-48 h-32 p-3 rounded-lg border-2 shadow-lg cursor-move
        ${colorClasses[color]}
        ${className}
      `}
      style={{ left: position.x, top: position.y }}
      drag
      dragMomentum={false}
      onDragEnd={(event, info) => {
        if (onDrag) {
          onDrag({
            x: position.x + info.offset.x,
            y: position.y + info.offset.y
          });
        }
      }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="text-sm font-medium text-gray-800">
        {children}
      </div>
    </motion.div>
  );
};
