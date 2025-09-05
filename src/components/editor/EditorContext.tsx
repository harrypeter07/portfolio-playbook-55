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
  currentPage: "P1" | "P2";
  setCurrentPage: (p: "P1" | "P2") => void;
  zoom: number; // 0.25 - 2.0
  setZoom: (z: number) => void;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageSize, setPageSize] = useState<PageSize>(PAGE_SIZES[0]);
  const [currentPage, setCurrentPage] = useState<"P1" | "P2">("P1");
  const [zoom, setZoomInternal] = useState<number>(0.48);

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
    () => ({ pageSize, setPageSizeByName, setCustomPageSize, currentPage, setCurrentPage, zoom, setZoom }),
    [pageSize, setPageSizeByName, setCustomPageSize, currentPage, setCurrentPage, zoom, setZoom]
  );

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

export const useEditor = (): EditorContextType => {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within EditorProvider");
  return ctx;
};


