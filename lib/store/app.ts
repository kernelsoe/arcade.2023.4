import produce from "immer";
import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createObjectSlice, ObjectStoreSlice } from "./objects";

export type PlaygroundFocus = "block" | "canvas";
export interface AppStoreSlice {
  currentFocus: PlaygroundFocus;
  setCurrentFocus: (state: PlaygroundFocus) => void;
  editorRefs: Record<string, any | null>;
  insertEditorRefs: (id: string, ref: any | null) => void;
  menuToggle: boolean;
  setMenuToggle: (state: boolean) => void;
}

export const createAppSlice: StateCreator<
  AppStoreSlice & ObjectStoreSlice,
  [],
  [],
  AppStoreSlice
> = (set) => ({
  currentFocus: "canvas",
  setCurrentFocus: (currentFocus) => set(() => ({ currentFocus })),
  editorRefs: [],
  insertEditorRefs: (id, ref) =>
    set((state) => ({
      editorRefs: {
        ...state.editorRefs,
        [id]: ref,
      },
    })),
  menuToggle: false,
  setMenuToggle: (menuToggle) => set(() => ({ menuToggle })),
});

export const useAppStore = create(
  immer<ObjectStoreSlice & AppStoreSlice>((...a) => ({
    ...createObjectSlice(...a),
    ...createAppSlice(...a),
  })),
);
