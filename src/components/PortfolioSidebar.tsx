import { PortfolioSection, PortfolioData } from "./PortfolioBuilder";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Mail, 
  Plus,
  Search,
  Grid3X3,
  Type,
  Image as ImageIcon,
  Shapes
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface PortfolioSidebarProps {
  activeSection: PortfolioSection;
  onSectionChange: (section: PortfolioSection) => void;
  portfolioData: PortfolioData;
}

const sectionConfig = {
  about: { 
    icon: User, 
    label: "About", 
    color: "bg-blue-500",
    description: "Personal info" 
  },
  projects: { 
    icon: Code, 
    label: "Projects", 
    color: "bg-green-500",
    description: "Your work" 
  },
  experience: { 
    icon: Briefcase, 
    label: "Experience", 
    color: "bg-purple-500",
    description: "Work history" 
  },
  skills: { 
    icon: GraduationCap, 
    label: "Skills", 
    color: "bg-orange-500",
    description: "Abilities" 
  },
  contact: { 
    icon: Mail, 
    label: "Contact", 
    color: "bg-red-500",
    description: "Get in touch" 
  },
};

export const PortfolioSidebar = ({
  activeSection,
  onSectionChange,
  portfolioData,
}: PortfolioSidebarProps) => {
  return (
    <aside className="w-full bg-white border-r border-gray-200 h-full overflow-y-auto">
      {/* Search */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search sections..."
            className="pl-10 h-9 text-sm border-gray-200 focus:border-purple-300"
          />
        </div>
      </div>

      {/* Design Elements */}
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Design</h3>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <Button 
            variant="ghost" 
            className="h-12 flex flex-col items-center gap-1 hover:bg-gray-50 text-gray-600"
            onClick={() => console.log('Add text element')}
          >
            <Type className="w-5 h-5" />
            <span className="text-xs">Text</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-12 flex flex-col items-center gap-1 hover:bg-gray-50 text-gray-600"
            onClick={() => console.log('Add image element')}
          >
            <ImageIcon className="w-5 h-5" />
            <span className="text-xs">Image</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-12 flex flex-col items-center gap-1 hover:bg-gray-50 text-gray-600"
            onClick={() => console.log('Add shape element')}
          >
            <Shapes className="w-5 h-5" />
            <span className="text-xs">Shapes</span>
          </Button>
          <Button 
            variant="ghost" 
            className="h-12 flex flex-col items-center gap-1 hover:bg-gray-50 text-gray-600"
            onClick={() => console.log('Add layout element')}
          >
            <Grid3X3 className="w-5 h-5" />
            <span className="text-xs">Layout</span>
          </Button>
        </div>
      </div>

      {/* Portfolio Sections */}
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Portfolio Sections</h3>
        <div className="space-y-1">
          {(Object.keys(sectionConfig) as PortfolioSection[]).map((section) => {
            const config = sectionConfig[section];
            const Icon = config.icon;
            const isActive = activeSection === section;
            
            return (
              <Button
                key={section}
                variant="ghost"
                onClick={() => onSectionChange(section)}
                className={`w-full justify-start h-10 px-3 rounded-lg text-left transition-colors ${
                  isActive 
                    ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    isActive ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-3 h-3 ${
                      isActive ? 'text-purple-600' : 'text-gray-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{config.label}</div>
                    <div className="text-xs text-gray-500">{config.description}</div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Quick Add */}
      <div className="p-4 border-t border-gray-100 mt-4">
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white h-9 text-sm"
          onClick={() => console.log('Add new section')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Section
        </Button>
      </div>
    </aside>
  );
};