"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// TOOLS-HUB-V1:QuoteContext.prefillMessage
interface QuoteCtx {
  isOpen: boolean;
  openQuote: (product?: string, prefillMessage?: string) => void;
  closeQuote: () => void;
  preselectedProduct: string;
  prefillMessage: string;
}

const Ctx = createContext<QuoteCtx>({
  isOpen: false,
  openQuote: () => {},
  closeQuote: () => {},
  preselectedProduct: "",
  prefillMessage: "",
});

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [preselectedProduct, setProduct] = useState("");
  const [prefillMessage, setPrefillMessage] = useState("");

  function openQuote(product?: string, pfMessage?: string) {
    if (product) setProduct(product);
    setPrefillMessage(pfMessage || "");
    setOpen(true);
    document.body.style.overflow = "hidden";
  }
  function closeQuote() {
    setOpen(false);
    setPrefillMessage("");
    document.body.style.overflow = "";
  }

  return (
    <Ctx.Provider value={{ isOpen, openQuote, closeQuote, preselectedProduct, prefillMessage }}>
      {children}
    </Ctx.Provider>
  );
}

export function useQuote() {
  return useContext(Ctx);
}
