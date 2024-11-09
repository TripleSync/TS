import { FaEraser, FaPen, FaTrashAlt } from "react-icons/fa";
import { useDrawingStore } from "store/actions/useDrawngStore";

const Tools = ({ onClear }: { onClear: () => void }) => {
  const tool = useDrawingStore((state) => state.tool);
  const setTool = useDrawingStore((state) => state.setTool);

  const toolColor = "text-white";
  const liStyle = "cursor-pointer";

  return (
    <>
      <li className={`${liStyle} ${tool === "pen" ? toolColor : ""}`}>
        <FaPen onClick={() => setTool("pen")} />
      </li>
      <li className={`${liStyle} ${tool === "eraser" ? toolColor : ""}`}>
        <FaEraser onClick={() => setTool("eraser")} />
      </li>
      <li>
        <FaTrashAlt
          className={`${liStyle} hover:text-white`}
          onClick={() => {
            if (confirm("전체 삭제하시겠습니까?")) {
              onClear();
              setTool("pen");
            }
          }}
        />
      </li>
    </>
  );
};
export default Tools;
