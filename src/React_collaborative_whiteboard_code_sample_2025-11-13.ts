import React, { useRef, useState, useEffect } from 'react';

interface Point { x: number; y: number; }

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [color, setColor] = useState<string>('black');
  const [lineWidth, setLineWidth] = useState<number>(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < points.length - 1; i++) {
      if (!points[i] || !points[i + 1]) continue;
      context.beginPath();
      context.moveTo(points[i].x, points[i].y);
      context.lineTo(points[i + 1].x, points[i + 1].y);
      context.stroke();
    }

  }, [points, color, lineWidth]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    setPoints([...points, { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }]);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    setPoints([...points, { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }]);
  };

  const handleMouseLeave = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    setPoints([]);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <div>
        <button onClick={clearCanvas}>Clear</button>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <input type="number" value={lineWidth} onChange={(e) => setLineWidth(parseInt(e.target.value))} />
      </div>
    </div>
  );
};

export default Whiteboard;