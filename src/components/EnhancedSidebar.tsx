import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Plus,
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Mail,
  Star,
  Sparkles,
  Zap,
  Heart,
  Target,
  Rocket,
  Lightbulb,
  Palette,
  Type,
  Image as ImageIcon,
  Shapes,
  Grid3X3,
  Settings,
  Download,
  Share,
  Eye,
  EyeOff,
  Square,
  Circle,
  Triangle,
  Crown,
  Cloud,
  Edit3,
  Folder
} from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

interface SidebarCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  isExpanded: boolean;
  items: SidebarItem[];
  preview?: React.ReactNode;
}

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  badge?: string;
  onClick?: () => void;
}

interface EnhancedSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isPreviewMode: boolean;
  onTogglePreview: () => void;
  className?: string;
}

export const EnhancedSidebar: React.FC<EnhancedSidebarProps> = ({
  activeSection,
  onSectionChange,
  isPreviewMode,
  onTogglePreview,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['portfolio']));

  const categories: SidebarCategory[] = [
    {
      id: 'portfolio',
      label: 'Portfolio Sections',
      icon: <User className="w-4 h-4" />,
      color: 'bg-blue-500',
      description: 'Your portfolio content',
      isExpanded: expandedCategories.has('portfolio'),
      items: [
        {
          id: 'about',
          label: 'About Me',
          icon: <User className="w-3 h-3" />,
          description: 'Personal information',
          onClick: () => onSectionChange('about')
        },
        {
          id: 'projects',
          label: 'Projects',
          icon: <Code className="w-3 h-3" />,
          description: 'Your work showcase',
          badge: '3',
          onClick: () => onSectionChange('projects')
        },
        {
          id: 'experience',
          label: 'Experience',
          icon: <Briefcase className="w-3 h-3" />,
          description: 'Work history',
          onClick: () => onSectionChange('experience')
        },
        {
          id: 'skills',
          label: 'Skills',
          icon: <GraduationCap className="w-3 h-3" />,
          description: 'Your abilities',
          onClick: () => onSectionChange('skills')
        },
        {
          id: 'contact',
          label: 'Contact',
          icon: <Mail className="w-3 h-3" />,
          description: 'Get in touch',
          onClick: () => onSectionChange('contact')
        }
      ]
    },
    {
      id: 'design',
      label: 'Design Elements',
      icon: <Palette className="w-4 h-4" />,
      color: 'bg-purple-500',
      description: 'Visual components',
      isExpanded: expandedCategories.has('design'),
      items: [
        {
          id: 'text',
          label: 'Text',
          icon: <Type className="w-3 h-3" />,
          description: 'Typography tools'
        },
        {
          id: 'images',
          label: 'Images',
          icon: <ImageIcon className="w-3 h-3" />,
          description: 'Media library'
        },
        {
          id: 'shapes',
          label: 'Shapes',
          icon: <Shapes className="w-3 h-3" />,
          description: 'Geometric elements'
        },
        {
          id: 'layouts',
          label: 'Layouts',
          icon: <Grid3X3 className="w-3 h-3" />,
          description: 'Page templates'
        }
      ]
    },
    {
      id: 'magic',
      label: 'Magic Features',
      icon: <Sparkles className="w-4 h-4" />,
      color: 'bg-pink-500',
      description: 'AI-powered tools',
      isExpanded: expandedCategories.has('magic'),
      items: [
        {
          id: 'suggest',
          label: 'Magic Suggest',
          icon: <Zap className="w-3 h-3" />,
          description: 'AI content generation',
          badge: 'NEW'
        },
        {
          id: 'media',
          label: 'Magic Media',
          icon: <ImageIcon className="w-3 h-3" />,
          description: 'AI visual creation'
        },
        {
          id: 'analytics',
          label: 'Magic Analytics',
          icon: <Target className="w-3 h-3" />,
          description: 'Performance insights'
        },
        {
          id: 'theme',
          label: 'Magic Theme',
          icon: <Rocket className="w-3 h-3" />,
          description: 'Auto theme generation'
        }
      ]
    },
    {
      id: 'tools',
      label: 'Tools & Settings',
      icon: <Settings className="w-4 h-4" />,
      color: 'bg-gray-500',
      description: 'Utilities and options',
      isExpanded: expandedCategories.has('tools'),
      items: [
        {
          id: 'preview',
          label: isPreviewMode ? 'Exit Preview' : 'Preview Mode',
          icon: isPreviewMode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />,
          description: 'Toggle preview mode',
          onClick: onTogglePreview
        },
        {
          id: 'export',
          label: 'Export Portfolio',
          icon: <Download className="w-3 h-3" />,
          description: 'Download your work'
        },
        {
          id: 'share',
          label: 'Share Portfolio',
          icon: <Share className="w-3 h-3" />,
          description: 'Get shareable link'
        }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0 || searchQuery === '');

  const renderCategoryPreview = (category: SidebarCategory) => {
    if (!hoveredCategory || hoveredCategory !== category.id) return null;

    return (
      <div className="absolute left-full top-0 ml-2 w-64 z-50">
        <Card className="p-4 bg-white shadow-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-lg ${category.color} text-white`}>
              {category.icon}
            </div>
            <div>
              <h4 className="font-semibold text-sm">{category.label}</h4>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            {category.items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                {item.icon && (
                  <div className="w-4 h-4 text-muted-foreground">
                    {item.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{item.label}</p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  )}
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </div>
            ))}
            {category.items.length > 3 && (
              <p className="text-xs text-muted-foreground text-center">
                +{category.items.length - 3} more items
              </p>
            )}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <aside className={`w-16 bg-white border-r border-gray-200 h-full overflow-y-auto relative flex flex-col items-center py-4 gap-4 ${className}`}>
      {/* Design Elements - Canva Style */}
      <Button variant="ghost" size="sm" className="h-12 w-12 flex flex-col items-center gap-1">
        <Square className="w-5 h-5" />
        <Circle className="w-5 h-5" />
        <span className="text-xs">Design</span>
      </Button>
      
      <Button variant="ghost" size="sm" className="h-12 w-12 flex flex-col items-center gap-1">
        <Square className="w-5 h-5" />
        <Triangle className="w-5 h-5" />
        <Circle className="w-5 h-5" />
        <span className="text-xs">Elements</span>
      </Button>
      
      <Button variant="ghost" size="sm" className="h-12 w-12 flex flex-col items-center gap-1">
        <Type className="w-6 h-6" />
        <span className="text-xs">Text</span>
      </Button>
      
      <Button variant="ghost" size="sm" className="h-12 w-12 flex flex-col items-center gap-1">
        <Crown className="w-5 h-5" />
        <span className="text-xs">Brand</span>
      </Button>
      
      <Button variant="ghost" size="sm" className="h-12 w-12 flex flex-col items-center gap-1">
        <Cloud className="w-5 h-5" />
        <span className="text-xs">Uploads</span>
      </Button>
      
      <Button variant="ghost" size="sm" className="h-12 w-12 flex flex-col items-center gap-1">
        <Edit3 className="w-5 h-5" />
        <span className="text-xs">Tools</span>
      </Button>
      
      <Button variant="ghost" size="sm" className="h-12 w-12 flex flex-col items-center gap-1">
        <Folder className="w-5 h-5" />
        <span className="text-xs">Projects</span>
      </Button>
      
      <Button variant="ghost" size="sm" className="h-12 w-12 flex flex-col items-center gap-1">
        <Grid3X3 className="w-5 h-5" />
        <span className="text-xs">Apps</span>
      </Button>
      
      {/* Magic Sparkle Effect */}
      <div className="mt-auto">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Sparkles className="w-4 h-4" />
        </Button>
      </div>
    </aside>
  );
};
