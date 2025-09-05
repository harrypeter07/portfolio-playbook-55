import { PortfolioSection, PortfolioData } from "./PortfolioBuilder";
import { AboutSection } from "./sections/AboutSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { CanvaPage } from "./CanvaPage";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";
import { useEditor } from "@/components/editor/EditorContext";

interface PortfolioCanvasProps {
  activeSection: PortfolioSection;
  portfolioData: PortfolioData;
  isPreviewMode: boolean;
  currentPage?: 'P1' | 'P2';
}

export const PortfolioCanvas = ({
  activeSection,
  portfolioData,
  isPreviewMode,
  currentPage = 'P1'
}: PortfolioCanvasProps) => {
  const { currentPage: ctxPage, activeSection: ctxActiveSection } = useEditor();
  const page = ctxPage || currentPage;
  const renderSection = () => {
    // Show different content based on current page
    if (page === 'P1') {
      return (
        <AboutSection
          data={portfolioData.about}
          isPreviewMode={isPreviewMode}
        />
      );
    } else if (page === 'P2') {
      return (
        <ProjectsSection
          data={portfolioData.projects}
          isPreviewMode={isPreviewMode}
        />
      );
    }

    // Fallback to original section-based rendering
    switch (activeSection) {
      case 'about':
        return (
          <AboutSection
            data={portfolioData.about}
            isPreviewMode={isPreviewMode}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            data={portfolioData.projects}
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
        <CanvaPage activeSection={ctxActiveSection}>
          <div 
            key={ctxActiveSection + page}
            className="animate-in slide-in-from-right-4 duration-300"
          >
            {renderSection()}
          </div>
        </CanvaPage>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-hidden bg-white">
      <CanvaPage activeSection={ctxActiveSection}>
        <div 
          key={ctxActiveSection + page}
          className="animate-in slide-in-from-right-4 duration-300"
        >
          {renderSection()}
        </div>
      </CanvaPage>
    </main>
  );
};