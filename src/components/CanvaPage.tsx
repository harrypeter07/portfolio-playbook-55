import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Maximize2, Monitor, Smartphone, FileText, Square } from "lucide-react";

export type PageSize = {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
};

const PAGE_SIZES: PageSize[] = [
  { name: "Custom", width: 800, height: 1000, icon: <Square className="w-4 h-4" /> },
  { name: "Presentation (16:9)", width: 1920, height: 1080, icon: <Monitor className="w-4 h-4" /> },
  { name: "Letter (8.5×11)", width: 816, height: 1056, icon: <FileText className="w-4 h-4" /> },
  { name: "Mobile (9:16)", width: 405, height: 720, icon: <Smartphone className="w-4 h-4" /> },
  { name: "Square", width: 800, height: 800, icon: <Square className="w-4 h-4" /> }
];

interface CanvaPageProps {
  children?: React.ReactNode;
  activeSection?: string;
}

export const CanvaPage = ({ children, activeSection }: CanvaPageProps) => {
  const [selectedSize, setSelectedSize] = useState<PageSize>(PAGE_SIZES[0]);
  const [scale, setScale] = useState(0.6);

  const handleSizeChange = (sizeName: string) => {
    const size = PAGE_SIZES.find(s => s.name === sizeName);
    if (size) setSelectedSize(size);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Page Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Select value={selectedSize.name} onValueChange={handleSizeChange}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZES.map((size) => (
                <SelectItem key={size.name} value={size.name}>
                  <div className="flex items-center gap-2">
                    {size.icon}
                    <span>{size.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {size.width} × {size.height}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setScale(Math.max(0.2, scale - 0.1))}
            >
              -
            </Button>
            <span className="text-sm font-medium min-w-16 text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setScale(Math.min(2, scale + 0.1))}
            >
              +
            </Button>
            <Button variant="outline" size="sm" onClick={() => setScale(1)}>
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          {selectedSize.name} • {selectedSize.width} × {selectedSize.height}px
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-muted/20 p-8 overflow-auto">
        <div className="flex items-center justify-center min-h-full">
          <Card 
            className="bg-white shadow-2xl border-2 border-border animate-fade-in"
            style={{
              width: selectedSize.width * scale,
              height: selectedSize.height * scale,
              transform: `scale(${scale})`,
              transformOrigin: 'center center'
            }}
          >
            <div className="w-full h-full overflow-auto">
              {children || (
                <div className="flex items-center justify-center h-full text-center p-8">
                  {!activeSection ? (
                    <>
                      <div>
                        <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          Start Building Your Portfolio
                        </h3>
                        <p className="text-muted-foreground">
                          Select a section from the left sidebar to begin editing your portfolio
                        </p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <h3 className="text-lg font-medium text-muted-foreground">
                        {activeSection} Section
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Content will appear here
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};