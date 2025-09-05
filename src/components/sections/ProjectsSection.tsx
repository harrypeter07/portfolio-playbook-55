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
            <h1 className="text-[12rem] font-black text-gray-900 mb-12 leading-tight" style={{ 
              fontSize: textStyle.fontSizePx + 60, 
              color: textStyle.color, 
              textAlign: textStyle.align as any 
            }}>
              {data[0]?.title || "Featured Project"}
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
          </div>
          
          {/* Project Description */}
          <div className="mb-16">
            <p className="text-6xl text-gray-700 leading-relaxed max-w-7xl font-medium" style={{ 
              fontSize: textStyle.fontSizePx + 32, 
              textAlign: textStyle.align as any, 
              color: textStyle.color 
            }}>
              {data[0]?.description || "A showcase of my latest work and technical expertise. This project demonstrates my skills in modern web development and showcases innovative solutions to complex problems."}
            </p>
          </div>
          
          {/* Technology Stack */}
          <div className="mb-20">
            <h3 className="text-5xl font-bold text-gray-800 mb-12" style={{ 
              fontSize: textStyle.fontSizePx + 20, 
              color: textStyle.color 
            }}>
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-10 justify-center">
              {(data[0]?.tech || ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Redis", "Docker"]).map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="text-4xl bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 px-12 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border-2 border-blue-200"
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
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-4xl py-12 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="w-16 h-16 mr-6" />
                View Live Demo
              </Button>
            )}
            <Button 
              variant="outline" 
              size="lg" 
              className="flex-1 text-4xl py-12 border-4 border-gray-300 hover:border-purple-500 hover:bg-purple-50 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              <Github className="w-16 h-16 mr-6" />
              View Source Code
            </Button>
          </div>
          
          {/* Project Stats */}
          <div className="mt-20 grid grid-cols-3 gap-16 max-w-6xl">
            <div className="text-center bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl shadow-xl border-2 border-blue-200">
              <div className="text-6xl font-black text-gray-800 mb-4">100%</div>
              <div className="text-3xl text-gray-600 font-semibold">Performance</div>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl shadow-xl border-2 border-purple-200">
              <div className="text-6xl font-black text-gray-800 mb-4">7+</div>
              <div className="text-3xl text-gray-600 font-semibold">Technologies</div>
            </div>
            <div className="text-center bg-gradient-to-br from-pink-100 to-blue-100 p-8 rounded-2xl shadow-xl border-2 border-pink-200">
              <div className="text-6xl font-black text-gray-800 mb-4">2024</div>
              <div className="text-3xl text-gray-600 font-semibold">Year Built</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};