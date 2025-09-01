import { Button } from "@/components/ui/button";
import { Eye, Download, Undo, Redo, Palette, Share, MoreHorizontal, Menu } from "lucide-react";

interface TopBarProps {
  isPreviewMode: boolean;
  onTogglePreview: () => void;
}

export const TopBar = ({ isPreviewMode, onTogglePreview }: TopBarProps) => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 relative z-50">
      {/* Left: Menu & Logo */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 lg:hidden">
          <Menu className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-900">Portfolio Builder</span>
        </div>
      </div>

      {/* Center: Quick Actions */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-sm hover:bg-gray-100"
        >
          <Share className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Share</span>
        </Button>
        
        <Button
          variant={isPreviewMode ? "secondary" : "ghost"}
          onClick={onTogglePreview}
          size="sm"
          className="h-8 px-3 text-sm hover:bg-gray-100"
        >
          <Eye className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">{isPreviewMode ? "Edit" : "Preview"}</span>
        </Button>
        
        <Button 
          className="h-8 px-4 text-sm bg-purple-600 hover:bg-purple-700 text-white"
          size="sm"
        >
          <Download className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Download</span>
        </Button>

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};