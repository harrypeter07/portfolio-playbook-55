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
    <div className="w-full h-full p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((project) => (
            <Card key={project.id} className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
              {project.image && (
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="p-6" style={{ fontFamily: textStyle.fontFamily }}>
                <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontSize: textStyle.fontSizePx + 2, color: textStyle.color }}>{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed" style={{ fontSize: textStyle.fontSizePx }}>{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2">
                  {project.link && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};