import { useState } from "react";
import { EnhancedSidebar } from "@/components/EnhancedSidebar";
import { PortfolioCanvas } from "@/components/PortfolioCanvas";
import { TopBar } from "@/components/TopBar";
import { CanvaToolbar } from "@/components/CanvaToolbar";
import { DragDropCanvas, DraggableItem } from "@/components/DragDropCanvas";
import { WhiteboardCanvas } from "@/components/WhiteboardCanvas";
import { ProjectPages } from "@/components/ProjectPages";
import { ThemeProvider, DoodleOverlay } from "@/components/AdaptiveTheme";
import { MagicAnimate } from "@/components/MagicAnimate";
import { EasterEggManager } from "@/components/EasterEggs";

export type PortfolioSection = 'about' | 'projects' | 'experience' | 'skills' | 'contact' | 'canvas' | 'whiteboard' | 'project-pages';

export interface PortfolioData {
  about: {
    name: string;
    title: string;
    description: string;
    image?: string;
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    tech: string[];
    image?: string;
    link?: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
  }>;
  skills: Array<{
    name: string;
    level: number;
    category: string;
  }>;
  contact: {
    email: string;
    phone?: string;
    social: Array<{
      platform: string;
      url: string;
    }>;
  };
}

const PortfolioBuilder = () => {
  const [activeSection, setActiveSection] = useState<PortfolioSection>('about');
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    about: {
      name: "Your Name",
      title: "Your Title",
      description: "Write a compelling description about yourself...",
    },
    projects: [
      {
        id: "1",
        title: "Sample Project",
        description: "Describe your amazing project here...",
        tech: ["React", "TypeScript", "Tailwind"],
      }
    ],
    experience: [],
    skills: [],
    contact: {
      email: "your.email@example.com",
      social: []
    }
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [canvasItems, setCanvasItems] = useState<DraggableItem[]>([]);
  const [whiteboardElements, setWhiteboardElements] = useState<any[]>([]);
  const [currentProject, setCurrentProject] = useState<any>(null);

  return (
    <ThemeProvider>
      <div className="min-h-screen relative" style={{ background: 'var(--gradient-bg)' }}>
        {/* Temporarily disabled problematic components */}
        {/* <DoodleOverlay />
        <EasterEggManager /> */}
        
        <TopBar 
          isPreviewMode={isPreviewMode}
          onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
        />
        
        {/* Canva-style formatting toolbar */}
        {!isPreviewMode && <CanvaToolbar />}
        
        <div className={`flex ${isPreviewMode ? 'h-[calc(100vh-3.5rem)]' : 'h-[calc(100vh-7.5rem)]'}`}>
          {/* Left Sidebar - Portfolio Sections */}
          {!isPreviewMode && (
            <EnhancedSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              isPreviewMode={isPreviewMode}
              onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
            />
          )}

          {/* Main Canvas - Full width when in preview mode */}
          <div className="flex-1">
            {activeSection === 'canvas' ? (
              <DragDropCanvas
                items={canvasItems}
                onItemsChange={setCanvasItems}
                isPreviewMode={isPreviewMode}
              />
            ) : activeSection === 'whiteboard' ? (
              <WhiteboardCanvas
                elements={whiteboardElements}
                onElementsChange={setWhiteboardElements}
                isPreviewMode={isPreviewMode}
              />
            ) : activeSection === 'project-pages' && currentProject ? (
              <ProjectPages
                project={currentProject}
                onProjectUpdate={setCurrentProject}
                isPreviewMode={isPreviewMode}
              />
                               ) : (
                     <PortfolioCanvas
                       activeSection={activeSection}
                       portfolioData={portfolioData}
                       isPreviewMode={isPreviewMode}
                     />
                   )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default PortfolioBuilder;