/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// Purpose: Context to store the analysis data across pages.

import React, { createContext, useContext, useState } from "react";

interface AnalysisContextType {
  analysis: any;
  setAnalysis: React.Dispatch<React.SetStateAction<any>>;
}

// Define the shape of the analysis context
const AnalysisContext = createContext<AnalysisContextType | null>(null);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [analysis, setAnalysis] = useState<any>(null);
  return (
    <AnalysisContext.Provider value={{ analysis, setAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used inside AnalysisProvider");
  }
  return context;
}
