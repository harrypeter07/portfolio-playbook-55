import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Github,
  ImageIcon
} from "lucide-react";
import { useEditor } from "@/components/editor/EditorContext";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  link?: string;
}

interface ProjectsSectionProps {
  data: Project[];
  isPreviewMode: boolean;
}

export const ProjectsSection = ({ data, isPreviewMode }: ProjectsSectionProps) => {
  const { textStyle } = useEditor();
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center p-20">
        {/* Project Image/Icon */}
        {data[0]?.image && (
          <div className="w-full h-1/3 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center mb-16 rounded-2xl shadow-2xl">
            <ImageIcon className="w-40 h-40 text-gray-500" />
          </div>
        )}
        
        {/* Project Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-7xl" style={{ fontFamily: textStyle.fontFamily }}>
          {/* Project Title */}
          <div className="mb-12">
            <h1 className="text-9xl font-black text-gray-900 mb-8 leading-tight" style={{ 
              fontSize: textStyle.fontSizePx + 40, 
              color: textStyle.color, 
              textAlign: textStyle.align as any 
            }}>
              {data[0]?.title || "Featured Project"}
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
          </div>
          
          {/* Project Description */}
          <div className="mb-16">
            <p className="text-4xl text-gray-700 leading-relaxed max-w-6xl font-medium" style={{ 
              fontSize: textStyle.fontSizePx + 16, 
              textAlign: textStyle.align as any, 
              color: textStyle.color 
            }}>
              {data[0]?.description || "A showcase of my latest work and technical expertise. This project demonstrates my skills in modern web development and showcases innovative solutions to complex problems."}
            </p>
          </div>
          
          {/* Technology Stack */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-800 mb-8" style={{ 
              fontSize: textStyle.fontSizePx + 8, 
              color: textStyle.color 
            }}>
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-8 justify-center">
              {(data[0]?.tech || ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe"]).map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="text-2xl bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-12 max-w-4xl w-full">
            {data[0]?.link && (
              <Button 
                variant="default" 
                size="lg" 
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-2xl py-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="w-10 h-10 mr-4" />
                View Live Demo
              </Button>
            )}
            <Button 
              variant="outline" 
              size="lg" 
              className="flex-1 text-2xl py-8 border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Github className="w-10 h-10 mr-4" />
              View Source Code
            </Button>
          </div>
          
          {/* Project Stats */}
          <div className="mt-16 grid grid-cols-3 gap-12 max-w-4xl">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-2">100%</div>
              <div className="text-xl text-gray-600">Performance</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-2">5+</div>
              <div className="text-xl text-gray-600">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-2">2024</div>
              <div className="text-xl text-gray-600">Year Built</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};