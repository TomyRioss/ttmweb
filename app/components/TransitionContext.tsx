"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Phase = "idle" | "entering" | "exiting";

interface TransitionState {
  phase: Phase;
  x: number;
  y: number;
  href: string;
}

interface TransitionContextValue {
  state: TransitionState;
  triggerTransition: (x: number, y: number, href: string) => void;
  startExit: () => void;
  reset: () => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

const INITIAL: TransitionState = { phase: "idle", x: 0, y: 0, href: "" };

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TransitionState>(INITIAL);

  const triggerTransition = useCallback((x: number, y: number, href: string) => {
    setState({ phase: "entering", x, y, href });
  }, []);

  const startExit = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "exiting" }));
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL);
  }, []);

  return (
    <TransitionContext.Provider value={{ state, triggerTransition, startExit, reset }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used inside TransitionProvider");
  return ctx;
}
