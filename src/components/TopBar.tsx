import { Button } from "@/components/ui/button";
import { Eye, Download, Undo, Redo, Palette, Share, MoreHorizontal, Menu, FileText, Crown, Edit3, Cloud, BarChart3, MessageCircle, Presentation, Upload, Plus, RotateCcw, Ruler } from "lucide-react";

interface TopBarProps {
  isPreviewMode: boolean;
  onTogglePreview: () => void;
}

export const TopBar = ({ isPreviewMode, onTogglePreview }: TopBarProps) => {
  return (
    <>
      {/* Main Top Bar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 relative z-50">
        {/* Left side - Canva style */}
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
          <span className="text-sm font-medium text-gray-700">P1</span>
        </div>

        {/* Right side - Canva style */}
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
          <span className="text-sm text-gray-600">5.0s</span>
        </div>
        
        <Button variant="ghost" size="sm" className="h-8 px-3">
          Position
        </Button>
        
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Ruler className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};