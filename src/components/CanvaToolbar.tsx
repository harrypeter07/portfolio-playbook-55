import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Palette,
  Type,
  Minus,
  Plus,
  ChevronDown,
  Image,
  Layout,
  Sparkles,
  Wand2,
  Eye,
  Settings
} from "lucide-react";
import { useState } from "react";
import { useEditor } from "@/components/editor/EditorContext";

export const CanvaToolbar = () => {
  const { textStyle, setTextStyle } = useEditor();
  const [fontSize, setFontSize] = useState("16");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  
  const fontSizes = ["12", "14", "16", "18", "20", "24", "28", "32", "40", "48", "56", "64"];
  const fontFamilies = ["Inter", "Roboto", "Poppins", "Montserrat", "Playfair Display", "Open Sans"];
  
  const colors = [
    "#000000", "#374151", "#6B7280", "#9CA3AF", "#D1D5DB", "#F3F4F6",
    "#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#8B5CF6",
    "#EC4899", "#F59E0B", "#84CC16", "#06B6D4", "#8B5A2B", "#F472B6"
  ];

  const backgroundColors = [
    "#FFFFFF", "#F8FAFC", "#F1F5F9", "#E2E8F0", "#CBD5E1", "#94A3B8",
    "#FEF2F2", "#FEF3C7", "#F0FDF4", "#EFF6FF", "#F3E8FF", "#FDF2F8"
  ];

  return (
    <div className="h-16 bg-white border-b border-border flex items-center px-4 gap-3 overflow-x-auto">
      {/* Element Selection */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Element:</span>
        <Select value={selectedElement || "none"} onValueChange={setSelectedElement}>
          <SelectTrigger className="w-32 h-8 text-sm">
            <SelectValue placeholder="Select element" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="heading">Heading</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="card">Card</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator orientation="vertical" className="h-8" />

      {/* Font Family */}
      <Select value={fontFamily} onValueChange={(v) => { setFontFamily(v); setTextStyle({ fontFamily: v }); }}>
        <SelectTrigger className="w-36 h-8 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {fontFamilies.map((font) => (
            <SelectItem key={font} value={font} className="text-sm">
              <span style={{ fontFamily: font }}>{font}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-8" />

      {/* Font Size */}
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => {
            const current = parseInt(fontSize);
            if (current > 12) setFontSize((current - 2).toString());
            setTextStyle({ fontSizePx: Math.max(12, parseInt(fontSize) - 2) });
          }}
        >
          <Minus className="w-3 h-3" />
        </Button>
        
        <Select value={fontSize} onValueChange={(v) => { setFontSize(v); setTextStyle({ fontSizePx: parseInt(v) }); }}>
          <SelectTrigger className="w-16 h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((size) => (
              <SelectItem key={size} value={size} className="text-sm">
                {size}px
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => {
            const current = parseInt(fontSize);
            if (current < 64) setFontSize((current + 2).toString());
            setTextStyle({ fontSizePx: Math.min(64, parseInt(fontSize) + 2) });
          }}
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      {/* Text Formatting */}
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-gray-100"
          onClick={() => {
            // Toggle bold - you can implement this with a state
            console.log('Bold toggled');
          }}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-gray-100"
          onClick={() => {
            // Toggle italic
            console.log('Italic toggled');
          }}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-gray-100"
          onClick={() => {
            // Toggle underline
            console.log('Underline toggled');
          }}
        >
          <Underline className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      {/* Text Color */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 hover:bg-gray-100">
            <Type className="w-4 h-4" />
            <div 
              className="w-4 h-3 border border-gray-300 rounded-sm" 
              style={{ backgroundColor: textColor }}
            />
            <ChevronDown className="w-3 h-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2">
          <div className="grid grid-cols-6 gap-1">
            {colors.map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => { setTextColor(color); setTextStyle({ color }); }}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Separator orientation="vertical" className="h-8" />

      {/* Background Color */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 hover:bg-gray-100">
            <Layout className="w-4 h-4" />
            <div 
              className="w-4 h-3 border border-gray-300 rounded-sm" 
              style={{ backgroundColor: backgroundColor }}
            />
            <ChevronDown className="w-3 h-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2">
          <div className="grid grid-cols-6 gap-1">
            {backgroundColors.map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => setBackgroundColor(color)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Separator orientation="vertical" className="h-8" />

      {/* Text Alignment */}
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-gray-100"
          onClick={() => setTextStyle({ align: 'left' })}
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-gray-100"
          onClick={() => setTextStyle({ align: 'center' })}
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-gray-100"
          onClick={() => setTextStyle({ align: 'right' })}
        >
          <AlignRight className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-gray-100"
          onClick={() => setTextStyle({ align: 'justify' })}
        >
          <AlignJustify className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      {/* Magic Tools */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 hover:bg-purple-50 text-purple-600">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Magic</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 hover:bg-blue-50 text-blue-600">
          <Wand2 className="w-4 h-4" />
          <span className="text-sm">AI</span>
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      {/* Additional Tools */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <Image className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <Eye className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};