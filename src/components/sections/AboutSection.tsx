import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Camera, Check, X } from "lucide-react";

interface AboutData {
  name: string;
  title: string;
  description: string;
  image?: string;
}

interface AboutSectionProps {
  data: AboutData;
  onChange: (data: AboutData) => void;
  isPreviewMode: boolean;
}

export const AboutSection = ({ data, onChange, isPreviewMode }: AboutSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(data);

  const handleSave = () => {
    onChange(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(data);
    setIsEditing(false);
  };

  if (isPreviewMode) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 bg-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-32 h-32">
              <AvatarImage src={data.image} />
              <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                {data.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.name}</h1>
              <h2 className="text-xl text-gray-600 mb-4">{data.title}</h2>
              <p className="text-gray-700 leading-relaxed">{data.description}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Edit Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">About Me Section</h3>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="card-hover">
            <Edit className="w-4 h-4 mr-2" />
            Edit Content
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} size="sm" className="bg-green-500 hover:bg-green-600">
              <Check className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Preview Card */}
      <Card className="p-8 bg-gradient-card card-hover animate-bounce-in">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="relative">
            <Avatar 
              className="w-32 h-32 cursor-pointer card-hover" 
              onClick={() => !isPreviewMode && alert('Image upload coming soon!')}
            >
              <AvatarImage src={data.image} />
              <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                {data.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {!isPreviewMode && (
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-gradient-accent"
              >
                <Camera className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">About Me</Label>
                  <Textarea
                    id="description"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    rows={4}
                    placeholder="Tell your story, share your passion, and describe what makes you unique..."
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-foreground mb-2">{data.name}</h1>
                <h2 className="text-xl text-primary mb-4">{data.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{data.description}</p>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Tips Card */}
      {!isPreviewMode && (
        <Card className="p-4 bg-accent/10 border-accent/20 animate-fade-in">
          <h4 className="font-medium text-foreground mb-2">💡 Tips for a great About section:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Keep it personal but professional</li>
            <li>• Highlight your unique value proposition</li>
            <li>• Use a high-quality, professional photo</li>
            <li>• Show your personality and passion</li>
          </ul>
        </Card>
      )}
    </div>
  );
};