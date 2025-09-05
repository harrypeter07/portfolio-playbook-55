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
    <div className="w-full h-full bg-white">
      <div className="h-full flex items-center justify-center p-12">
        <div className="w-full max-w-5xl h-full flex flex-col">
          {data[0]?.image && (
            <div className="h-1/2 bg-gray-100 flex items-center justify-center mb-8 rounded-lg">
              <ImageIcon className="w-24 h-24 text-gray-400" />
            </div>
          )}
          <div className="flex-1 flex flex-col justify-center" style={{ fontFamily: textStyle.fontFamily }}>
            <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontSize: textStyle.fontSizePx + 20, color: textStyle.color, textAlign: textStyle.align as any }}>
              {data[0]?.title || "Featured Project"}
            </h1>
            <p className="text-2xl text-gray-600 mb-8 leading-relaxed" style={{ fontSize: textStyle.fontSizePx + 6, textAlign: textStyle.align as any, color: textStyle.color }}>
              {data[0]?.description || "A showcase of my latest work and technical expertise."}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              {(data[0]?.tech || ["React", "TypeScript", "Node.js"]).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-lg bg-purple-100 text-purple-700 px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex gap-6">
              {data[0]?.link && (
                <Button variant="default" size="lg" className="flex-1 bg-purple-600 hover:bg-purple-700 text-lg py-4">
                  <ExternalLink className="w-6 h-6 mr-3" />
                  View Live Demo
                </Button>
              )}
              <Button variant="outline" size="lg" className="flex-1 text-lg py-4">
                <Github className="w-6 h-6 mr-3" />
                View Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};