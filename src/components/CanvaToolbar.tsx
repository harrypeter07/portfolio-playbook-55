import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
  ChevronDown
} from "lucide-react";
import { useState } from "react";

export const CanvaToolbar = () => {
  const [fontSize, setFontSize] = useState("16");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [textColor, setTextColor] = useState("#000000");
  
  const fontSizes = ["12", "14", "16", "18", "20", "24", "28", "32", "40", "48", "56", "64"];
  const fontFamilies = ["Inter", "Roboto", "Poppins", "Montserrat", "Playfair Display", "Open Sans"];
  
  const colors = [
    "#000000", "#374151", "#6B7280", "#9CA3AF", "#D1D5DB", "#F3F4F6",
    "#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#8B5CF6",
    "#EC4899", "#F59E0B", "#84CC16", "#06B6D4", "#8B5A2B", "#F472B6"
  ];

  return (
    <div className="h-16 bg-white border-b border-border flex items-center px-4 gap-3 overflow-x-auto">
      {/* Font Family */}
      <Select value={fontFamily} onValueChange={setFontFamily}>
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
          }}
        >
          <Minus className="w-3 h-3" />
        </Button>
        
        <Select value={fontSize} onValueChange={setFontSize}>
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
          }}
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      {/* Text Formatting */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <Italic className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <Underline className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      {/* Text Color */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 hover:bg-gray-100">
          <Type className="w-4 h-4" />
          <div 
            className="w-4 h-3 border border-gray-300 rounded-sm" 
            style={{ backgroundColor: textColor }}
          />
          <ChevronDown className="w-3 h-3" />
        </Button>
        
        {/* Color Palette */}
        <div className="hidden group-hover:flex absolute top-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 grid grid-cols-6 gap-1 z-50">
          {colors.map((color) => (
            <button
              key={color}
              className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => setTextColor(color)}
            />
          ))}
        </div>
      </div>

      <Separator orientation="vertical" className="h-8" />

      {/* Text Alignment */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <AlignRight className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <AlignJustify className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      {/* Additional Tools */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 hover:bg-gray-100">
          <Palette className="w-4 h-4" />
          <span className="text-sm">More</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};