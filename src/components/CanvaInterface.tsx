import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  FileText, 
  Crown, 
  Edit3, 
  Undo, 
  Redo, 
  Cloud, 
  BarChart3, 
  MessageCircle, 
  Presentation, 
  Upload, 
  Plus,
  Palette,
  RotateCcw,
  Ruler,
  Star,
  Square,
  Circle,
  Triangle,
  Type,
  Image as ImageIcon,
  Folder,
  Grid3X3,
  Settings,
  Play,
  Clock,
  Grid,
  Maximize2,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface CanvaInterfaceProps {
  children?: React.ReactNode;
  onPageChange?: (page: 'P1' | 'P2') => void;
  currentPage?: 'P1' | 'P2';
}

export const CanvaInterface: React.FC<CanvaInterfaceProps> = ({ 
  children, 
  onPageChange, 
  currentPage: externalCurrentPage 
}) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState<'P1' | 'P2'>('P1');
  const [selectedElement, setSelectedElement] = useState<string | null>('P1');
  const [duration, setDuration] = useState('5.0s');
  const [zoom, setZoom] = useState(48);

  const currentPage = externalCurrentPage || internalCurrentPage;

  const handlePageChange = (page: 'P1' | 'P2') => {
    if (externalCurrentPage !== undefined) {
      onPageChange?.(page);
    } else {
      setInternalCurrentPage(page);
    }
    setSelectedElement(page);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Menu className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              File
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 flex items-center gap-1">
              Resize
              <Crown className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 flex items-center gap-1">
              <Edit3 className="w-3 h-3" />
              Editing
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Cloud className="w-4 h-4" />
          </Button>
        </div>

        {/* Center - Project name */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">{currentPage}</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 px-3 flex items-center gap-1 text-purple-600">
            Try Pro for 30 days
            <Crown className="w-3 h-3" />
          </Button>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                B+
              </div>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <BarChart3 className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MessageCircle className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 px-3 flex items-center gap-1">
            <Presentation className="w-4 h-4" />
            Present
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 px-3 flex items-center gap-1">
            <Upload className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Secondary Toolbar */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center gap-4 px-4">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MessageCircle className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Palette className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="h-8 px-3 flex items-center gap-1">
          <RotateCcw className="w-4 h-4" />
          Animate
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{duration}</span>
        </div>
        
        <Button variant="ghost" size="sm" className="h-8 px-3">
          Position
        </Button>
        
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Ruler className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-4">
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
          
          <div className="mt-auto">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Sparkles className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-gray-100 p-8 flex items-center justify-center">
          <Card 
            className="bg-white shadow-2xl border-2 border-gray-200 relative"
            style={{
              width: '800px',
              height: '1000px',
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center'
            }}
          >
            <div className="w-full h-full relative">
              {children || (
                <div className="flex items-center justify-center h-full">
                  <div 
                    className="text-6xl font-bold text-black border-2 border-purple-500 p-8 cursor-pointer"
                    style={{ 
                      borderStyle: 'solid',
                      borderWidth: '2px',
                      borderColor: selectedElement === currentPage ? '#8B5CF6' : 'transparent'
                    }}
                    onClick={() => setSelectedElement(currentPage)}
                  >
                    {currentPage}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Sparkles className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 px-3 flex items-center gap-1">
            <FileText className="w-4 h-4" />
            Notes
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 px-3 flex items-center gap-1">
            <Play className="w-4 h-4" />
            Duration
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 px-3 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Timer
          </Button>
          
          <div className="w-32 h-2 bg-gray-200 rounded-full">
            <div className="w-1/2 h-full bg-purple-500 rounded-full"></div>
          </div>
          
          <span className="text-sm text-gray-600">{zoom}%</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 px-3">
            Pages
          </Button>
          
          <div className="flex items-center gap-1">
            <Button 
              variant={currentPage === 'P1' ? 'default' : 'outline'}
              size="sm" 
              className="h-8 px-3 flex items-center gap-1"
              onClick={() => handlePageChange('P1')}
            >
              <FileText className="w-4 h-4" />
              P1
              <span className="text-xs">1</span>
            </Button>
            
            <Button 
              variant={currentPage === 'P2' ? 'default' : 'outline'}
              size="sm" 
              className="h-8 px-3 flex items-center gap-1"
              onClick={() => handlePageChange('P2')}
            >
              <FileText className="w-4 h-4" />
              P2
              <span className="text-xs">2</span>
            </Button>
            
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Plus className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Grid className="w-4 h-4" />
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Maximize2 className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
