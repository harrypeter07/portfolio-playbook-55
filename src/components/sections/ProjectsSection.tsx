import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Github,
  Check,
  X,
  ImageIcon
} from "lucide-react";

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
  onChange: (data: Project[]) => void;
  isPreviewMode: boolean;
}

export const ProjectsSection = ({ data, onChange, isPreviewMode }: ProjectsSectionProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (project: Project) => {
    setEditData({ ...project });
    setEditingId(project.id);
  };

  const handleSave = () => {
    if (editData) {
      const updatedProjects = data.map(p => 
        p.id === editingId ? editData : p
      );
      onChange(updatedProjects);
    }
    setEditingId(null);
    setEditData(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleDelete = (id: string) => {
    const updatedProjects = data.filter(p => p.id !== id);
    onChange(updatedProjects);
  };

  const handleAddNew = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Describe your amazing project here...",
      tech: ["React", "TypeScript"],
    };
    onChange([...data, newProject]);
    setIsAdding(false);
  };

  const addTechTag = (tech: string) => {
    if (editData && tech.trim() && !editData.tech.includes(tech.trim())) {
      setEditData({
        ...editData,
        tech: [...editData.tech, tech.trim()]
      });
    }
  };

  const removeTechTag = (techToRemove: string) => {
    if (editData) {
      setEditData({
        ...editData,
        tech: editData.tech.filter(t => t !== techToRemove)
      });
    }
  };

  if (isPreviewMode) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((project) => (
            <Card key={project.id} className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
              {project.image && (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {project.link && (
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Projects Showcase</h3>
        <Button onClick={() => setIsAdding(true)} className="bg-gradient-primary card-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((project) => (
          <Card key={project.id} className="overflow-hidden bg-gradient-card card-hover animate-bounce-in">
            {editingId === project.id && editData ? (
              // Edit Mode
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-foreground">Edit Project</h4>
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} size="sm" className="bg-green-500 hover:bg-green-600">
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="link">Project Link (optional)</Label>
                  <Input
                    id="link"
                    value={editData.link || ''}
                    onChange={(e) => setEditData({ ...editData, link: e.target.value })}
                    placeholder="https://your-project-url.com"
                  />
                </div>

                <div>
                  <Label>Technologies</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editData.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeTechTag(tech)}
                      >
                        {tech} ×
                      </Badge>
                    ))}
                  </div>
                  <Input
                    placeholder="Add technology (press Enter)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTechTag(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              // View Mode
              <>
                {project.image && (
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                    <div className="flex space-x-1">
                      <Button
                        onClick={() => handleEdit(project)}
                        variant="ghost"
                        size="sm"
                        className="hover:bg-primary/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(project.id)}
                        variant="ghost"
                        size="sm"
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    {project.link && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        ))}

        {/* Add New Project Card */}
        {isAdding && (
          <Card className="p-6 bg-gradient-card border-dashed border-2 border-primary/30 card-hover animate-bounce-in">
            <div className="text-center">
              <Plus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-foreground mb-2">Add New Project</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Showcase another amazing project you've built
              </p>
              <div className="flex space-x-2">
                <Button onClick={handleAddNew} className="flex-1">
                  Create Project
                </Button>
                <Button onClick={() => setIsAdding(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Tips Card */}
      {!isPreviewMode && (
        <Card className="p-4 bg-accent/10 border-accent/20 animate-fade-in">
          <h4 className="font-medium text-foreground mb-2">🚀 Project Tips:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Include live demos and source code links</li>
            <li>• Highlight the technologies you used</li>
            <li>• Explain the problem your project solves</li>
            <li>• Add high-quality screenshots or videos</li>
          </ul>
        </Card>
      )}
    </div>
  );
};