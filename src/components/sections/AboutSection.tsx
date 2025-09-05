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
    <div className="w-full h-full p-8 bg-white">
      <div className="flex flex-col md:flex-row items-center gap-8 h-full">
        <Avatar className="w-32 h-32">
          <AvatarImage src={data.image} />
          <AvatarFallback className="bg-purple-600 text-white text-2xl">
            {data.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left" style={{ fontFamily: textStyle.fontFamily }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontSize: textStyle.fontSizePx + 8, textAlign: textStyle.align as any, color: textStyle.color }}>{data.name}</h1>
          <h2 className="text-xl text-purple-600 mb-4" style={{ textAlign: textStyle.align as any }}>{data.title}</h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: textStyle.fontSizePx, textAlign: textStyle.align as any, color: textStyle.color }}>{data.description}</p>
        </div>
      </div>
    </div>
  );
};