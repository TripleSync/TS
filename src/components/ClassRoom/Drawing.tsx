import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useRef, useState } from "react";
import { Image, Layer, Line, Stage } from "react-konva";
import io from "socket.io-client";
import { useDrawingStore } from "store/actions/useDrawngStore";
import ToolsContainer from "./Drawing/ToolsContainer";

type TLine = {
  tool: string;
  points: any[];
  brushColor: string;
};

const socket = io("http://localhost:5000");

const Drawing = () => {
  const tool = useDrawingStore((state) => state.tool);
  const brushColor = useDrawingStore((state) => state.brushColor);
  const [lines, setLines] = useState<TLine[]>([]);
  const isDrawing = useRef(false);
  const layerRef = useRef<Konva.Layer | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const port = window.location.port;
  const isAllowed = port === "5173"; // 학생or선생님 구분용

  useEffect(() => {
    //필기 데이터 수신
    socket.on("draw", (data: TLine) => {
      setLines((prev) => [...prev, data]);
    });

    socket.on("updateImage", (data: string) => {
      const img = new window.Image();
      img.src = data;
      img.onload = () => {
        setImage(img);
      };
    });

    socket.on("clearCanvas", handleClearCanvas);

    return () => {
      socket.off("draw");
      socket.off("clearCanvas");
      socket.off("updateImage");
    };
  }, []);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    if (!e.target || !isAllowed) return;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      const newLine = { tool, points: [pos.x, pos.y], brushColor };
      setLines([...lines, newLine]);
      socket.emit("draw", newLine);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current || !isAllowed) {
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
          socket.emit("updateImage", imgData);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    handleClearCanvas();
    socket.emit("clearCanvas");
  };

  return (
    <section id="container" className="flex h-full w-max items-start justify-center">
      <div id="board" className="mx-6 flex flex-col overflow-hidden rounded-2xl border bg-primary p-5">
        {isAllowed && (
          <>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <ToolsContainer onClear={handleClear} />
          </>
        )}
        <Stage
          id="canvas"
          className="rounded-xl bg-white"
          width={900}
          height={570}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}>
          <Layer ref={layerRef}>
            {image && <Image image={image} x={0} y={0} width={900} height={570} />}
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
