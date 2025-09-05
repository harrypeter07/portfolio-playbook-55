import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEditor } from "@/components/editor/EditorContext";
import { Code, Palette, Database, Globe, Cpu, Zap } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillsSectionProps {
  data: Skill[];
  isPreviewMode: boolean;
}

const categoryIcons = {
  Frontend: Palette,
  Backend: Database,
  Database: Database,
  Mobile: Globe,
  DevOps: Cpu,
  Tools: Zap,
  Design: Palette,
  Other: Code
};

const categoryColors = {
  Frontend: "from-blue-500 to-cyan-500",
  Backend: "from-green-500 to-emerald-500",
  Database: "from-orange-500 to-yellow-500",
  Mobile: "from-purple-500 to-pink-500",
  DevOps: "from-red-500 to-rose-500",
  Tools: "from-indigo-500 to-blue-500",
  Design: "from-pink-500 to-rose-500",
  Other: "from-gray-500 to-slate-500"
};

export const SkillsSection = ({ data, isPreviewMode }: SkillsSectionProps) => {
  const { textStyle } = useEditor();

  // Group skills by category
  const skillsByCategory = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="w-full h-full bg-white flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center p-16">
        <div className="w-full max-w-7xl h-full flex flex-col justify-center">
          {/* Header */}
          <div className="text-center mb-16" style={{ fontFamily: textStyle.fontFamily }}>
            <h1 className="text-7xl font-bold text-gray-900 mb-6" style={{ 
              fontSize: textStyle.fontSizePx + 28, 
              color: textStyle.color, 
              textAlign: textStyle.align as any 
            }}>
              Skills & Expertise
            </h1>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto" style={{ 
              fontSize: textStyle.fontSizePx + 8, 
              textAlign: textStyle.align as any, 
              color: textStyle.color 
            }}>
              Technologies and tools I work with
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(skillsByCategory).map(([category, skills]) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Code;
              const colorClass = categoryColors[category as keyof typeof categoryColors] || "from-gray-500 to-slate-500";
              
              return (
                <Card key={category} className="p-8 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900" style={{ 
                        fontSize: textStyle.fontSizePx + 12, 
                        color: textStyle.color 
                      }}>
                        {category}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-medium text-gray-700" style={{ 
                            fontSize: textStyle.fontSizePx + 2, 
                            color: textStyle.color 
                          }}>
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-500" style={{ 
                            fontSize: textStyle.fontSizePx 
                          }}>
                            {skill.level}%
                          </span>
                        </div>
                        <Progress 
                          value={skill.level} 
                          className="h-3 bg-gray-200"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Additional Skills */}
          <div className="mt-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-8" style={{ 
              fontSize: textStyle.fontSizePx + 12, 
              color: textStyle.color 
            }}>
              Additional Skills
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {["Git", "Docker", "AWS", "Figma", "Photoshop", "Agile", "Scrum", "Leadership"].map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="text-lg bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-3 hover:scale-105 transition-transform"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
