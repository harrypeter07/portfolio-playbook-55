import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  return (
    <div className="w-full h-full p-8">
      <div className="flex flex-col md:flex-row items-center gap-8 h-full">
        <Avatar className="w-32 h-32">
          <AvatarImage src={data.image} />
          <AvatarFallback className="bg-gradient-primary text-white text-2xl">
            {data.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-foreground mb-2">{data.name}</h1>
          <h2 className="text-xl text-primary mb-4">{data.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{data.description}</p>
        </div>
      </div>
    </div>
  );
};