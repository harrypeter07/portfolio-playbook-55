import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useEditor } from "@/components/editor/EditorContext";

// Size selection now comes from TopBar via EditorContext

interface CanvaPageProps {
  children?: React.ReactNode;
  activeSection?: string;
}

export const CanvaPage = ({ children, activeSection }: CanvaPageProps) => {
  const { pageSize, zoom, setZoom, currentPage, setCurrentPage } = useEditor();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinchRef = useRef<{ lastDistance: number | null }>({ lastDistance: null });

  return (
    <div className="flex flex-col h-full">
      {/* Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 bg-gray-100 p-8 overflow-auto select-none"
        onWheel={(e) => {
          if (e.ctrlKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.05 : 0.05;
            setZoom(+(Math.max(0.25, Math.min(2, zoom + delta))).toFixed(2));
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 2) {
            const [a, b] = e.touches;
            const dx = a.clientX - b.clientX;
            const dy = a.clientY - b.clientY;
            const dist = Math.hypot(dx, dy);
            if (pinchRef.current.lastDistance != null) {
              const diff = dist - pinchRef.current.lastDistance;
              if (Math.abs(diff) > 2) {
                const delta = diff > 0 ? 0.03 : -0.03;
                setZoom(+(Math.max(0.25, Math.min(2, zoom + delta))).toFixed(2));
              }
            }
            pinchRef.current.lastDistance = dist;
          }
        }}
        onTouchEnd={() => {
          pinchRef.current.lastDistance = null;
        }}
      >
        <div className="flex items-center justify-center min-h-full relative">
          {/* Centered P1/P2 Tabs Overlay */}
          <div className="absolute -bottom-6 flex items-center gap-2">
            <button
              className={`px-4 py-2 rounded-md border text-sm ${currentPage === 'P1' ? 'bg-white border-gray-300 shadow' : 'bg-gray-100 border-transparent'}`}
              onClick={() => setCurrentPage('P1')}
            >
              P1
            </button>
            <button
              className={`px-4 py-2 rounded-md border text-sm ${currentPage === 'P2' ? 'bg-white border-gray-300 shadow' : 'bg-gray-100 border-transparent'}`}
              onClick={() => setCurrentPage('P2')}
            >
              P2
            </button>
          </div>
          <Card 
            className="bg-white shadow-2xl border-2 border-gray-200"
            style={{
              width: pageSize.width,
              height: pageSize.height,
              transform: `scale(${zoom})`,
              transformOrigin: 'center center'
            }}
          >
            <div className="w-full h-full overflow-auto">
              {children || (
                <div className="flex items-center justify-center h-full text-center p-8">
                  {!activeSection ? (
                    <>
                      <div>
                        <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          Start Building Your Portfolio
                        </h3>
                        <p className="text-muted-foreground">
                          Select a section from the left sidebar to begin editing your portfolio
                        </p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <h3 className="text-lg font-medium text-muted-foreground">
                        {activeSection} Section
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Content will appear here
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};