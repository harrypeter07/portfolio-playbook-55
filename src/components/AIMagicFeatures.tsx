import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Wand2, 
  Brain, 
  Zap, 
  Star,
  Lightbulb,
  Target,
  Rocket,
  Palette,
  Type,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';

// Magic Suggest Component
interface MagicSuggestProps {
  onSuggestionGenerated: (suggestion: string) => void;
  context?: string;
  type?: 'intro' | 'tagline' | 'description' | 'title';
  className?: string;
}

export const MagicSuggest: React.FC<MagicSuggestProps> = ({
  onSuggestionGenerated,
  context = '',
  type = 'description',
  className = ''
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('');

  const generateSuggestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with realistic delays
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const suggestionTemplates = {
      intro: [
        "Welcome to my creative journey! I'm passionate about bringing ideas to life through innovative design and technology.",
        "Hello! I'm a creative professional who loves turning complex problems into beautiful, user-friendly solutions.",
        "Welcome! I specialize in creating digital experiences that are both functional and delightful to use.",
        "Hi there! I'm a designer and developer who believes in the power of thoughtful, human-centered design."
      ],
      tagline: [
        "Designing Tomorrow, Today",
        "Where Creativity Meets Technology",
        "Building Beautiful Digital Experiences",
        "Innovation Through Design",
        "Crafting Digital Stories"
      ],
      description: [
        "A passionate creative professional with expertise in user experience design, front-end development, and digital strategy. I love solving complex problems through thoughtful design and clean code.",
        "Experienced designer and developer specializing in creating intuitive, accessible, and beautiful digital products. I believe great design happens at the intersection of user needs and business goals.",
        "Creative technologist with a passion for building meaningful digital experiences. I combine strategic thinking with hands-on design and development skills to create products that users love.",
        "Designer and developer focused on creating human-centered digital solutions. I bring together aesthetics, functionality, and user psychology to build products that make a difference."
      ],
      title: [
        "Senior UX Designer & Frontend Developer",
        "Creative Director & Product Designer",
        "Full-Stack Designer & Developer",
        "Digital Product Designer",
        "UX/UI Designer & Developer"
      ]
    };

    const generatedSuggestions = suggestionTemplates[type]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setSuggestions(generatedSuggestions);
    setIsGenerating(false);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    onSuggestionGenerated(suggestion);
  };

  return (
    <Card className={`p-4 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-purple-500 rounded-lg">
          <Wand2 className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-purple-900">Magic Suggest</h3>
        <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
          AI-Powered
        </Badge>
      </div>

      <div className="space-y-3">
        <Button
          onClick={generateSuggestions}
          disabled={isGenerating}
          className="w-full bg-gradient-primary hover:bg-gradient-primary/90"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Magic...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate {type} Suggestions
            </>
          )}
        </Button>

        {suggestions.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Choose your favorite:</p>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-all
                  ${selectedSuggestion === suggestion 
                    ? 'border-purple-300 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-200 hover:bg-purple-25'
                  }
                `}
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                <p className="text-sm text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

// Magic Media Component
interface MagicMediaProps {
  onMediaGenerated: (media: { type: string; url: string; prompt: string }) => void;
  className?: string;
}

export const MagicMedia: React.FC<MagicMediaProps> = ({
  onMediaGenerated,
  className = ''
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedMedia, setGeneratedMedia] = useState<Array<{ type: string; url: string; prompt: string }>>([]);

  const mediaPrompts = [
    "Abstract geometric patterns",
    "Minimalist tech illustrations",
    "Creative coding visuals",
    "Modern design elements",
    "Professional portfolio backgrounds"
  ];

  const generateMedia = async (mediaPrompt: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    const mediaTypes = ['pattern', 'icon', 'illustration', 'background'];
    const type = mediaTypes[Math.floor(Math.random() * mediaTypes.length)];
    
    // Generate placeholder URLs (in real app, these would be actual generated media)
    const generatedItem = {
      type,
      url: `https://picsum.photos/400/300?random=${Date.now()}`,
      prompt: mediaPrompt
    };
    
    setGeneratedMedia(prev => [generatedItem, ...prev.slice(0, 4)]);
    onMediaGenerated(generatedItem);
    setIsGenerating(false);
  };

  return (
    <Card className={`p-4 bg-gradient-to-br from-pink-50 to-orange-50 border-pink-200 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-pink-500 rounded-lg">
          <Palette className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-pink-900">Magic Media</h3>
        <Badge variant="secondary" className="text-xs bg-pink-100 text-pink-700">
          AI-Generated
        </Badge>
      </div>

      <div className="space-y-3">
        <div>
          <Input
            placeholder="Describe the visual you want..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mb-2"
          />
          <Button
            onClick={() => generateMedia(prompt)}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-gradient-accent hover:bg-gradient-accent/90"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Magic...
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                Generate Visual
              </>
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Quick prompts:</p>
          <div className="flex flex-wrap gap-1">
            {mediaPrompts.map((quickPrompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => generateMedia(quickPrompt)}
                disabled={isGenerating}
              >
                {quickPrompt}
              </Button>
            ))}
          </div>
        </div>

        {generatedMedia.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Recent generations:</p>
            <div className="grid grid-cols-2 gap-2">
              {generatedMedia.slice(0, 4).map((media, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => onMediaGenerated(media)}
                >
                  <img
                    src={media.url}
                    alt={media.prompt}
                    className="w-full h-20 object-cover rounded-lg border"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs text-center px-2">
                      Use this
                    </span>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="absolute top-1 left-1 text-xs bg-white/90"
                  >
                    {media.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

// Magic Analytics Component
interface MagicAnalyticsProps {
  data: Array<{ label: string; value: number; color: string }>;
  className?: string;
}

export const MagicAnalytics: React.FC<MagicAnalyticsProps> = ({
  data,
  className = ''
}) => {
  const [animatedData, setAnimatedData] = useState(data.map(item => ({ ...item, animatedValue: 0 })));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data.map(item => ({ ...item, animatedValue: item.value })));
    }, 500);

    return () => clearTimeout(timer);
  }, [data]);

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <Card className={`p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-500 rounded-lg">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-blue-900">Magic Analytics</h3>
        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
          AI Insights
        </Badge>
      </div>

      <div className="space-y-3">
        {animatedData.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm font-bold" style={{ color: item.color }}>
                {item.animatedValue}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${item.animatedValue}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Magic Insights Component
interface MagicInsightsProps {
  insights: Array<{ type: 'tip' | 'warning' | 'success'; message: string; icon: React.ReactNode }>;
  className?: string;
}

export const MagicInsights: React.FC<MagicInsightsProps> = ({
  insights,
  className = ''
}) => {
  return (
    <Card className={`p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-green-500 rounded-lg">
          <Lightbulb className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-green-900">Magic Insights</h3>
        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
          AI-Powered
        </Badge>
      </div>

      <div className="space-y-2">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`
              p-3 rounded-lg border-l-4 flex items-start gap-3
              ${insight.type === 'tip' ? 'bg-blue-50 border-blue-400' :
                insight.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                'bg-green-50 border-green-400'}
            `}
          >
            <div className={`
              p-1 rounded
              ${insight.type === 'tip' ? 'bg-blue-100' :
                insight.type === 'warning' ? 'bg-yellow-100' :
                'bg-green-100'}
            `}>
              {insight.icon}
            </div>
            <p className="text-sm text-gray-700">{insight.message}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Magic Theme Generator
interface MagicThemeProps {
  onThemeGenerated: (theme: { name: string; colors: string[]; fonts: string[] }) => void;
  className?: string;
}

export const MagicTheme: React.FC<MagicThemeProps> = ({
  onThemeGenerated,
  className = ''
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedThemes, setGeneratedThemes] = useState<Array<{ name: string; colors: string[]; fonts: string[] }>>([]);

  const generateTheme = async () => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const themeTemplates = [
      {
        name: "Ocean Breeze",
        colors: ["#0EA5E9", "#06B6D4", "#14B8A6", "#10B981"],
        fonts: ["Inter", "Poppins", "Roboto"]
      },
      {
        name: "Sunset Glow",
        colors: ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6"],
        fonts: ["Montserrat", "Open Sans", "Lato"]
      },
      {
        name: "Forest Fresh",
        colors: ["#22C55E", "#16A34A", "#15803D", "#166534"],
        fonts: ["Nunito", "Source Sans Pro", "Work Sans"]
      },
      {
        name: "Cosmic Purple",
        colors: ["#8B5CF6", "#A855F7", "#C084FC", "#DDD6FE"],
        fonts: ["Playfair Display", "Merriweather", "Crimson Text"]
      }
    ];

    const randomTheme = themeTemplates[Math.floor(Math.random() * themeTemplates.length)];
    setGeneratedThemes(prev => [randomTheme, ...prev.slice(0, 3)]);
    onThemeGenerated(randomTheme);
    setIsGenerating(false);
  };

  return (
    <Card className={`p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-indigo-500 rounded-lg">
          <Rocket className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-indigo-900">Magic Theme</h3>
        <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-700">
          AI-Generated
        </Badge>
      </div>

      <div className="space-y-3">
        <Button
          onClick={generateTheme}
          disabled={isGenerating}
          className="w-full bg-gradient-primary hover:bg-gradient-primary/90"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Theme...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Theme
            </>
          )}
        </Button>

        {generatedThemes.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Recent themes:</p>
            {generatedThemes.slice(0, 3).map((theme, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-gray-200 hover:border-indigo-200 cursor-pointer transition-colors"
                onClick={() => onThemeGenerated(theme)}
              >
                <h4 className="font-medium text-sm mb-2">{theme.name}</h4>
                <div className="flex gap-1 mb-2">
                  {theme.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {theme.fonts.map((font, fontIndex) => (
                    <Badge key={fontIndex} variant="outline" className="text-xs">
                      {font}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
