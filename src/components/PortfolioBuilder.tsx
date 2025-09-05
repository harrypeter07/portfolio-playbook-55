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
        description: "A comprehensive full-stack e-commerce solution built with modern technologies. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard. The platform handles thousands of concurrent users with optimized performance and security.",
        tech: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis", "Docker"],
        link: "https://ecommerce-demo.com"
      },
      {
        id: "2",
        title: "Task Management App",
        description: "A collaborative project management tool with real-time updates, team collaboration features, file sharing, deadline tracking, and progress monitoring. Built with real-time synchronization using WebSockets and includes mobile-responsive design for seamless cross-platform experience.",
        tech: ["React", "Socket.io", "MongoDB", "Express", "JWT", "AWS S3"],
        link: "https://taskmanager-demo.com"
      },
      {
        id: "3",
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website showcasing professional work with custom animations, interactive elements, and smooth transitions. Features include dark/light mode, contact forms, project galleries, and SEO optimization for better search engine visibility.",
        tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"],
        link: "https://portfolio-demo.com"
      },
      {
        id: "4",
        title: "Social Media Dashboard",
        description: "A comprehensive social media management dashboard that allows users to manage multiple social media accounts, schedule posts, analyze engagement metrics, and track performance across different platforms. Includes AI-powered content suggestions and automated posting.",
        tech: ["Vue.js", "Python", "Django", "PostgreSQL", "Chart.js", "AI/ML"],
        link: "https://social-dashboard.com"
      },
      {
        id: "5",
        title: "Healthcare Management System",
        description: "A secure healthcare management system for hospitals and clinics. Features include patient records management, appointment scheduling, medical history tracking, prescription management, and integration with medical devices. Built with HIPAA compliance and advanced security measures.",
        tech: ["Angular", "Spring Boot", "MySQL", "Redis", "Microservices", "Docker"],
        link: "https://healthcare-system.com"
      },
      {
        id: "6",
        title: "AI-Powered Chatbot",
        description: "An intelligent chatbot system powered by machine learning and natural language processing. Provides customer support, answers queries, processes orders, and integrates with various business systems. Features include sentiment analysis, multi-language support, and continuous learning capabilities.",
        tech: ["Python", "TensorFlow", "FastAPI", "MongoDB", "NLP", "OpenAI API"],
        link: "https://ai-chatbot.com"
      }
    ],
    experience: [
      {
        id: "1",
        company: "Tech Corp",
        role: "Senior Frontend Developer",
        period: "2022 - Present",
        description: "Led frontend development for multiple high-traffic applications serving 1M+ users. Implemented modern React patterns, optimized performance, and mentored junior developers. Architected scalable component libraries and established coding standards. Reduced page load times by 40% through performance optimization and implemented advanced state management solutions.",
        location: "San Francisco, CA",
        type: "Full-time"
      },
      {
        id: "2",
        company: "StartupXYZ",
        role: "Full Stack Developer",
        period: "2020 - 2022",
        description: "Built and maintained full-stack applications using React, Node.js, and PostgreSQL. Collaborated with cross-functional teams to deliver scalable solutions. Developed RESTful APIs, implemented authentication systems, and integrated third-party services. Led the migration from monolithic to microservices architecture, improving system reliability by 60%.",
        location: "Remote",
        type: "Full-time"
      },
      {
        id: "3",
        company: "Digital Agency",
        role: "Frontend Developer",
        period: "2019 - 2020",
        description: "Developed responsive websites and web applications for various clients. Worked with modern JavaScript frameworks and CSS preprocessors. Created pixel-perfect designs from Figma mockups and implemented interactive animations. Delivered 20+ client projects on time and within budget, maintaining 95% client satisfaction rate.",
        location: "New York, NY",
        type: "Full-time"
      },
      {
        id: "4",
        company: "Innovation Labs",
        role: "Junior Developer",
        period: "2018 - 2019",
        description: "Started career as a junior developer working on internal tools and client projects. Gained experience with HTML, CSS, JavaScript, and various frameworks. Participated in code reviews, learned best practices, and contributed to team projects. Built first production application serving 10,000+ users.",
        location: "Austin, TX",
        type: "Full-time"
      },
      {
        id: "5",
        company: "Freelance",
        role: "Web Developer",
        period: "2017 - 2018",
        description: "Worked as a freelance web developer building websites for small businesses and startups. Specialized in WordPress development, e-commerce solutions, and custom web applications. Managed client relationships, project timelines, and delivered high-quality solutions. Completed 15+ successful projects with 100% client satisfaction.",
        location: "Remote",
        type: "Freelance"
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