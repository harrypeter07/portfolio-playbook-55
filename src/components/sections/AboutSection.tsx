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
    <div className="w-full h-full bg-white">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 h-full p-12">
        <Avatar className="w-48 h-48">
          <AvatarImage src={data.image} />
          <AvatarFallback className="bg-purple-600 text-white text-4xl">
            {data.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left max-w-3xl" style={{ fontFamily: textStyle.fontFamily }}>
          <h1 className="text-6xl font-bold text-gray-900 mb-4" style={{ fontSize: textStyle.fontSizePx + 24, textAlign: textStyle.align as any, color: textStyle.color }}>{data.name}</h1>
          <h2 className="text-3xl text-purple-600 mb-6" style={{ fontSize: textStyle.fontSizePx + 8, textAlign: textStyle.align as any }}>{data.title}</h2>
          <p className="text-gray-600 leading-relaxed text-xl" style={{ fontSize: textStyle.fontSizePx + 4, textAlign: textStyle.align as any, color: textStyle.color }}>{data.description}</p>
        </div>
      </div>
    </div>
  );
};