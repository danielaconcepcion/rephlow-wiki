import { createContext, useCallback, useContext } from "react";
import type { ReactNode } from "react";

/* --------------------------------------------------------------------------
   Page-wide UI state shared by the Entrepreneurship widgets.

   Most interactions on this page are "pick one of several" (tabs, filters,
   selected phase, selected risk…). Instead of wiring a separate useState
   through every section, one keyed store lives at the page root and any
   button/panel/widget reads or writes its own key. Keys are listed in
   INITIAL (Entrepreneurship.tsx).
   -------------------------------------------------------------------------- */

export type UIValue = string | number | boolean | string[] | null;
export type UIState = Record<string, UIValue>;

export interface UIContextValue {
  state: UIState;
  set: (key: string, value: UIValue) => void;
}

export const UIContext = createContext<UIContextValue>({
  state: {},
  set: () => {},
});

/** Read/write one key of the shared page state. */
export function useUI<T extends UIValue>(key: string): [T, (v: T) => void] {
  const { state, set } = useContext(UIContext);
  const setter = useCallback((v: T) => set(key, v), [set, key]);
  return [state[key] as T, setter];
}

/* Modal + lightbox ------------------------------------------------------- */

export interface ModalApi {
  open: (content: ReactNode, color?: string, wide?: boolean) => void;
  close: () => void;
}
export const ModalContext = createContext<ModalApi>({
  open: () => {},
  close: () => {},
});
export const useModal = () => useContext(ModalContext);
