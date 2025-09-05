import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

export type PageSize = {
  name: string;
  width: number;
  height: number;
};

export const PAGE_SIZES: PageSize[] = [
  { name: "Presentation (16:9)", width: 1920, height: 1080 },
  { name: "Letter (8.5×11)", width: 816, height: 1056 },
  { name: "Mobile (9:16)", width: 405, height: 720 },
  { name: "Square", width: 800, height: 800 },
  { name: "Custom", width: 800, height: 1000 }
];

type EditorContextType = {
  pageSize: PageSize;
  setPageSizeByName: (name: string) => void;
  setCustomPageSize: (width: number, height: number) => void;
  currentPage: number; // Dynamic page number (1, 2, 3, etc.)
  setCurrentPage: (p: number) => void;
  totalPages: number; // Total pages for current section
  setTotalPages: (p: number) => void;
  zoom: number; // 0.25 - 2.0
  setZoom: (z: number) => void;
  activeSection: 'about' | 'projects' | 'experience' | 'skills' | 'contact';
  setActiveSection: (s: EditorContextType['activeSection']) => void;
  textStyle: {
    fontFamily: string;
    fontSizePx: number;
    color: string;
    align: 'left' | 'center' | 'right' | 'justify';
  };
  setTextStyle: (p: Partial<EditorContextType['textStyle']>) => void;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageSize, setPageSize] = useState<PageSize>(PAGE_SIZES[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [zoom, setZoomInternal] = useState<number>(0.48);
  const [activeSection, setActiveSection] = useState<EditorContextType['activeSection']>('about');
  const [textStyle, setTextStyleState] = useState<EditorContextType['textStyle']>({
    fontFamily: 'Inter',
    fontSizePx: 16,
    color: '#111111',
    align: 'left'
  });

  const setZoom = useCallback((z: number) => {
    const clamped = Math.max(0.25, Math.min(2, z));
    setZoomInternal(clamped);
  }, []);

  const setPageSizeByName = useCallback((name: string) => {
    const found = PAGE_SIZES.find(s => s.name === name);
    if (found) setPageSize(found);
  }, []);

  const setCustomPageSize = useCallback((width: number, height: number) => {
    setPageSize({ name: "Custom", width, height });
  }, []);

  const value = useMemo(
    () => ({ 
      pageSize, setPageSizeByName, setCustomPageSize,
      currentPage, setCurrentPage,
      totalPages, setTotalPages,
      zoom, setZoom,
      activeSection, setActiveSection,
      textStyle,
      setTextStyle: (p) => setTextStyleState(prev => ({ ...prev, ...p }))
    }),
    [pageSize, setPageSizeByName, setCustomPageSize, currentPage, setCurrentPage, totalPages, setTotalPages, zoom, setZoom, activeSection, textStyle]
  );

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

export const useEditor = (): EditorContextType => {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within EditorProvider");
  return ctx;
};


