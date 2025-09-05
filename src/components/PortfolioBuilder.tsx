/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { PortfolioSidebar } from "@/components/PortfolioSidebar";
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
import { EditorProvider, useEditor } from "@/components/editor/EditorContext";

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
    location?: string;
    type?: string;
  }>;
  skills: Array<{
    name: string;
    level: number;
    category: string;
  }>;
  contact: {
    email: string;
    phone?: string;
    location?: string;
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
        description: "Led frontend development for multiple high-traffic applications serving 1M+ users. Implemented modern React patterns, optimized performance, and mentored junior developers.",
        location: "San Francisco, CA",
        type: "Full-time"
      },
      {
        id: "2",
        company: "StartupXYZ",
        role: "Full Stack Developer",
        period: "2020 - 2022",
        description: "Built and maintained full-stack applications using React, Node.js, and PostgreSQL. Collaborated with cross-functional teams to deliver scalable solutions.",
        location: "Remote",
        type: "Full-time"
      },
      {
        id: "3",
        company: "Digital Agency",
        role: "Frontend Developer",
        period: "2019 - 2020",
        description: "Developed responsive websites and web applications for various clients. Worked with modern JavaScript frameworks and CSS preprocessors.",
        location: "New York, NY",
        type: "Full-time"
      }
    ],
    skills: [
      { name: "React", level: 90, category: "Frontend" },
      { name: "TypeScript", level: 85, category: "Frontend" },
      { name: "JavaScript", level: 95, category: "Frontend" },
      { name: "HTML/CSS", level: 90, category: "Frontend" },
      { name: "Tailwind CSS", level: 85, category: "Frontend" },
      { name: "Node.js", level: 80, category: "Backend" },
      { name: "Python", level: 75, category: "Backend" },
      { name: "Express.js", level: 80, category: "Backend" },
      { name: "PostgreSQL", level: 70, category: "Database" },
      { name: "MongoDB", level: 75, category: "Database" },
      { name: "Git", level: 85, category: "Tools" },
      { name: "Docker", level: 70, category: "DevOps" },
      { name: "AWS", level: 65, category: "DevOps" },
      { name: "Figma", level: 80, category: "Design" }
    ],
    contact: {
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      social: [
        { platform: "GitHub", url: "https://github.com/johndoe" },
        { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
        { platform: "Twitter", url: "https://twitter.com/johndoe" },
        { platform: "Website", url: "https://johndoe.dev" }
      ]
    }
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [canvasItems, setCanvasItems] = useState<DraggableItem[]>([]);
  const [whiteboardElements, setWhiteboardElements] = useState<any[]>([]);
  const [currentProject, setCurrentProject] = useState<any>(null);

  // Access editor state to sync P1/P2 with sidebar selection
  const EditorSync: React.FC = () => {
    const { setCurrentPage, setActiveSection } = useEditor();
    return (
      <PortfolioSidebar
        activeSection={activeSection}
        onSectionChange={(section: PortfolioSection) => {
          if (['about','projects','experience','skills','contact'].includes(section)) {
            setActiveSection(section as any);
          }
          if (section === 'about') setCurrentPage(1);
          if (section === 'projects') setCurrentPage(1);
        }}
        portfolioData={portfolioData}
      />
    );
  };

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
          {/* Left Sidebar - Portfolio Sections - Fixed width, no collapsing */}
          {!isPreviewMode && (
            <div className="w-80 flex-shrink-0">
              <EditorSync />
            </div>
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