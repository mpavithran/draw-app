import React, { useRef, useState, useEffect } from "react";

const DrawCanva: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctxRef.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = brushSize;
    setDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !ctxRef.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    if (ctxRef.current) {
      ctxRef.current.closePath();
    }
    setDrawing(false);
  };

  const clearCanvas = () => {
    if (ctxRef.current && canvasRef.current) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth - 100;
      canvas.height = window.innerHeight - 100;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctxRef.current = ctx;
      }
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center mx-auto relative">
      <div className="flex flex-col mt-[10px] absolute top-6 left-14 bg-white border border-black w-[20%] h-[80%] px-4 rounded-lg">
        <label className="font-bold text-lg mt-5">Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <label className="font-bold text-lg mt-5">Brush Size:</label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
        />
        <button
          className="w-fit mt-5 mx-auto px-2 py-1 font-bold text-lg text-center border border-blue-600 rounded-lg cursor-pointer"
          onClick={clearCanvas}
        >
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        className="border-1 border-black cursor-crosshair"
      />
    </div>
  );
};

export default DrawCanva;
