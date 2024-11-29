import { FaEraser, FaPen, FaTrashAlt } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import { useDrawingStore } from "store/actions/useDrawngStore";
const Tools = ({ onClear }: { onClear: () => void }) => {
  const tool = useDrawingStore((state) => state.tool);
  const setTool = useDrawingStore((state) => state.setTool);

  const toolColor = "text-white";
  const liStyle = "text-md cursor-pointer hover:text-white";

  return (
    <>
      <li className={`${liStyle} ${tool === "pen" ? toolColor : ""}`}>
        <FaPen onClick={() => setTool("pen")} />
      </li>
      <li className={`${liStyle} ${tool === "eraser" ? toolColor : ""}`}>
        <FaEraser onClick={() => setTool("eraser")} />
      </li>
      <li className={liStyle}>
        <FaTrashAlt
          onClick={() => {
            if (confirm("필기를 전체 삭제하시겠습니까?")) {
              onClear();
              setTool("pen");
            }
          }}
        />
      </li>
      <li className={liStyle}>
        <MdImageNotSupported
          size={17}
          onClick={() => {
            if (confirm("이미지를 삭제하시겠습니까?")) {
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
