import React, { useState, useEffect, createContext, useContext } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Palette, 
  Sparkles, 
  Sun, 
  Moon, 
  Zap, 
  Heart,
  Star,
  Rainbow,
  Droplets,
  Flower2,
  Music,
  Gamepad2
} from 'lucide-react';

type ThemeMode = 'classic' | 'playful';
type ColorScheme = 'light' | 'dark';

interface ThemeConfig {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  primaryColor: string;
  accentColor: string;
  backgroundPattern: string;
  animations: boolean;
  soundEffects: boolean;
  doodles: boolean;
}

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  toggleMode: () => void;
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const THEME_PRESETS = {
  classic: {
    primaryColor: '#8B5CF6',
    accentColor: '#F59E0B',
    backgroundPattern: 'none',
    animations: true,
    soundEffects: false,
    doodles: false
  },
  playful: {
    primaryColor: '#EC4899',
    accentColor: '#10B981',
    backgroundPattern: 'doodles',
    animations: true,
    soundEffects: true,
    doodles: true
  }
};

const COLOR_PALETTES = {
  light: {
    background: 'hsl(250 100% 98%)',
    foreground: 'hsl(230 15% 15%)',
    card: 'hsl(0 0% 100%)',
    muted: 'hsl(250 30% 94%)',
    border: 'hsl(250 30% 88%)'
  },
  dark: {
    background: 'hsl(230 20% 8%)',
    foreground: 'hsl(250 100% 95%)',
    card: 'hsl(230 20% 12%)',
    muted: 'hsl(230 20% 15%)',
    border: 'hsl(230 20% 20%)'
  }
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeConfig>({
    mode: 'classic',
    colorScheme: 'light',
    ...THEME_PRESETS.classic
  });

  const setTheme = (updates: Partial<ThemeConfig>) => {
    setThemeState(prev => {
      const newTheme = { ...prev, ...updates };
      
      // Apply theme to CSS variables
      applyThemeToCSS(newTheme);
      
      // Save to localStorage
      localStorage.setItem('canvafolio-theme', JSON.stringify(newTheme));
      
      return newTheme;
    });
  };

  const toggleMode = () => {
    const newMode = theme.mode === 'classic' ? 'playful' : 'classic';
    setTheme({ 
      mode: newMode, 
      ...THEME_PRESETS[newMode] 
    });
  };

  const toggleColorScheme = () => {
    const newScheme = theme.colorScheme === 'light' ? 'dark' : 'light';
    setTheme({ colorScheme: newScheme });
  };

  const applyThemeToCSS = (themeConfig: ThemeConfig) => {
    const root = document.documentElement;
    const colors = COLOR_PALETTES[themeConfig.colorScheme];
    
    // Apply color scheme
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Apply primary and accent colors
    root.style.setProperty('--primary', themeConfig.primaryColor);
    root.style.setProperty('--accent', themeConfig.accentColor);
    
    // Apply theme-specific styles
    if (themeConfig.mode === 'playful') {
      root.classList.add('playful-mode');
      if (themeConfig.doodles) {
        root.classList.add('doodles-enabled');
      }
    } else {
      root.classList.remove('playful-mode', 'doodles-enabled');
    }
    
    // Apply animations
    if (themeConfig.animations) {
      root.classList.add('animations-enabled');
    } else {
      root.classList.remove('animations-enabled');
    }
  };

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('canvafolio-theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setThemeState(parsedTheme);
        applyThemeToCSS(parsedTheme);
      } catch (error) {
        console.error('Failed to parse saved theme:', error);
      }
    } else {
      applyThemeToCSS(theme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleMode, toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

interface ThemeSelectorProps {
  className?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className = '' }) => {
  const { theme, setTheme, toggleMode, toggleColorScheme } = useTheme();

  return (
    <Card className={`p-4 bg-gradient-card border-border ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-primary rounded-lg">
          <Palette className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-foreground">Theme Settings</h3>
        <Badge variant="secondary" className="text-xs">
          {theme.mode === 'classic' ? 'Classic' : 'Playful'}
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Theme Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {theme.mode === 'classic' ? (
              <Sun className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Sparkles className="w-4 h-4 text-pink-500" />
            )}
            <span className="text-sm font-medium">Theme Mode</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMode}
            className="h-8 px-3"
          >
            {theme.mode === 'classic' ? 'Switch to Playful' : 'Switch to Classic'}
          </Button>
        </div>

        {/* Color Scheme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {theme.colorScheme === 'light' ? (
              <Sun className="w-4 h-4 text-yellow-500" />
            ) : (
              <Moon className="w-4 h-4 text-blue-500" />
            )}
            <span className="text-sm font-medium">Color Scheme</span>
          </div>
          <Switch
            checked={theme.colorScheme === 'dark'}
            onCheckedChange={toggleColorScheme}
          />
        </div>

        {/* Playful Mode Features */}
        {theme.mode === 'playful' && (
          <div className="space-y-3 pt-2 border-t border-border">
            <h4 className="text-sm font-medium text-foreground">Playful Features</h4>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Sound Effects</span>
              </div>
              <Switch
                checked={theme.soundEffects}
                onCheckedChange={(checked) => setTheme({ soundEffects: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-pink-500" />
                <span className="text-sm">Doodles</span>
              </div>
              <Switch
                checked={theme.doodles}
                onCheckedChange={(checked) => setTheme({ doodles: checked })}
              />
            </div>
          </div>
        )}

        {/* Color Palette */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Color Palette</h4>
          <div className="grid grid-cols-4 gap-2">
            {[
              { name: 'Ocean', primary: '#0EA5E9', accent: '#06B6D4' },
              { name: 'Sunset', primary: '#F59E0B', accent: '#EF4444' },
              { name: 'Forest', primary: '#22C55E', accent: '#16A34A' },
              { name: 'Cosmic', primary: '#8B5CF6', accent: '#A855F7' }
            ].map((palette) => (
              <button
                key={palette.name}
                className="p-2 rounded-lg border border-border hover:border-primary transition-colors"
                onClick={() => setTheme({ 
                  primaryColor: palette.primary, 
                  accentColor: palette.accent 
                })}
              >
                <div className="flex gap-1 mb-1">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: palette.primary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: palette.accent }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{palette.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

// Doodle Overlay Component
export const DoodleOverlay: React.FC = () => {
  const { theme } = useTheme();

  if (theme.mode !== 'playful' || !theme.doodles) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating doodles */}
      <div className="absolute top-10 left-10 animate-bounce">
        <Star className="w-6 h-6 text-yellow-400 opacity-30" />
      </div>
      <div className="absolute top-20 right-20 animate-pulse">
        <Heart className="w-5 h-5 text-pink-400 opacity-20" />
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce">
        <Rainbow className="w-8 h-8 text-purple-400 opacity-25" />
      </div>
      <div className="absolute bottom-10 right-10 animate-pulse">
        <Droplets className="w-4 h-4 text-blue-400 opacity-30" />
      </div>
      <div className="absolute top-1/2 left-10 animate-bounce">
        <Music className="w-5 h-5 text-green-400 opacity-20" />
      </div>
      <div className="absolute top-1/3 right-10 animate-pulse">
        <Gamepad2 className="w-6 h-6 text-orange-400 opacity-25" />
      </div>
    </div>
  );
};

// Theme-aware component wrapper
interface ThemedComponentProps {
  children: React.ReactNode;
  className?: string;
}

export const ThemedComponent: React.FC<ThemedComponentProps> = ({ 
  children, 
  className = '' 
}) => {
  const { theme } = useTheme();

  return (
    <div 
      className={`
        ${className}
        ${theme.mode === 'playful' ? 'playful-mode' : 'classic-mode'}
        ${theme.animations ? 'animations-enabled' : 'animations-disabled'}
      `}
    >
      {children}
    </div>
  );
};

// Easter Egg Component
export const EasterEgg: React.FC<{ 
  children: React.ReactNode; 
  trigger: 'click' | 'hover' | 'double-click';
  effect: 'confetti' | 'sparkles' | 'bounce' | 'rotate';
}> = ({ children, trigger, effect }) => {
  const [isActive, setIsActive] = useState(false);
  const { theme } = useTheme();

  const handleTrigger = () => {
    if (theme.mode === 'playful') {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 1000);
    }
  };

  const getEffectClass = () => {
    if (!isActive) return '';
    
    switch (effect) {
      case 'confetti':
        return 'animate-ping';
      case 'sparkles':
        return 'animate-pulse';
      case 'bounce':
        return 'animate-bounce';
      case 'rotate':
        return 'animate-spin';
      default:
        return '';
    }
  };

  const eventHandlers = {
    click: { onClick: handleTrigger },
    hover: { onMouseEnter: handleTrigger },
    'double-click': { onDoubleClick: handleTrigger }
  };

  return (
    <div 
      className={`transition-all duration-300 ${getEffectClass()}`}
      {...eventHandlers[trigger]}
    >
      {children}
    </div>
  );
};
