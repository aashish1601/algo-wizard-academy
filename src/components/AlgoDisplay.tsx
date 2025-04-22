
import React, { useEffect, useRef } from 'react';

interface AlgoDisplayProps {
  array: number[];
  comparisonIndices: number[];
  sortedIndices: number[];
}

const AlgoDisplay: React.FC<AlgoDisplayProps> = ({ 
  array, 
  comparisonIndices, 
  sortedIndices 
}) => {
  const maxValue = Math.max(...array, 1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={containerRef}
      className="w-full h-64 flex items-end justify-center gap-1 bg-gray-50 rounded-lg p-4 border border-gray-100"
    >
      {array.map((value, index) => {
        // Determine the bar's status
        const isComparing = comparisonIndices.includes(index);
        const isSorted = sortedIndices.includes(index);
        
        // Calculate height percentage
        const heightPercentage = (value / maxValue) * 100;
        
        return (
          <div
            key={index}
            className={`algo-node ${isComparing ? 'algo-node-compare' : ''} ${
              isSorted ? 'algo-node-sorted' : ''
            } flex-1 min-w-[5px] max-w-[50px]`}
            style={{ 
              height: `${heightPercentage}%`,
              backgroundColor: isComparing 
                ? '#fbbf24' // amber-400 
                : isSorted 
                  ? '#34d399' // emerald-400
                  : '#8b5cf6' // violet-500
            }}
          >
            {array.length < 15 && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">
                {value}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AlgoDisplay;
