"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MarginContextType {
  marginBottom: number;
  setMarginBottom: (value: number) => void;
}

const MarginContext = createContext<MarginContextType | null>(null);

export const useMargin = () => {
  const context = useContext(MarginContext);
  if (!context) {
    return { marginBottom: 0, setMarginBottom: () => {} };
  }
  return context;
};

interface MarginProviderProps {
  children: ReactNode;
}

export const MarginProvider = ({ children }: MarginProviderProps) => {
  const [marginBottom, setMarginBottom] = useState<number>(0);

  return (
    <MarginContext.Provider value={{ marginBottom, setMarginBottom }}>
      {children}
    </MarginContext.Provider>
  );
};
