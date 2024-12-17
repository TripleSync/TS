import { TLine } from "@customTypes/drawing";
import { useSocket } from "hooks/useSocket";
import { useSocketEmit } from "hooks/useSocketEmit";
import { useSocketEvent } from "hooks/useSocketEvent";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { Image, Layer, Line, Stage } from "react-konva";
import { useDrawingStore } from "store/actions/useDrawngStore";
import { useUserStore } from "store/actions/useUserStore";
import ToolsContainer from "./Drawing/ToolsContainer";

const URL = "http://localhost:5000";

const Drawing = () => {
  const user = useUserStore((state) => state.user);
  const isTeacher = user?.role === "1"; // 0: student, 1: teacher

  const tool = useDrawingStore((state) => state.tool);
  const brushColor = useDrawingStore((state) => state.brushColor);
  const [lines, setLines] = useState<TLine[]>([]);
  const isDrawing = useRef(false);
  const layerRef = useRef<Konva.Layer | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const { socket, isConnected } = useSocket(URL);
  const emit = useSocketEmit(socket, isConnected);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    if (!e.target || !isTeacher) return;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      const newLine = { tool, points: [pos.x, pos.y], brushColor };
      setLines([...lines, newLine]);
      emit("draw", newLine);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current || !isTeacher) {
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

    emit("draw", lastLine);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleClearCanvas = () => {
    setLines([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgData = reader.result as string;
        const img = new window.Image();
        img.src = imgData;
        img.onload = () => {
          setImage(img);
          emit("updateImage", imgData);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = (isImageTool?: boolean) => {
    if (isImageTool) {
      setImage(null);
      emit("updateImage", null);
    } else {
      handleClearCanvas();
      emit("clearCanvas");
    }
  };

  useSocketEvent(socket, isConnected, "draw", (data: TLine) => {
    setLines((prev) => [...prev, data]);
  });

  useSocketEvent(socket, isConnected, "updateImage", (data: string) => {
    console.log(data);
    const img = new window.Image();
    img.src = data;
    img.onload = () => {
      setImage(img);
    };
  });

  useSocketEvent(socket, isConnected, "initializeLines", (initialLines: TLine[]) => {
    setLines(initialLines);
  });

  useSocketEvent(socket, isConnected, "clearCanvas", handleClearCanvas);

  return (
    <section id="container" className="flex h-full w-max items-start justify-center">
      <div id="board" className="mx-6 flex flex-col overflow-hidden rounded-2xl border bg-primary p-5">
        {isTeacher && (
          <>
            <label htmlFor="img-file" className="w-fit cursor-pointer">
              <LuImagePlus size="30" />
            </label>
            <input id="img-file" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <ToolsContainer onClear={handleClear} />
          </>
        )}
        <Stage
          id="canvas"
          className="rounded-xl bg-white"
          width={900}
          height={550}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}>
          <Layer ref={layerRef}>
            {image && <Image image={image} x={0} y={0} width={900} height={550} />}
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
