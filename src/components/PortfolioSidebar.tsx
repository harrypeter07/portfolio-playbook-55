import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  FolderOpen, 
  Briefcase, 
  Award, 
  Mail,
  ChevronRight,
  Plus
} from "lucide-react";
import { PortfolioSection, PortfolioData } from "./PortfolioBuilder";

interface PortfolioSidebarProps {
  activeSection: PortfolioSection;
  onSectionChange: (section: PortfolioSection) => void;
  portfolioData: PortfolioData;
}

const sections = [
  {
    id: 'about' as PortfolioSection,
    label: 'About Me',
    icon: User,
    color: 'bg-gradient-primary',
    description: 'Personal information and bio'
  },
  {
    id: 'projects' as PortfolioSection,
    label: 'Projects',
    icon: FolderOpen,
    color: 'bg-gradient-accent',
    description: 'Showcase your work'
  },
  {
    id: 'experience' as PortfolioSection,
    label: 'Experience',
    icon: Briefcase,
    color: 'bg-purple-500',
    description: 'Work history and roles'
  },
  {
    id: 'skills' as PortfolioSection,
    label: 'Skills',
    icon: Award,
    color: 'bg-green-500',
    description: 'Technical and soft skills'
  },
  {
    id: 'contact' as PortfolioSection,
    label: 'Contact',
    icon: Mail,
    color: 'bg-blue-500',
    description: 'Get in touch information'
  }
];

export const PortfolioSidebar = ({ 
  activeSection, 
  onSectionChange, 
  portfolioData 
}: PortfolioSidebarProps) => {
  const getSectionCount = (sectionId: PortfolioSection) => {
    switch (sectionId) {
      case 'projects':
        return portfolioData.projects.length;
      case 'experience':
        return portfolioData.experience.length;
      case 'skills':
        return portfolioData.skills.length;
      default:
        return null;
    }
  };

  return (
    <aside className="w-80 bg-gradient-card border-r border-border/50 backdrop-blur-sm">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Portfolio Sections
          </h2>
          <p className="text-sm text-muted-foreground">
            Build your portfolio by selecting sections below
          </p>
        </div>

        <div className="space-y-3">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const count = getSectionCount(section.id);

            return (
              <Button
                key={section.id}
                variant="ghost"
                className={`w-full h-auto p-4 justify-start card-hover animate-fade-in ${
                  isActive 
                    ? 'bg-primary/10 border border-primary/20 glow-primary' 
                    : 'hover:bg-secondary/50'
                }`}
                onClick={() => onSectionChange(section.id)}
              >
                <div className="flex items-center w-full">
                  <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center mr-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">
                        {section.label}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {count !== null && (
                          <Badge variant="secondary" className="text-xs">
                            {count}
                          </Badge>
                        )}
                        <ChevronRight className={`w-4 h-4 transition-transform ${
                          isActive ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Quick Add Section */}
        <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-foreground">Quick Actions</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-accent/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Project
          </Button>
        </div>
      </div>
    </aside>
  );
};