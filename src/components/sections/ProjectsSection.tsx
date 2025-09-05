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
    <div className="w-full h-full bg-white flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center p-16">
        {data[0]?.image && (
          <div className="w-full h-1/3 bg-gray-100 flex items-center justify-center mb-12 rounded-xl">
            <ImageIcon className="w-32 h-32 text-gray-400" />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-6xl" style={{ fontFamily: textStyle.fontFamily }}>
          <h1 className="text-7xl font-bold text-gray-900 mb-8" style={{ fontSize: textStyle.fontSizePx + 28, color: textStyle.color, textAlign: textStyle.align as any }}>
            {data[0]?.title || "Featured Project"}
          </h1>
          <p className="text-3xl text-gray-600 mb-12 leading-relaxed max-w-5xl" style={{ fontSize: textStyle.fontSizePx + 10, textAlign: textStyle.align as any, color: textStyle.color }}>
            {data[0]?.description || "A showcase of my latest work and technical expertise."}
          </p>
          
          <div className="flex flex-wrap gap-6 mb-16 justify-center">
            {(data[0]?.tech || ["React", "TypeScript", "Node.js"]).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xl bg-purple-100 text-purple-700 px-6 py-3">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-8 max-w-2xl w-full">
            {data[0]?.link && (
              <Button variant="default" size="lg" className="flex-1 bg-purple-600 hover:bg-purple-700 text-xl py-6">
                <ExternalLink className="w-8 h-8 mr-4" />
                View Live Demo
              </Button>
            )}
            <Button variant="outline" size="lg" className="flex-1 text-xl py-6">
              <Github className="w-8 h-8 mr-4" />
              View Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};