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
  const { pageSize, zoom, setZoom, currentPage, setCurrentPage, totalPages } = useEditor();
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
          {/* Center the page within a max-layout width like Canva */}
          <div className="absolute inset-0 pointer-events-none" />
          {/* Dynamic Page Tabs Overlay */}
          <div className="absolute -bottom-6 flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`px-4 py-2 rounded-md border text-sm ${
                  currentPage === pageNum 
                    ? 'bg-white border-gray-300 shadow' 
                    : 'bg-gray-100 border-transparent'
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                P{pageNum}
              </button>
            ))}
          </div>
          
          {/* Single page for About section, multiple pages for Projects */}
          {totalPages === 1 ? (
            <div
              className="pointer-events-auto"
              style={{ width: pageSize.width * zoom, height: pageSize.height * zoom }}
            >
              <Card 
                className="bg-white shadow-2xl border-2"
                style={{
                  width: pageSize.width,
                  height: pageSize.height,
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left'
                }}
              >
                <div className="w-full h-full overflow-auto"
                  style={{
                    boxShadow: '0 0 0 2px #a855f7 inset',
                  }}
                >
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
          ) : (
            /* Multiple pages with horizontal scrolling */
            <div 
              className="flex gap-4 overflow-x-auto pb-4"
              style={{ 
                width: '100%',
                maxWidth: '100vw',
                paddingLeft: '20px',
                paddingRight: '20px'
              }}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <div
                  key={pageNum}
                  className="pointer-events-auto flex-shrink-0"
                  style={{ width: pageSize.width * zoom, height: pageSize.height * zoom }}
                >
                  <Card 
                    className={`bg-white shadow-2xl border-2 ${
                      currentPage === pageNum ? 'ring-2 ring-purple-500' : ''
                    }`}
                    style={{
                      width: pageSize.width,
                      height: pageSize.height,
                      transform: `scale(${zoom})`,
                      transformOrigin: 'top left'
                    }}
                  >
                    <div className="w-full h-full overflow-auto"
                      style={{
                        boxShadow: currentPage === pageNum 
                          ? '0 0 0 2px #a855f7 inset' 
                          : '0 0 0 1px #e5e7eb inset',
                      }}
                    >
                      {pageNum === currentPage ? children : (
                        <div className="flex items-center justify-center h-full text-center p-8">
                          <div>
                            <h3 className="text-lg font-medium text-muted-foreground">
                              Page {pageNum}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              Click to edit this page
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};