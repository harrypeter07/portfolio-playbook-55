import { useState } from "react";
import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { PortfolioCanvas } from "@/components/PortfolioCanvas";
import { TopBar } from "@/components/TopBar";
import { CanvaToolbar } from "@/components/CanvaToolbar";

export type PortfolioSection = 'about' | 'projects' | 'experience' | 'skills' | 'contact';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        isPreviewMode={isPreviewMode}
        onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
      />
      
      {/* Canva-style formatting toolbar */}
      {!isPreviewMode && <CanvaToolbar />}
      
      <div className={`flex ${isPreviewMode ? 'h-[calc(100vh-3.5rem)]' : 'h-[calc(100vh-7.5rem)]'}`}>
        {/* Left Sidebar - Portfolio Sections */}
        {!isPreviewMode && (
          <PortfolioSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            portfolioData={portfolioData}
          />
        )}

        {/* Main Canvas - Full width when in preview mode */}
        <PortfolioCanvas
          activeSection={activeSection}
          portfolioData={portfolioData}
          onDataChange={setPortfolioData}
          isPreviewMode={isPreviewMode}
        />
      </div>
    </div>
  );
};

export default PortfolioBuilder;