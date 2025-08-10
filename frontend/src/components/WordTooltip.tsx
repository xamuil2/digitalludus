import React, { useState, useRef, useEffect } from 'react';
import { type VocabWord } from '@/data/lessons';

interface WordTooltipProps {
  word: string;
  definition?: VocabWord;
  children: React.ReactNode;
  className?: string;
}

export function WordTooltip({ word, definition, children, className = '' }: WordTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const wordRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!definition) return;
    setIsVisible(true);

    // Position after the tooltip mounts so we can measure actual size
    requestAnimationFrame(() => {
      const wordEl = wordRef.current;
      const tipEl = tooltipRef.current;
      if (!wordEl || !tipEl) return;

      const rect = wordEl.getBoundingClientRect();
      const tipRect = tipEl.getBoundingClientRect();

      const padding = 10;
      let x = rect.left + rect.width / 2 - tipRect.width / 2;
      let y = rect.top - tipRect.height - padding;

      if (x < padding) x = padding;
      if (x + tipRect.width > window.innerWidth - padding) {
        x = window.innerWidth - tipRect.width - padding;
      }
      if (y < padding) {
        y = rect.bottom + padding; // place below
      }

      setPosition({ x, y });
    });
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!definition) return;
    
    // Toggle tooltip on click for mobile
    setIsVisible(!isVisible);
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wordRef.current && 
        tooltipRef.current &&
        !wordRef.current.contains(event.target as Node) &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible]);

  return (
    <>
      <span
        ref={wordRef}
        className={`
          ${definition ? 'cursor-pointer hover:bg-blue-100 hover:text-blue-800 hover:underline decoration-blue-400 decoration-2 underline-offset-2 transition-all duration-200 rounded-sm px-1 py-0.5' : ''}
          ${className}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        title={definition ? 'Click for definition' : undefined}
      >
        {children}
      </span>

      {/* Tooltip */}
      {isVisible && definition && (
        <div
          ref={tooltipRef}
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <div className="bg-white border border-slate-300 rounded-lg shadow-xl shadow-slate-200/50 p-4 max-w-sm pointer-events-auto animate-in fade-in-0 zoom-in-95 duration-200">
            {/* Arrow pointing to word */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-300"></div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-1px] w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            
            {/* Content */}
            <div className="space-y-3">
              {/* Latin word */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-slate-800 font-serif">
                  {definition.latin}
                </span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  {definition.partOfSpeech}
                </span>
              </div>

              {/* Principal parts */}
              {definition.principalParts && (
                <div className="text-xs text-slate-600 font-mono bg-slate-50 px-3 py-2 rounded border">
                  {definition.principalParts}
                </div>
              )}

              {/* English meaning */}
              <div className="font-medium text-slate-700 border-l-4 border-blue-400 pl-3">
                <em>{definition.english}</em>
              </div>

              {/* Additional info */}
              {definition.notes && (
                <div className="text-xs text-slate-600 bg-amber-50 border border-amber-200 rounded p-2">
                  <strong>Note:</strong> {definition.notes}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
