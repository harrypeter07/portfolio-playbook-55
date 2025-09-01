import { PortfolioSection, PortfolioData } from "./PortfolioBuilder";
import { AboutSection } from "./sections/AboutSection";
import { ProjectsSection } from "./sections/ProjectsSection";
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

  return (
    <main className={`flex-1 p-6 overflow-y-auto ${isPreviewMode ? 'bg-white' : ''}`}>
      <div className="max-w-4xl mx-auto">
        {!isPreviewMode && (
          <div className="mb-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2 capitalize">
              {activeSection === 'about' ? 'About Me' : 
               activeSection === 'projects' ? 'Projects' :
               activeSection}
            </h2>
            <p className="text-muted-foreground">
              {activeSection === 'about' && 'Tell your story and showcase your personality'}
              {activeSection === 'projects' && 'Showcase your best work and achievements'}
              {activeSection === 'experience' && 'Highlight your professional journey'}
              {activeSection === 'skills' && 'Display your technical and soft skills'}
              {activeSection === 'contact' && 'Make it easy for people to reach you'}
            </p>
          </div>
        )}

        <div className="animate-fade-in">
          {renderSection()}
        </div>
      </div>
    </main>
  );
};