import Tool from "@components/ClassRoom/Drawing/Tool";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import { useDrawingStore } from "store/actions/useDrawngStore";

type TLine = {
  tool: string;
  points: any[];
  brushColor: string;
};

const Drawing = () => {
  const tool = useDrawingStore((state) => state.tool);
  const brushColor = useDrawingStore((state) => state.brushColor);
  const [lines, setLines] = useState<TLine[]>([]);
  const isDrawing = useRef(false);
  const layerRef = useRef<Konva.Layer | null>(null);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    if (!e.target) return;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      setLines([...lines, { tool, points: [pos.x, pos.y], brushColor }]);
    }
  };
  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    if (point) {
      lastLine.points = lastLine.points.concat([point.x, point.y]);
    }

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleClearCanvas = () => {
    if (layerRef.current) {
      layerRef.current.clear(); // Layer의 모든 도형을 지움
      layerRef.current.destroyChildren(); // Layer 내의 모든 자식 요소 삭제
    }
    setLines([]); // 상태 초기화
  };

  return (
    <section
      id="container"
      className=" w-fit h-fit bg-primary p-5 flex items-center justify-center border rounded-sm border-b">
      <div id="board" className="flex flex-col">
        <Tool onClear={handleClearCanvas} />
        <Stage
          id="canvas"
          className="bg-white"
          width={window.innerWidth * 0.5}
          height={window.innerHeight * 0.5}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}>
          <Layer ref={layerRef}>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.brushColor}
                strokeWidth={line.tool === "eraser" ? 10 : 1}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </section>
  );
};

export default Drawing;
