/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  FileText, 
  Play, 
  Clock, 
  Grid, 
  Maximize2, 
  HelpCircle, 
  Plus 
} from "lucide-react";
import { EditorProvider } from "@/components/editor/EditorContext";

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
  const [currentPage, setCurrentPage] = useState<'P1' | 'P2'>('P1');
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    about: {
      name: "John Doe",
      title: "Full Stack Developer & UI/UX Designer",
      description: "Passionate full-stack developer with 5+ years of experience creating beautiful, functional web applications. I specialize in React, Node.js, and modern web technologies.",
    },
    projects: [
      {
        id: "1",
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
        tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      },
      {
        id: "2",
        title: "Task Management App",
        description: "Collaborative task management tool with real-time updates",
        tech: ["React", "Socket.io", "MongoDB", "Express"],
      },
      {
        id: "3",
        title: "Portfolio Website",
        description: "Personal portfolio website with custom animations and responsive design",
        tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      }
    ],
    experience: [
      {
        id: "1",
        company: "Tech Corp",
        role: "Senior Frontend Developer",
        period: "2022 - Present",
        description: "Led frontend development for multiple high-traffic applications serving 1M+ users."
      },
      {
        id: "2",
        company: "StartupXYZ",
        role: "Full Stack Developer",
        period: "2020 - 2022",
        description: "Built and maintained full-stack applications using React, Node.js, and PostgreSQL."
      }
    ],
    skills: [
      { name: "React", level: 90, category: "Frontend" },
      { name: "TypeScript", level: 85, category: "Frontend" },
      { name: "Node.js", level: 80, category: "Backend" },
      { name: "Python", level: 75, category: "Backend" }
    ],
    contact: {
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      social: [
        { platform: "GitHub", url: "github.com/johndoe" },
        { platform: "LinkedIn", url: "linkedin.com/in/johndoe" }
      ]
    }
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [canvasItems, setCanvasItems] = useState<DraggableItem[]>([]);
  const [whiteboardElements, setWhiteboardElements] = useState<any[]>([]);
  const [currentProject, setCurrentProject] = useState<any>(null);

  return (
    <ThemeProvider>
      <EditorProvider>
      <div className="min-h-screen relative bg-gray-100">
        <TopBar 
          isPreviewMode={isPreviewMode}
          onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
        />
        
        {/* Canva-style formatting toolbar */}
        {!isPreviewMode && <CanvaToolbar />}
        
        <div className={`flex ${isPreviewMode ? 'h-[calc(100vh-6.5rem)]' : 'h-[calc(100vh-10.5rem)]'}`}>
          {/* Left Sidebar - Portfolio Sections */}
          {!isPreviewMode && (
            <EnhancedSidebar
              activeSection={activeSection}
              onSectionChange={(section: string) => setActiveSection(section as PortfolioSection)}
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
      </EditorProvider>
    </ThemeProvider>
  );
};

export default PortfolioBuilder;