import Tool from "@components/ClassRoom/Drawing/Tool";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import { io, Socket } from "socket.io-client";
import { useDrawingStore } from "store/actions/useDrawngStore";

type TLine = {
  tool: string;
  points: any[];
  brushColor: string;
};

const socket: Socket = io("http://localhost:5000");

const Drawing = () => {
  const tool = useDrawingStore((state) => state.tool);
  const brushColor = useDrawingStore((state) => state.brushColor);
  const [lines, setLines] = useState<TLine[]>([]);
  const isDrawing = useRef(false);
  const layerRef = useRef<Konva.Layer | null>(null);

  useEffect(() => {
    //필기 데이터 수신
    socket.on("draw", (data: TLine) => {
      setLines((prev) => [...prev, data]);
    });

    socket.on("clearCanvas", handleClearCanvas);

    return () => {
      socket.off("draw");
      socket.off("clearCanvas");
    };
  }, []);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    if (!e.target) return;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      const newLine = { tool, points: [pos.x, pos.y], brushColor };
      setLines([...lines, newLine]);
      socket.emit("draw", newLine);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    let lastLine = lines[lines.length - 1];

    if (point) {
      lastLine.points = lastLine.points.concat([point.x, point.y]);
    }

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());

    socket.emit("draw", lastLine);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleClearCanvas = () => {
    if (layerRef.current) {
      layerRef.current.clear();
      layerRef.current.destroyChildren();
    }
    setLines([]);
  };

  return (
    <section id="container" className="flex h-full w-max items-center justify-center">
      <div id="board" className="mx-6 flex flex-col overflow-hidden rounded-2xl border bg-primary p-5">
        <Tool
          onClear={() => {
            handleClearCanvas();
            socket.emit("clearCanvas");
          }}
        />
        <Stage
          id="canvas"
          className="rounded-xl bg-white"
          width={750}
          height={550}
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
