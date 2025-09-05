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
      <div className="max-w-4xl mx-auto h-full flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
          {data[0]?.image && (
            <div className="h-64 bg-gray-100 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-gray-400" />
            </div>
          )}
          <div className="p-8" style={{ fontFamily: textStyle.fontFamily }}>
            <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontSize: textStyle.fontSizePx + 12, color: textStyle.color, textAlign: textStyle.align as any }}>
              {data[0]?.title || "Featured Project"}
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed" style={{ fontSize: textStyle.fontSizePx + 2, textAlign: textStyle.align as any, color: textStyle.color }}>
              {data[0]?.description || "A showcase of my latest work and technical expertise."}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {(data[0]?.tech || ["React", "TypeScript", "Node.js"]).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm bg-purple-100 text-purple-700 px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4">
              {data[0]?.link && (
                <Button variant="default" size="lg" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Live Demo
                </Button>
              )}
              <Button variant="outline" size="lg" className="flex-1">
                <Github className="w-5 h-5 mr-2" />
                View Code
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};