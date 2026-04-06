'use client';
import React, { useState, useRef } from 'react';
import Button from '../ui/Button';

type ZoomProviderProps = {
  children?: React.ReactNode;
};

const ZoomProvider = ({ children }: ZoomProviderProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Auto-fit Logic: Calculates scale based on container vs content dimensions
  const autoFit = () => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const content = contentRef.current.getBoundingClientRect();

    // Calculate ratio to fit content within container
    const scaleX = container.width / (content.width / scale);
    const scaleY = container.height / (content.height / scale);
    const fitScale = Math.min(scaleX, scaleY);

    setScale(fitScale);
    setPosition({ x: 0, y: 0 }); // Center the content
  };

  // Slider change handler
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  // --- PANNING LOGIC ---
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    // Record where the mouse started relative to the current image position
    setStartPan({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    // Calculate new position based on mouse movement
    setPosition({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          width: '100%',
          height: 'calc(100vh - 200px)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <div
          ref={contentRef}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            transformOrigin: 'center center', // Easier for slider-based zoom
          }}
        >
          {children}
        </div>
      </div>
      {/* Controls: Slider & Auto-Fit Button */}
      <div className="mx-auto mt-5 flex w-fit items-center gap-2">
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={scale}
          onChange={handleSliderChange}
        />
        <span>{(scale * 100).toFixed(0)}%</span>
        <Button onClick={autoFit} theme="secondary" size="sm" className="w-fit">
          Auto Fit
        </Button>
      </div>
      <p className="py-2 text-center text-xs text-gray-400">
        Click and drag to pan when zoomed in.
      </p>
    </>
  );
};

export default ZoomProvider;
