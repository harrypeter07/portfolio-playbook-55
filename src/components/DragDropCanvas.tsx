import React, { useState, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Move, 
  Trash2, 
  Star, 
  Code, 
  FileText, 
  Image as ImageIcon,
  Sparkles,
  Zap,
  Heart
} from 'lucide-react';

export interface DraggableItem {
  id: string;
  type: 'project' | 'skill' | 'story' | 'achievement';
  title: string;
  description: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  color: string;
  icon?: React.ReactNode;
  metadata?: any;
}

interface DragDropCanvasProps {
  items: DraggableItem[];
  onItemsChange: (items: DraggableItem[]) => void;
  isPreviewMode?: boolean;
}

const ITEM_TYPES = {
  project: { 
    icon: <Code className="w-5 h-5" />, 
    color: 'bg-blue-500',
    defaultSize: { width: 200, height: 150 }
  },
  skill: { 
    icon: <Star className="w-5 h-5" />, 
    color: 'bg-green-500',
    defaultSize: { width: 120, height: 120 }
  },
  story: { 
    icon: <FileText className="w-5 h-5" />, 
    color: 'bg-purple-500',
    defaultSize: { width: 180, height: 100 }
  },
  achievement: { 
    icon: <Sparkles className="w-5 h-5" />, 
    color: 'bg-yellow-500',
    defaultSize: { width: 160, height: 120 }
  }
};

export const DragDropCanvas: React.FC<DragDropCanvasProps> = ({
  items,
  onItemsChange,
  isPreviewMode = false
}) => {
  const [draggedItem, setDraggedItem] = useState<DraggableItem | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showDropZones, setShowDropZones] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, item: DraggableItem) => {
    if (isPreviewMode) return;
    
    e.preventDefault();
    setDraggedItem(item);
    setIsDragging(true);
    setShowDropZones(true);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - item.position.x,
        y: e.clientY - rect.top - item.position.y
      });
    }
  }, [isPreviewMode]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !draggedItem || isPreviewMode) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      
      // Constrain to canvas bounds
      const constrainedX = Math.max(0, Math.min(newX, (rect.width || 800) - draggedItem.size.width));
      const constrainedY = Math.max(0, Math.min(newY, (rect.height || 600) - draggedItem.size.height));
      
      const updatedItem = {
        ...draggedItem,
        position: { x: constrainedX, y: constrainedY }
      };
      
      setDraggedItem(updatedItem);
    }
  }, [isDragging, draggedItem, dragOffset, isPreviewMode]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging || !draggedItem || isPreviewMode) return;

    const updatedItems = items.map(item => 
      item.id === draggedItem.id ? draggedItem : item
    );
    
    onItemsChange(updatedItems);
    setDraggedItem(null);
    setIsDragging(false);
    setShowDropZones(false);
  }, [isDragging, draggedItem, items, onItemsChange, isPreviewMode]);

  const addNewItem = (type: keyof typeof ITEM_TYPES) => {
    const newItem: DraggableItem = {
      id: Date.now().toString(),
      type,
      title: `New ${type}`,
      description: `Add your ${type} details here...`,
      position: { x: 50 + Math.random() * 200, y: 50 + Math.random() * 200 },
      size: ITEM_TYPES[type].defaultSize,
      color: ITEM_TYPES[type].color,
      icon: ITEM_TYPES[type].icon
    };
    
    onItemsChange([...items, newItem]);
  };

  const deleteItem = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  const renderItem = (item: DraggableItem) => {
    const isDraggingThis = draggedItem?.id === item.id;
    const itemConfig = ITEM_TYPES[item.type];
    
    return (
      <Card
        key={item.id}
        className={`
          absolute cursor-move select-none transition-all duration-200
          ${isDraggingThis ? 'z-50 scale-105 shadow-2xl' : 'z-10 hover:shadow-lg'}
          ${isPreviewMode ? 'cursor-default' : 'cursor-move'}
          animate-bounce-in
        `}
        style={{
          left: item.position.x,
          top: item.position.y,
          width: item.size.width,
          height: item.size.height,
          transform: isDraggingThis ? 'rotate(2deg)' : 'rotate(0deg)'
        }}
        onMouseDown={(e) => handleMouseDown(e, item)}
      >
        <div className={`h-full p-3 ${itemConfig.color} bg-opacity-10 rounded-lg border-2 border-dashed border-transparent hover:border-primary/30 transition-colors`}>
          <div className="flex items-start justify-between mb-2">
            <div className={`p-2 rounded-lg ${itemConfig.color} text-white`}>
              {itemConfig.icon}
            </div>
            {!isPreviewMode && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(item.id);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
          
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-foreground truncate">
              {item.title}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </div>
          
          {/* Magic sparkle effect */}
          <div className="absolute top-1 right-1 opacity-0 hover:opacity-100 transition-opacity">
            <Sparkles className="w-3 h-3 text-yellow-500 animate-pulse" />
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toolbar */}
      {!isPreviewMode && (
        <div className="flex items-center gap-2 p-4 border-b border-border bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-muted-foreground">Add Elements:</span>
            {Object.entries(ITEM_TYPES).map(([type, config]) => (
              <Button
                key={type}
                variant="outline"
                size="sm"
                className="h-8 px-2 gap-1 hover:scale-105 transition-transform"
                onClick={() => addNewItem(type as keyof typeof ITEM_TYPES)}
              >
                {config.icon}
                <span className="text-xs capitalize">{type}</span>
              </Button>
            ))}
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {items.length} items
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setShowDropZones(!showDropZones)}
            >
              <Zap className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Drop Zones (when dragging) */}
        {showDropZones && isDragging && (
          <>
            <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-lg m-4 animate-pulse" />
            <div className="absolute top-4 left-4 right-4 h-16 bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-sm text-primary font-medium">Drop Zone - Top Section</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 h-16 bg-accent/5 border border-accent/20 rounded-lg flex items-center justify-center">
              <span className="text-sm text-accent font-medium">Drop Zone - Bottom Section</span>
            </div>
          </>
        )}

        {/* Render Items */}
        {items.map(renderItem)}

        {/* Empty State */}
        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Start Building Your Story
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Drag and drop elements to create your unique portfolio canvas. 
                  Add projects, skills, stories, and achievements to tell your story.
                </p>
              </div>
              {!isPreviewMode && (
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => addNewItem('project')} className="bg-gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                  <Button onClick={() => addNewItem('skill')} variant="outline">
                    <Star className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Magic Animation Overlay */}
        {isDragging && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 border-2 border-primary/30 rounded-full animate-ping" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-accent/30 rounded-full animate-ping animation-delay-200" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
