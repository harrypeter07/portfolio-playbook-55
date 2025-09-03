import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Move, 
  Trash2, 
  Edit3, 
  Save,
  X,
  StickyNote,
  ArrowRight,
  Circle,
  Square,
  Triangle,
  Link,
  Image as ImageIcon,
  Type,
  Palette,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Share
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhiteboardElement {
  id: string;
  type: 'sticky' | 'text' | 'shape' | 'connector' | 'image';
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: string;
  color: string;
  rotation: number;
  zIndex: number;
  metadata?: any;
}

interface WhiteboardCanvasProps {
  elements: WhiteboardElement[];
  onElementsChange: (elements: WhiteboardElement[]) => void;
  isPreviewMode?: boolean;
  className?: string;
}

const ELEMENT_TYPES = {
  sticky: { 
    icon: <StickyNote className="w-4 h-4" />, 
    defaultSize: { width: 200, height: 150 },
    defaultColor: '#FEF3C7'
  },
  text: { 
    icon: <Type className="w-4 h-4" />, 
    defaultSize: { width: 300, height: 100 },
    defaultColor: '#FFFFFF'
  },
  shape: { 
    icon: <Square className="w-4 h-4" />, 
    defaultSize: { width: 100, height: 100 },
    defaultColor: '#DBEAFE'
  },
  connector: { 
    icon: <ArrowRight className="w-4 h-4" />, 
    defaultSize: { width: 150, height: 50 },
    defaultColor: '#F3E8FF'
  },
  image: { 
    icon: <ImageIcon className="w-4 h-4" />, 
    defaultSize: { width: 200, height: 150 },
    defaultColor: '#F0FDF4'
  }
};

const COLORS = [
  '#FEF3C7', '#FDE68A', '#FCD34D', '#F59E0B', // Yellows
  '#DBEAFE', '#93C5FD', '#60A5FA', '#3B82F6', // Blues
  '#F3E8FF', '#C4B5FD', '#A78BFA', '#8B5CF6', // Purples
  '#F0FDF4', '#86EFAC', '#4ADE80', '#22C55E', // Greens
  '#FEF2F2', '#FCA5A5', '#F87171', '#EF4444', // Reds
  '#FFFFFF', '#F9FAFB', '#F3F4F6', '#E5E7EB'  // Grays
];

export const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  elements,
  onElementsChange,
  isPreviewMode = false,
  className = ''
}) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);
  const nextZIndex = Math.max(...elements.map(e => e.zIndex), 0) + 1;

  const addElement = (type: keyof typeof ELEMENT_TYPES) => {
    const elementConfig = ELEMENT_TYPES[type];
    const newElement: WhiteboardElement = {
      id: Date.now().toString(),
      type,
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
      size: elementConfig.defaultSize,
      content: type === 'sticky' ? 'New sticky note' : 
               type === 'text' ? 'Click to edit text' :
               type === 'shape' ? '' : 'New element',
      color: elementConfig.defaultColor,
      rotation: 0,
      zIndex: nextZIndex
    };
    
    onElementsChange([...elements, newElement]);
  };

  const deleteElement = (id: string) => {
    onElementsChange(elements.filter(e => e.id !== id));
    setSelectedElement(null);
  };

  const updateElement = (id: string, updates: Partial<WhiteboardElement>) => {
    onElementsChange(elements.map(e => 
      e.id === id ? { ...e, ...updates } : e
    ));
  };

  const handleMouseDown = useCallback((e: React.MouseEvent, element: WhiteboardElement) => {
    if (isPreviewMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setSelectedElement(element.id);
    setIsDragging(true);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - element.position.x * zoom,
        y: e.clientY - rect.top - element.position.y * zoom
      });
    }
  }, [isPreviewMode, zoom]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = e.clientX - panStart.x;
      const deltaY = e.clientY - panStart.y;
      setPan({ x: pan.x + deltaX, y: pan.y + deltaY });
      setPanStart({ x: e.clientX, y: e.clientY });
    } else if (isDragging && selectedElement) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const newX = (e.clientX - rect.left - dragOffset.x) / zoom;
        const newY = (e.clientY - rect.top - dragOffset.y) / zoom;
        
        updateElement(selectedElement, {
          position: { x: Math.max(0, newX), y: Math.max(0, newY) }
        });
      }
    }
  }, [isPanning, panStart, pan, isDragging, selectedElement, dragOffset, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsPanning(false);
  }, []);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.ctrlKey)) { // Middle mouse or Ctrl+click
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    } else {
      setSelectedElement(null);
    }
  }, []);

  const startEditing = (element: WhiteboardElement) => {
    setIsEditing(element.id);
    setEditContent(element.content);
  };

  const saveEdit = () => {
    if (isEditing) {
      updateElement(isEditing, { content: editContent });
      setIsEditing(null);
      setEditContent('');
    }
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setEditContent('');
  };

  const renderElement = (element: WhiteboardElement) => {
    const isSelected = selectedElement === element.id;
    const isBeingEdited = isEditing === element.id;
    const elementConfig = ELEMENT_TYPES[element.type];

    return (
      <motion.div
        key={element.id}
        className={`
          absolute cursor-move select-none
          ${isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
          ${isPreviewMode ? 'cursor-default' : 'cursor-move'}
        `}
        style={{
          left: element.position.x,
          top: element.position.y,
          width: element.size.width,
          height: element.size.height,
          zIndex: element.zIndex,
          transform: `rotate(${element.rotation}deg)`
        }}
        onMouseDown={(e) => handleMouseDown(e, element)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card
          className={`
            h-full p-3 border-2 transition-all duration-200
            ${isSelected ? 'border-blue-300 shadow-lg' : 'border-transparent hover:border-gray-300'}
            ${element.type === 'sticky' ? 'shadow-lg' : ''}
          `}
          style={{ backgroundColor: element.color }}
        >
          {/* Element Header */}
          {!isPreviewMode && (
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                {elementConfig.icon}
                <span className="text-xs font-medium capitalize">{element.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 hover:bg-white/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing(element);
                  }}
                >
                  <Edit3 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 hover:bg-red-100 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Element Content */}
          <div className="flex-1">
            {isBeingEdited ? (
              <div className="space-y-2">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="text-sm resize-none"
                  rows={3}
                  autoFocus
                />
                <div className="flex gap-1">
                  <Button size="sm" onClick={saveEdit} className="h-6 px-2">
                    <Save className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit} className="h-6 px-2">
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="text-sm text-gray-800 cursor-text"
                onClick={() => !isPreviewMode && startEditing(element)}
              >
                {element.content || 'Click to edit...'}
              </div>
            )}
          </div>

          {/* Sticky Note Corner */}
          {element.type === 'sticky' && (
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-yellow-300" />
          )}
        </Card>
      </motion.div>
    );
  };

  return (
    <div className={`w-full h-full flex flex-col bg-gray-50 ${className}`}>
      {/* Toolbar */}
      {!isPreviewMode && (
        <div className="flex items-center gap-2 p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-muted-foreground">Add Elements:</span>
            {Object.entries(ELEMENT_TYPES).map(([type, config]) => (
              <Button
                key={type}
                variant="outline"
                size="sm"
                className="h-8 px-2 gap-1 hover:scale-105 transition-transform"
                onClick={() => addElement(type as keyof typeof ELEMENT_TYPES)}
              >
                {config.icon}
                <span className="text-xs capitalize">{type}</span>
              </Button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-12 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2"
              onClick={() => {
                setPan({ x: 0, y: 0 });
                setZoom(1);
              }}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      )}

      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 relative overflow-hidden bg-white"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseDown={handleCanvasMouseDown}
        onMouseLeave={handleMouseUp}
        style={{
          backgroundImage: `
            radial-gradient(circle, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
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

        {/* Render Elements */}
        {elements
          .sort((a, b) => a.zIndex - b.zIndex)
          .map(renderElement)}

        {/* Empty State */}
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto flex items-center justify-center">
                <StickyNote className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Start Your Whiteboard
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Add sticky notes, text, shapes, and connectors to organize your thoughts and ideas.
                  Use Ctrl+click or middle mouse to pan around the canvas.
                </p>
              </div>
              {!isPreviewMode && (
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => addElement('sticky')} className="bg-gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Sticky Note
                  </Button>
                  <Button onClick={() => addElement('text')} variant="outline">
                    <Type className="w-4 h-4 mr-2" />
                    Add Text
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Selection Info */}
        {selectedElement && !isPreviewMode && (
          <div className="absolute top-4 left-4 bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm font-medium">Element Selected</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Drag to move • Click to edit • Delete to remove
            </div>
          </div>
        )}
      </div>

      {/* Color Palette */}
      {selectedElement && !isPreviewMode && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Change Color</span>
          </div>
          <div className="grid grid-cols-8 gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => updateElement(selectedElement, { color })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
