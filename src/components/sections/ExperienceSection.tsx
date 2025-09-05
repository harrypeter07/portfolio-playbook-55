import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEditor } from "@/components/editor/EditorContext";
import { Calendar, MapPin, Building } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  location?: string;
  type?: string;
}

interface ExperienceSectionProps {
  data: Experience[];
  isPreviewMode: boolean;
}

export const ExperienceSection = ({ data, isPreviewMode }: ExperienceSectionProps) => {
  const { textStyle } = useEditor();

  return (
    <div className="w-full h-full bg-white flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center p-16">
        <div className="w-full max-w-6xl h-full flex flex-col justify-center">
          {/* Header */}
          <div className="text-center mb-16" style={{ fontFamily: textStyle.fontFamily }}>
            <h1 className="text-7xl font-bold text-gray-900 mb-6" style={{ 
              fontSize: textStyle.fontSizePx + 28, 
              color: textStyle.color, 
              textAlign: textStyle.align as any 
            }}>
              Work Experience
            </h1>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto" style={{ 
              fontSize: textStyle.fontSizePx + 8, 
              textAlign: textStyle.align as any, 
              color: textStyle.color 
            }}>
              My professional journey and career milestones
            </p>
          </div>

          {/* Experience Cards */}
          <div className="space-y-8">
            {data.map((exp, index) => (
              <Card key={exp.id} className="p-12 bg-gradient-to-r from-purple-50 to-blue-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                    <div className="w-1 h-24 bg-gradient-to-b from-purple-600 to-blue-600 mt-4"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1" style={{ fontFamily: textStyle.fontFamily }}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-2" style={{ 
                          fontSize: textStyle.fontSizePx + 16, 
                          color: textStyle.color 
                        }}>
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Building className="w-6 h-6 text-purple-600" />
                          <span className="text-2xl font-semibold text-purple-600" style={{ 
                            fontSize: textStyle.fontSizePx + 6 
                          }}>
                            {exp.company}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col lg:items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <span className="text-lg text-gray-600" style={{ 
                            fontSize: textStyle.fontSizePx + 2 
                          }}>
                            {exp.period}
                          </span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-gray-500" />
                            <span className="text-lg text-gray-600" style={{ 
                              fontSize: textStyle.fontSizePx + 2 
                            }}>
                              {exp.location}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xl text-gray-700 leading-relaxed" style={{ 
                      fontSize: textStyle.fontSizePx + 4, 
                      textAlign: textStyle.align as any, 
                      color: textStyle.color 
                    }}>
                      {exp.description}
                    </p>
                    
                    {exp.type && (
                      <div className="mt-4">
                        <Badge variant="secondary" className="text-lg bg-purple-100 text-purple-700 px-4 py-2">
                          {exp.type}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
