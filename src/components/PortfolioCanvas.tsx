import { PortfolioSection, PortfolioData } from "./PortfolioBuilder";
import { AboutSection } from "./sections/AboutSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { CanvaPage } from "./CanvaPage";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

interface PortfolioCanvasProps {
  activeSection: PortfolioSection;
  portfolioData: PortfolioData;
  onDataChange: (data: PortfolioData) => void;
  isPreviewMode: boolean;
}

export const PortfolioCanvas = ({
  activeSection,
  portfolioData,
  onDataChange,
  isPreviewMode
}: PortfolioCanvasProps) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return (
          <AboutSection
            data={portfolioData.about}
            onChange={(aboutData) => 
              onDataChange({ ...portfolioData, about: aboutData })
            }
            isPreviewMode={isPreviewMode}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            data={portfolioData.projects}
            onChange={(projectsData) => 
              onDataChange({ ...portfolioData, projects: projectsData })
            }
            isPreviewMode={isPreviewMode}
          />
        );
      default:
        return (
          <Card className="p-8 bg-gradient-card card-hover animate-bounce-in">
            <div className="text-center">
              <Construction className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
              <p className="text-muted-foreground">
                The {activeSection} section is being built. Stay tuned for more amazing features!
              </p>
            </div>
          </Card>
        );
    }
  };

  if (isPreviewMode) {
    return (
      <main className="flex-1 bg-white overflow-hidden">
        <CanvaPage activeSection={activeSection}>
          {renderSection()}
        </CanvaPage>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-hidden">
      <CanvaPage activeSection={activeSection}>
        {renderSection()}
      </CanvaPage>
    </main>
  );
};