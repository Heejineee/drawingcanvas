import React, { useEffect, useRef, useState } from "react";

function App() {
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    init();
  }, []);

  const canvasInformRef = useRef({
    width: 0,
    height: 0,
    pixelRatio: window.devicePixelRatio > 1 ? 2 : 1,
  });

  const canvasSizeSetting = (width, height) => {
    if (!canvasRef.current) return;

    const resultWidth = width * canvasInformRef.current.pixelRatio;
    const resultHeight = height * canvasInformRef.current.pixelRatio;
    canvasRef.current.width = resultWidth;
    canvasRef.current.height = resultHeight;
    canvasInformRef.current.width = resultWidth;
    canvasInformRef.current.height = resultHeight;
  };

  const canvasContextSetting = (context) => {
    if (!context) return;
    context.scale(
      canvasInformRef.current.pixelRatio,
      canvasInformRef.current.pixelRatio
    );
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;
  };

  const init = () => {
    if (!canvasRef.current) return;
    const { innerWidth, innerHeight } = window;
    canvasSizeSetting(innerWidth, innerHeight);
    const getContext = canvasRef.current.getContext("2d");
    if (!getContext) return;
    canvasContextSetting(getContext);
  };

  const handlePointerDown = ({ nativeEvent }) => {
    setIsDrawing(true);
    if (!contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
  };

  const handlePointerMove = ({ nativeEvent }) => {
    if (!isDrawing || !contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    if (!contextRef.current) return;
    contextRef.current.closePath();
  };

  return (
    <div className="container">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      ></canvas>
    </div>
  );
}

export default App;
