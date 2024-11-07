import { BrushColor } from "@customTypes/drawing";
import { useDrawingStore } from "store/actions/useDrawngStore";

interface ColorBtnProps {
  color: BrushColor;
  isSelected: boolean;
}
const ColorBtn = ({ color, isSelected }: ColorBtnProps) => {
  const setBrushColor = useDrawingStore((state) => state.setBrushColor);
  const borderStyle = isSelected ? "border-white" : "border-transparent";

  return (
    <button
      className={`flex h-5 w-5 items-center justify-center rounded-full border ${borderStyle}`}
      onClick={() => setBrushColor(color)}
      style={{ backgroundColor: color }}></button>
  );
};
export default ColorBtn;
