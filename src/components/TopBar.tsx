import { Button } from "@/components/ui/button";
import { Eye, Download, Undo, Redo, Palette } from "lucide-react";

interface TopBarProps {
  isPreviewMode: boolean;
  onTogglePreview: () => void;
}

export const TopBar = ({ isPreviewMode, onTogglePreview }: TopBarProps) => {
  return (
    <header className="h-16 bg-gradient-card border-b border-border/50 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left: Logo/Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Portfolio Builder
            </h1>
          </div>
        </div>

        {/* Center: Quick Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="hover:bg-secondary">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-secondary">
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        {/* Right: Main Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant={isPreviewMode ? "default" : "outline"}
            onClick={onTogglePreview}
            className="card-hover"
          >
            <Eye className="w-4 h-4 mr-2" />
            {isPreviewMode ? "Exit Preview" : "Preview"}
          </Button>
          
          <Button className="bg-gradient-primary hover:bg-primary-hover card-hover">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
};