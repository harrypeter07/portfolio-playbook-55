import React from "react";
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
  const { currentPage: ctxPage, activeSection: ctxActiveSection, setTotalPages, setCurrentPage } = useEditor();
  const page = ctxPage || currentPage;

  // Set total pages based on active section
  React.useEffect(() => {
    if (ctxActiveSection === 'about') {
      setTotalPages(1);
      setCurrentPage(1);
    } else if (ctxActiveSection === 'projects') {
      setTotalPages(portfolioData.projects.length);
      setCurrentPage(1);
    } else {
      setTotalPages(1);
      setCurrentPage(1);
    }
  }, [ctxActiveSection, portfolioData.projects.length, setTotalPages, setCurrentPage]);
  const renderSection = () => {
    // Show content based on active section and current page
    switch (ctxActiveSection) {
      case 'about':
        return (
          <AboutSection
            data={portfolioData.about}
            isPreviewMode={isPreviewMode}
          />
        );
      case 'projects':
        // For projects, show the specific project for the current page
        const projectIndex = (ctxPage || 1) - 1;
        const currentProject = portfolioData.projects[projectIndex];
        return (
          <ProjectsSection
            data={currentProject ? [currentProject] : []}
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
                The {ctxActiveSection} section is being built. Stay tuned for more amazing features!
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