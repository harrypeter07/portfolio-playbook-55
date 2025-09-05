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
    <div className="w-full h-full bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center p-20">
        <div className="w-full max-w-7xl h-full flex flex-col justify-center">
          {/* Single Experience Display */}
          {data[0] && (
            <div className="w-full">
              {/* Header */}
              <div className="text-center mb-16" style={{ fontFamily: textStyle.fontFamily }}>
                <h1 className="text-[10rem] font-black text-gray-900 mb-12" style={{ 
                  fontSize: textStyle.fontSizePx + 48, 
                  color: textStyle.color, 
                  textAlign: textStyle.align as any 
                }}>
                  Work Experience
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto"></div>
              </div>

              {/* Experience Card */}
              <Card className="p-16 bg-gradient-to-br from-white to-gray-50 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                  {/* Company Logo/Icon */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl">
                      <Building className="w-16 h-16" />
                    </div>
                    <div className="mt-6 text-center">
                      <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1" style={{ fontFamily: textStyle.fontFamily }}>
                    {/* Role and Company */}
                    <div className="mb-8">
                      <h2 className="text-8xl font-black text-gray-900 mb-6" style={{ 
                        fontSize: textStyle.fontSizePx + 40, 
                        color: textStyle.color 
                      }}>
                        {data[0].role}
                      </h2>
                      <div className="flex items-center gap-6 mb-8">
                        <Building className="w-12 h-12 text-green-600" />
                        <span className="text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent" style={{ 
                          fontSize: textStyle.fontSizePx + 24 
                        }}>
                          {data[0].company}
                        </span>
                      </div>
                    </div>
                    
                    {/* Period and Location */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                      <div className="flex items-center gap-6 mb-6 lg:mb-0">
                        <Calendar className="w-12 h-12 text-gray-500" />
                        <span className="text-4xl font-bold text-gray-700" style={{ 
                          fontSize: textStyle.fontSizePx + 16 
                        }}>
                          {data[0].period}
                        </span>
                      </div>
                      {data[0].location && (
                        <div className="flex items-center gap-6">
                          <MapPin className="w-12 h-12 text-gray-500" />
                          <span className="text-4xl font-bold text-gray-700" style={{ 
                            fontSize: textStyle.fontSizePx + 16 
                          }}>
                            {data[0].location}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Description */}
                    <div className="mb-8">
                      <p className="text-5xl text-gray-700 leading-relaxed font-medium" style={{ 
                        fontSize: textStyle.fontSizePx + 24, 
                        textAlign: textStyle.align as any, 
                        color: textStyle.color 
                      }}>
                        {data[0].description}
                      </p>
                    </div>
                    
                    {/* Job Type */}
                    {data[0].type && (
                      <div className="mb-8">
                        <Badge variant="secondary" className="text-4xl bg-gradient-to-r from-green-100 to-blue-100 text-gray-800 px-12 py-6 shadow-2xl border-2 border-green-200">
                          {data[0].type}
                        </Badge>
                      </div>
                    )}

                    {/* Key Achievements */}
                    <div className="mt-12">
                      <h3 className="text-5xl font-bold text-gray-800 mb-10" style={{ 
                        fontSize: textStyle.fontSizePx + 20, 
                        color: textStyle.color 
                      }}>
                        Key Achievements
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-green-100 to-blue-100 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-green-200">
                          <div className="text-5xl font-black text-gray-800 mb-4">1M+</div>
                          <div className="text-3xl text-gray-600 font-semibold">Users Served</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-blue-200">
                          <div className="text-5xl font-black text-gray-800 mb-4">50+</div>
                          <div className="text-3xl text-gray-600 font-semibold">Projects Delivered</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-purple-200">
                          <div className="text-5xl font-black text-gray-800 mb-4">99.9%</div>
                          <div className="text-3xl text-gray-600 font-semibold">Uptime</div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-100 to-green-100 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-pink-200">
                          <div className="text-5xl font-black text-gray-800 mb-4">5+</div>
                          <div className="text-3xl text-gray-600 font-semibold">Team Members Led</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
