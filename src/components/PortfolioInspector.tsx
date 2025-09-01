import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Palette, 
  Type, 
  Layout, 
  Sparkles,
  Sliders
} from "lucide-react";
import { PortfolioSection, PortfolioData } from "./PortfolioBuilder";

interface PortfolioInspectorProps {
  activeSection: PortfolioSection;
  portfolioData: PortfolioData;
}

const colorThemes = [
  { name: 'Purple Burst', colors: ['#8B5CF6', '#A855F7', '#C084FC'] },
  { name: 'Ocean Wave', colors: ['#0EA5E9', '#06B6D4', '#67E8F9'] },
  { name: 'Sunset Glow', colors: ['#F97316', '#FB923C', '#FDBA74'] },
  { name: 'Forest Green', colors: ['#059669', '#10B981', '#6EE7B7'] },
];

const animations = [
  { name: 'Fade In', value: 'fade-in' },
  { name: 'Bounce In', value: 'bounce-in' },
  { name: 'Slide In', value: 'slide-in' },
  { name: 'Pulse Glow', value: 'pulse-glow' },
];

export const PortfolioInspector = ({ 
  activeSection, 
  portfolioData 
}: PortfolioInspectorProps) => {
  return (
    <aside className="w-80 bg-gradient-card border-l border-border/50 backdrop-blur-sm overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center">
            <Sliders className="w-5 h-5 mr-2" />
            Style Inspector
          </h2>
          <p className="text-sm text-muted-foreground">
            Customize the look and feel of your {activeSection} section
          </p>
        </div>

        <div className="space-y-6">
          {/* Color Themes */}
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center mb-3">
              <Palette className="w-4 h-4 mr-2 text-primary" />
              <h3 className="font-medium text-foreground">Color Themes</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {colorThemes.map((theme) => (
                <Button
                  key={theme.name}
                  variant="outline"
                  className="h-auto p-3 card-hover"
                >
                  <div className="text-center">
                    <div className="flex space-x-1 mb-2">
                      {theme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className="text-xs">{theme.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          {/* Typography */}
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center mb-3">
              <Type className="w-4 h-4 mr-2 text-primary" />
              <h3 className="font-medium text-foreground">Typography</h3>
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Inter - Modern & Clean
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Poppins - Friendly & Round
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                JetBrains Mono - Code Style
              </Button>
            </div>
          </Card>

          {/* Layout Options */}
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center mb-3">
              <Layout className="w-4 h-4 mr-2 text-primary" />
              <h3 className="font-medium text-foreground">Layout</h3>
            </div>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Grid
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  List
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Cards
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Minimal
                </Button>
              </div>
            </div>
          </Card>

          {/* Animations */}
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center mb-3">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              <h3 className="font-medium text-foreground">Animations</h3>
            </div>
            <div className="space-y-2">
              {animations.map((animation) => (
                <div key={animation.value} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{animation.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {animation.value}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Separator />

          {/* Section Stats */}
          <Card className="p-4 bg-accent/10 border-accent/20">
            <h3 className="font-medium text-foreground mb-3">Section Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Content blocks:</span>
                <Badge variant="outline">
                  {activeSection === 'projects' ? portfolioData.projects.length : 1}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last updated:</span>
                <span className="text-foreground">Just now</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </aside>
  );
};