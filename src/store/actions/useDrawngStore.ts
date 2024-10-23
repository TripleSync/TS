import { create } from "zustand";

type DrawngStoreType = {
  tool: string;
  brushColor: string;
  setTool: (value: string) => void;
  setBrushColor: (color: string) => void;
};
export const useDrawingStore = create<DrawngStoreType>((set) => ({
  tool: "pen",
  brushColor: "black",
  setTool: (value) => set({ tool: value }),
  setBrushColor: (color) => set({ brushColor: color }),
}));
