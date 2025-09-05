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
  const [currentPage, setCurrentPage] = useState<'P1' | 'P2'>('P1');

  return (
    <ThemeProvider>
      <CanvaInterface 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
        <PortfolioContent page={currentPage} />
      </CanvaInterface>
    </ThemeProvider>
  );
};

export default PortfolioBuilder;