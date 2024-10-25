import { BrushColor } from "@customTypes/drawing";
import { FaEraser, FaPen, FaTrashAlt } from "react-icons/fa";
import { useDrawingStore } from "store/actions/useDrawngStore";
import ColorBtn from "./ColorBtn";
const COLORSET: BrushColor[] = ["black", "red", "blue"];

const Tool = ({ onClear }: { onClear: () => void }) => {
  const setTool = useDrawingStore((state) => state.setTool);
  const ulStyle = "flex gap-2";

  return (
    <div id="tool" className="mb-1 flex items-center justify-center gap-8">
      <ul id="tool" className={ulStyle}>
        <li>
          <FaPen onClick={() => setTool("pen")} />
        </li>
        <li>
          <FaEraser onClick={() => setTool("eraser")} />
        </li>
        <li>
          <FaTrashAlt
            onClick={() => {
              onClear();
              setTool("pen");
            }}
          />
        </li>
      </ul>
      <ul id="color-picker" className={ulStyle}>
        {COLORSET.map((color, idx) => (
          <li key={idx}>
            <ColorBtn color={color} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Tool;
