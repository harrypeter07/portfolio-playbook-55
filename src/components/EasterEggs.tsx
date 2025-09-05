import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Star, 
  Sparkles, 
  Zap, 
  Rainbow, 
  Music, 
  Gamepad2,
  Coffee,
  Rocket,
  Crown,
  Trophy,
  Gift,
  PartyPopper,
  Smile,
  Laugh,
  ThumbsUp,
  Fire,
  Sun,
  Moon,
  Flower2,
  Butterfly,
  Fish,
  TreePine,
  Mountain,
  Waves
} from 'lucide-react';

interface EasterEggProps {
  children: React.ReactNode;
  trigger: 'click' | 'hover' | 'double-click' | 'keyboard' | 'scroll' | 'time';
  effect: 'confetti' | 'sparkles' | 'hearts' | 'stars' | 'rainbow' | 'dance' | 'bounce' | 'glow';
  delay?: number;
  keyCombo?: string;
  className?: string;
}

const EFFECTS = {
  confetti: {
    component: PartyPopper,
    color: '#FF6B6B',
    animation: 'confetti-burst'
  },
  sparkles: {
    component: Sparkles,
    color: '#FFD93D',
    animation: 'sparkle-shower'
  },
  hearts: {
    component: Heart,
    color: '#FF6B9D',
    animation: 'heart-rain'
  },
  stars: {
    component: Star,
    color: '#4ECDC4',
    animation: 'star-fall'
  },
  rainbow: {
    component: Rainbow,
    color: '#A8E6CF',
    animation: 'rainbow-wave'
  },
  dance: {
    component: Music,
    color: '#FF8B94',
    animation: 'dance-party'
  },
  bounce: {
    component: Zap,
    color: '#FFD93D',
    animation: 'bounce-frenzy'
  },
  glow: {
    component: Zap,
    color: '#74B9FF',
    animation: 'glow-pulse'
  }
};

const EMOJI_PARTICLES = ['🎉', '✨', '🎊', '🎈', '🎁', '🎀', '💫', '⭐', '🌟', '💖', '💝', '🎵', '🎶', '🎤', '🎧', '🎮', '🎯', '🏆', '🥇', '👑', '💎', '🔥', '⚡', '🌈', '🌸', '🦋', '🐠', '🌲', '🏔️', '🌊'];

export const EasterEgg: React.FC<EasterEggProps> = ({
  children,
  trigger,
  effect,
  delay = 0,
  keyCombo,
  className = ''
}) => {
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string; delay: number }>>([]);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const effectConfig = EFFECTS[effect];

  const createParticles = useCallback(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      emoji: EMOJI_PARTICLES[Math.floor(Math.random() * EMOJI_PARTICLES.length)],
      delay: Math.random() * 0.5
    }));
    setParticles(newParticles);
  }, []);

  const triggerEffect = useCallback(() => {
    setIsActive(true);
    createParticles();
    
    setTimeout(() => {
      setIsActive(false);
      setParticles([]);
    }, 3000);
  }, [createParticles]);

  const handleClick = () => {
    if (trigger === 'click') {
      triggerEffect();
    } else if (trigger === 'double-click') {
      const now = Date.now();
      if (now - lastClickTime < 300) {
        setClickCount(prev => prev + 1);
        if (clickCount >= 1) {
          triggerEffect();
          setClickCount(0);
        }
      } else {
        setClickCount(1);
      }
      setLastClickTime(now);
    }
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (trigger === 'keyboard' && keyCombo) {
      const keys = keyCombo.toLowerCase().split('+');
      const pressedKeys = [];
      
      if (e.ctrlKey) pressedKeys.push('ctrl');
      if (e.altKey) pressedKeys.push('alt');
      if (e.shiftKey) pressedKeys.push('shift');
      pressedKeys.push(e.key.toLowerCase());
      
      if (keys.every(key => pressedKeys.includes(key))) {
        triggerEffect();
      }
    }
  }, [trigger, keyCombo, triggerEffect]);

  const handleScroll = useCallback(() => {
    if (trigger === 'scroll') {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage > 80 && Math.random() < 0.1) {
        triggerEffect();
      }
    }
  }, [trigger, triggerEffect]);

  useEffect(() => {
    if (trigger === 'time' && delay > 0) {
      const timer = setTimeout(triggerEffect, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay, triggerEffect]);

  useEffect(() => {
    if (trigger === 'keyboard') {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [trigger, handleKeyPress]);

  useEffect(() => {
    if (trigger === 'scroll') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [trigger, handleScroll]);

  const eventHandlers = {
    click: { onClick: handleClick },
    hover: { onMouseEnter: triggerEffect },
    'double-click': { onDoubleClick: handleClick }
  };

  return (
    <div className={`relative ${className}`} {...eventHandlers[trigger as keyof typeof eventHandlers]}>
      {children}
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Particle Effects */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute text-2xl"
                style={{ left: particle.x, top: particle.y }}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  rotate: 0
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 360],
                  y: [0, -100]
                }}
                transition={{ 
                  duration: 2,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
              >
                {particle.emoji}
              </motion.div>
            ))}
            
            {/* Central Effect */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1.5, 0],
                rotate: [0, 360]
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <effectConfig.component 
                className="w-16 h-16" 
                style={{ color: effectConfig.color }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Special Easter Egg Components
export const KonamiCode: React.FC<{ children: React.ReactNode; onActivate: () => void }> = ({
  children,
  onActivate
}) => {
  const [sequence, setSequence] = useState<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setSequence(prev => {
        const newSequence = [...prev, e.code];
        if (newSequence.length > konamiCode.length) {
          newSequence.shift();
        }
        
        if (newSequence.join(',') === konamiCode.join(',')) {
          onActivate();
          return [];
        }
        
        return newSequence;
      });
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onActivate]);

  return <>{children}</>;
};

export const SecretMessage: React.FC<{ message: string; trigger: string }> = ({
  message,
  trigger
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === trigger) {
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 3000);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [trigger]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <div className="bg-gradient-primary text-white p-4 rounded-lg shadow-lg max-w-sm">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold">Secret Message!</span>
            </div>
            <p className="text-sm">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const HiddenTreasure: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFound, setIsFound] = useState(false);
  const [treasureCount, setTreasureCount] = useState(0);

  const handleFind = () => {
    setTreasureCount(prev => prev + 1);
    setIsFound(true);
    
    setTimeout(() => {
      setIsFound(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <EasterEgg
        trigger="click"
        effect="sparkles"
        onClick={handleFind}
      >
        {children}
      </EasterEgg>
      
      <AnimatePresence>
        {isFound && (
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
              💎 Treasure #{treasureCount} Found!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const MagicButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void;
  effect?: keyof typeof EFFECTS;
}> = ({ children, onClick, effect = 'sparkles' }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <EasterEgg trigger="click" effect={effect}>
      <motion.button
        className="relative overflow-hidden"
        onClick={onClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
        
        {isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.button>
    </EasterEgg>
  );
};

export const FloatingEmoji: React.FC<{ emoji: string; delay?: number }> = ({
  emoji,
  delay = 0
}) => {
  return (
    <motion.div
      className="fixed text-2xl pointer-events-none z-40"
      initial={{ 
        opacity: 0, 
        y: 0, 
        x: Math.random() * window.innerWidth 
      }}
      animate={{ 
        opacity: [0, 1, 0],
        y: -200,
        x: Math.random() * window.innerWidth
      }}
      transition={{ 
        duration: 3,
        delay,
        ease: "easeOut"
      }}
      style={{
        left: Math.random() * window.innerWidth,
        top: window.innerHeight
      }}
    >
      {emoji}
    </motion.div>
  );
};

export const EasterEggManager: React.FC = () => {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <>
      <KonamiCode onActivate={() => setShowSecret(true)}>
        <div />
      </KonamiCode>
      
      <SecretMessage 
        message="🎉 Congratulations! You found the secret! You're a true CanvaFolio master! 🎉"
        trigger="s"
      />
      
      {showSecret && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-center text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Crown className="w-24 h-24 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">🎊 SECRET UNLOCKED! 🎊</h1>
            <p className="text-xl mb-4">You've discovered the hidden CanvaFolio easter egg!</p>
            <p className="text-lg mb-6">You're now a certified CanvaFolio wizard! ✨</p>
            <button
              onClick={() => setShowSecret(false)}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Continue Your Journey
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
