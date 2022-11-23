import React, { useState } from "react";
import "./App.css";

type Point = {
  x: number;
  y: number;
};

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [popped, setPopped] = useState<Point[]>([]);

  function handlePlaceCircle(e: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX, y: clientY }]);
  }

  function handleUndo() {
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    if (!poppedPoint) return;
    setPopped([...popped, poppedPoint]);
    setPoints(newPoints);
  }

  function handleRedo() {
    const newPopped = [...popped];
    const poppedPoint = newPopped.pop();
    if (!poppedPoint) return;
    setPoints([...points, poppedPoint]);
    setPopped(newPopped);
  }

  return (
    <>
      <button onClick={handleUndo} disabled={points.length === 0}>
        Undo
      </button>
      <button onClick={handleRedo} disabled={popped.length === 0}>
        Redo
      </button>
      <div className="App" onClick={handlePlaceCircle}>
        {points.map((point, idx) => (
          <div
            key={idx}
            className="point"
            style={{
              left: point.x - 8,
              top: point.y - 8,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
