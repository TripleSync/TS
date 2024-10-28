import { BrushColor } from "@customTypes/drawing";
import { useDrawingStore } from "store/actions/useDrawngStore";

const ColorBtn = ({ color }: { color: BrushColor }) => {
  const setBrushColor = useDrawingStore((state) => state.setBrushColor);
  return (
    <button
      className="flex items-center justify-center w-5 h-5 rounded-full"
      onClick={() => setBrushColor(color)}
      style={{ backgroundColor: color }}></button>
  );
};
export default ColorBtn;
