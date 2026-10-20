"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { motionStorageKey } from "@/lib/motion-config";
import { stopThemeTransition } from "@/lib/theme-transition";
import { finishLanguageTransition } from "@/lib/language-transition";

const changeEvent = "portfolio-motion-change";
let fallbackPreference: boolean | null = null;

function getSnapshot() {
  if (fallbackPreference !== null) return fallbackPreference;
  try {
    const saved = localStorage.getItem(motionStorageKey);
    if (saved === "on" || saved === "off") return saved === "on";
  } catch {
    /* Keep animations enabled by default when storage is unavailable. */
  }
  return true;
}
const getServerSnapshot = () => true;
function applyPreference() {
  document.documentElement.dataset.motion = getSnapshot() ? "on" : "off";
  if (!getSnapshot()) {
    finishLanguageTransition();
    stopThemeTransition();
    document.activeViewTransition?.skipTransition();
  }
}
function subscribe(listener: () => void) {
  const sync = () => {
    applyPreference();
    listener();
  };
  window.addEventListener(changeEvent, sync);
  window.addEventListener("storage", sync);
  return () => {
    window.removeEventListener(changeEvent, sync);
    window.removeEventListener("storage", sync);
  };
}
function toggleMotion() {
  const enabled = !getSnapshot();
  try {
    localStorage.setItem(motionStorageKey, enabled ? "on" : "off");
    fallbackPreference = null;
  } catch {
    fallbackPreference = enabled;
  }
  applyPreference();
  window.dispatchEvent(new Event(changeEvent));
}

const MotionContext = createContext<{
  enabled: boolean;
  toggle: () => void;
} | null>(null);
export function MotionProvider({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  useEffect(() => {
    applyPreference();
  }, [enabled]);
  return (
    <MotionContext value={{ enabled, toggle: toggleMotion }}>
      {children}
    </MotionContext>
  );
}
export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) throw new Error("useMotion must be used within MotionProvider");
  return context;
}
