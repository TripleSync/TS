import { BrushColor } from "@customTypes/drawing";
import { useDrawingStore } from "store/actions/useDrawngStore";
import ColorBtn from "./ColorBtn";
import Tools from "./Tools";
const COLORSET: BrushColor[] = ["black", "red", "blue"];

const ToolsContainer = ({ onClear }: { onClear: () => void }) => {
  const brushColor = useDrawingStore((state) => state.brushColor);
  const ulStyle = "flex gap-2";

  return (
    <div id="tool" className="mb-1 flex items-center justify-center gap-8">
      <ul id="tool" className={ulStyle}>
        <Tools onClear={onClear} />
      </ul>
      <ul id="color-picker" className={ulStyle}>
        {COLORSET.map((color, idx) => (
          <li key={idx}>
            <ColorBtn color={color} isSelected={brushColor === color} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ToolsContainer;
