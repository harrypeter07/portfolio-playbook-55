import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save,
  X,
  Eye,
  EyeOff,
  Copy,
  Download,
  Share,
  ArrowLeft,
  ArrowRight,
  Grid3X3,
  List,
  Search,
  Filter,
  Star,
  Heart,
  Bookmark,
  ExternalLink,
  Github,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Settings,
  Palette,
  Type,
  Image as ImageIcon,
  Video,
  FileText,
  Code,
  Zap,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectPage {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail?: string;
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  pages: ProjectPage[];
  coverImage?: string;
  liveUrl?: string;
  githubUrl?: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectPagesProps {
  project: Project;
  onProjectUpdate: (project: Project) => void;
  isPreviewMode?: boolean;
  className?: string;
}

const PAGE_TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank Page',
    description: 'Start with a clean slate',
    icon: <FileText className="w-4 h-4" />,
    template: {
      title: 'New Page',
      description: 'Add your content here...',
      content: ''
    }
  },
  {
    id: 'hero',
    name: 'Hero Section',
    description: 'Eye-catching introduction',
    icon: <Star className="w-4 h-4" />,
    template: {
      title: 'Project Hero',
      description: 'Welcome to my amazing project',
      content: '# Project Overview\n\nThis is where you introduce your project and its key features.'
    }
  },
  {
    id: 'features',
    name: 'Features',
    description: 'Highlight key features',
    icon: <Zap className="w-4 h-4" />,
    template: {
      title: 'Key Features',
      description: 'What makes this project special',
      content: '## Features\n\n- Feature 1\n- Feature 2\n- Feature 3'
    }
  },
  {
    id: 'tech',
    name: 'Technology Stack',
    description: 'Show technologies used',
    icon: <Code className="w-4 h-4" />,
    template: {
      title: 'Tech Stack',
      description: 'Technologies and tools used',
      content: '## Technologies Used\n\n- React\n- TypeScript\n- Tailwind CSS'
    }
  },
  {
    id: 'gallery',
    name: 'Image Gallery',
    description: 'Visual showcase',
    icon: <ImageIcon className="w-4 h-4" />,
    template: {
      title: 'Project Gallery',
      description: 'Screenshots and visuals',
      content: '## Project Screenshots\n\nAdd your project images here...'
    }
  }
];

export const ProjectPages: React.FC<ProjectPagesProps> = ({
  project,
  onProjectUpdate,
  isPreviewMode = false,
  className = ''
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<ProjectPage>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentPage = project.pages[currentPageIndex];

  const addPage = (templateId?: string) => {
    const template = templateId ? PAGE_TEMPLATES.find(t => t.id === templateId) : PAGE_TEMPLATES[0];
    const newPage: ProjectPage = {
      id: Date.now().toString(),
      title: template?.template.title || 'New Page',
      description: template?.template.description || 'Add your content here...',
      content: template?.template.content || '',
      isVisible: true,
      order: project.pages.length,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedProject = {
      ...project,
      pages: [...project.pages, newPage]
    };

    onProjectUpdate(updatedProject);
    setCurrentPageIndex(project.pages.length);
    setShowTemplates(false);
  };

  const updatePage = (pageId: string, updates: Partial<ProjectPage>) => {
    const updatedPages = project.pages.map(page =>
      page.id === pageId ? { ...page, ...updates, updatedAt: new Date() } : page
    );

    onProjectUpdate({
      ...project,
      pages: updatedPages
    });
  };

  const deletePage = (pageId: string) => {
    const updatedPages = project.pages.filter(page => page.id !== pageId);
    const newIndex = Math.max(0, currentPageIndex - 1);
    
    onProjectUpdate({
      ...project,
      pages: updatedPages
    });
    
    setCurrentPageIndex(newIndex);
  };

  const duplicatePage = (pageId: string) => {
    const pageToDuplicate = project.pages.find(page => page.id === pageId);
    if (!pageToDuplicate) return;

    const duplicatedPage: ProjectPage = {
      ...pageToDuplicate,
      id: Date.now().toString(),
      title: `${pageToDuplicate.title} (Copy)`,
      order: project.pages.length,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    onProjectUpdate({
      ...project,
      pages: [...project.pages, duplicatedPage]
    });
  };

  const startEditing = (page: ProjectPage) => {
    setIsEditing(page.id);
    setEditData({
      title: page.title,
      description: page.description,
      content: page.content
    });
  };

  const saveEdit = () => {
    if (isEditing) {
      updatePage(isEditing, editData);
      setIsEditing(null);
      setEditData({});
    }
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setEditData({});
  };

  const filteredPages = project.pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPageContent = (page: ProjectPage) => {
    if (isEditing === page.id) {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Title</label>
            <Input
              value={editData.title || ''}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="text-lg font-semibold"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Description</label>
            <Input
              value={editData.description || ''}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Content</label>
            <Textarea
              value={editData.content || ''}
              onChange={(e) => setEditData({ ...editData, content: e.target.value })}
              rows={10}
              className="font-mono text-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={saveEdit} size="sm">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button onClick={cancelEdit} variant="outline" size="sm">
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{page.title}</h1>
            <p className="text-muted-foreground">{page.description}</p>
          </div>
          
          {!isPreviewMode && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => startEditing(page)}
                className="hover:bg-primary/10"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => duplicatePage(page.id)}
                className="hover:bg-primary/10"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deletePage(page.id)}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap text-foreground bg-muted p-4 rounded-lg">
            {page.content}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-foreground">{project.title}</h2>
              <p className="text-sm text-muted-foreground">{project.pages.length} pages</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
              {project.status}
            </Badge>
            <Badge variant="outline">
              {project.tech.length} tech
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isPreviewMode && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplates(true)}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Page
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </>
          )}
          
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>
          
          <Button size="sm" className="bg-gradient-primary">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Page List */}
        <div className="w-80 border-r border-border bg-gray-50 flex flex-col">
          {/* Search and Controls */}
          <div className="p-4 border-b border-border">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9 text-sm"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 px-2"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 px-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Page List */}
          <div className="flex-1 overflow-y-auto p-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredPages.map((page, index) => (
                  <motion.div
                    key={page.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card
                      className={`
                        p-3 cursor-pointer transition-all hover:shadow-md
                        ${currentPageIndex === index ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-white'}
                      `}
                      onClick={() => setCurrentPageIndex(index)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-foreground truncate">
                            {page.title}
                          </h4>
                          <div className="flex items-center gap-1">
                            {page.isVisible ? (
                              <Eye className="w-3 h-3 text-green-500" />
                            ) : (
                              <EyeOff className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {page.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {page.updatedAt.toLocaleDateString()}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {index + 1}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredPages.map((page, index) => (
                  <motion.div
                    key={page.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card
                      className={`
                        p-3 cursor-pointer transition-all hover:shadow-md
                        ${currentPageIndex === index ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-white'}
                      `}
                      onClick={() => setCurrentPageIndex(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground truncate">
                            {page.title}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate">
                            {page.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {page.isVisible ? (
                            <Eye className="w-3 h-3 text-green-500" />
                          ) : (
                            <EyeOff className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Page Navigation */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-white">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
                disabled={currentPageIndex === 0}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <span className="text-sm font-medium text-foreground">
                Page {currentPageIndex + 1} of {project.pages.length}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPageIndex(Math.min(project.pages.length - 1, currentPageIndex + 1))}
                disabled={currentPageIndex === project.pages.length - 1}
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Palette className="w-4 h-4 mr-1" />
                Theme
              </Button>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            <AnimatePresence mode="wait">
              {currentPage && (
                <motion.div
                  key={currentPage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderPageContent(currentPage)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Template Selection Modal */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Choose Page Template</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTemplates(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PAGE_TEMPLATES.map((template) => (
                  <Card
                    key={template.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addPage(template.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {template.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
