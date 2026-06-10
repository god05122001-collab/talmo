/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage, className = '' }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleContainerClick}
      className={`relative select-none overflow-hidden rounded-2xl border border-slate-100 shadow-sm cursor-ew-resize ${className}`}
      style={{ aspectRatio: '4/3', width: '100%', maxWidth: '500px', margin: '0 auto' }}
    >
      {/* Bottom Layer: After Image (shows on the right side when top layer is clipped) */}
      <img 
        src={afterImage} 
        alt="Simulated Hairline" 
        className="absolute top-0 left-0 w-full h-full object-contain bg-slate-900 pointer-events-none"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-3 right-3 bg-blue-600/80 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md z-10 backdrop-blur-xs font-mono">
        After
      </div>

      {/* Top Layer: Before Image (clipped to left side depending on sliderPosition) */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={beforeImage} 
          alt="Original Hairline" 
          className="w-full h-full object-contain bg-slate-900"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute top-3 left-3 bg-slate-900/70 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md z-10 backdrop-blur-xs font-mono">
        Before
      </div>

      {/* Divider and Drag Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="w-8 h-8 rounded-full bg-white text-slate-700 shadow-md flex items-center justify-center border border-slate-200 pointer-events-none scale-90 sm:scale-100 hover:scale-110 active:scale-95 transition-transform">
          <svg className="w-4 h-4 text-slate-500 fill-current" viewBox="0 0 24 24">
            <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
