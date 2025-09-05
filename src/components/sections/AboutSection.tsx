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
    <div className="w-full h-full bg-white flex items-center justify-center">
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-16 p-16 max-w-none">
        <Avatar className="w-64 h-64 flex-shrink-0">
          <AvatarImage src={data.image} />
          <AvatarFallback className="bg-purple-600 text-white text-6xl">
            {data.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left" style={{ fontFamily: textStyle.fontFamily }}>
          <h1 className="text-8xl font-bold text-gray-900 mb-6" style={{ fontSize: textStyle.fontSizePx + 32, textAlign: textStyle.align as any, color: textStyle.color }}>{data.name}</h1>
          <h2 className="text-4xl text-purple-600 mb-8" style={{ fontSize: textStyle.fontSizePx + 12, textAlign: textStyle.align as any }}>{data.title}</h2>
          <p className="text-gray-600 leading-relaxed text-2xl max-w-4xl" style={{ fontSize: textStyle.fontSizePx + 8, textAlign: textStyle.align as any, color: textStyle.color }}>{data.description}</p>
        </div>
      </div>
    </div>
  );
};