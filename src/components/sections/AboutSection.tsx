import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEditor } from "@/components/editor/EditorContext";

interface AboutData {
  name: string;
  title: string;
  description: string;
  image?: string;
}

interface AboutSectionProps {
  data: AboutData;
  isPreviewMode: boolean;
}

export const AboutSection = ({ data, isPreviewMode }: AboutSectionProps) => {
  const { textStyle } = useEditor();

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-20 p-20">
        {/* Avatar Section */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <Avatar className="w-80 h-80 mb-8 shadow-2xl ring-8 ring-white/50">
            <AvatarImage src={data.image} />
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-8xl font-bold">
              {data.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto"></div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="flex-1 text-center lg:text-left max-w-5xl" style={{ fontFamily: textStyle.fontFamily }}>
          <div className="mb-8">
            <h1 className="text-[12rem] font-black text-gray-900 mb-12 leading-tight" style={{ 
              fontSize: textStyle.fontSizePx + 60, 
              color: textStyle.color, 
              textAlign: textStyle.align as any 
            }}>
              {data.name}
            </h1>
            <div className="inline-block">
              <h2 className="text-8xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-12" style={{ 
                fontSize: textStyle.fontSizePx + 32, 
                textAlign: textStyle.align as any 
              }}>
                {data.title}
              </h2>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-5xl font-medium" style={{ 
              fontSize: textStyle.fontSizePx + 24, 
              textAlign: textStyle.align as any, 
              color: textStyle.color 
            }}>
              {data.description}
            </p>
            
            <div className="mt-16 space-y-6">
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border-2 border-purple-200">
                  <span className="text-3xl font-bold text-gray-800">5+ Years Experience</span>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border-2 border-blue-200">
                  <span className="text-3xl font-bold text-gray-800">Full Stack Developer</span>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border-2 border-pink-200">
                  <span className="text-3xl font-bold text-gray-800">UI/UX Designer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};