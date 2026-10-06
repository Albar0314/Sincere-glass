"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface QuoteCtx {
  isOpen: boolean;
  openQuote: (product?: string) => void;
  closeQuote: () => void;
  preselectedProduct: string;
}

const Ctx = createContext<QuoteCtx>({
  isOpen: false,
  openQuote: () => {},
  closeQuote: () => {},
  preselectedProduct: "",
});

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [preselectedProduct, setProduct] = useState("");

  function openQuote(product?: string) {
    if (product) setProduct(product);
    setOpen(true);
    document.body.style.overflow = "hidden";
  }
  function closeQuote() {
    setOpen(false);
    document.body.style.overflow = "";
  }

  return (
    <Ctx.Provider value={{ isOpen, openQuote, closeQuote, preselectedProduct }}>
      {children}
    </Ctx.Provider>
  );
}

export function useQuote() {
  return useContext(Ctx);
}
