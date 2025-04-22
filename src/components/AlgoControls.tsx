
import React from 'react';
import { Slider } from '../components/ui/slider';

type AlgorithmType = 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick';

interface AlgoControlsProps {
  arraySize: number;
  setArraySize: (size: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
  onReset: () => void;
  onRun: () => void;
  isRunning: boolean;
}

const AlgoControls: React.FC<AlgoControlsProps> = ({
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  algorithm,
  setAlgorithm,
  onReset,
  onRun,
  isRunning
}) => {
  const algorithms = [
    { value: 'bubble', label: 'Bubble Sort' },
    { value: 'insertion', label: 'Insertion Sort' },
    { value: 'selection', label: 'Selection Sort' },
    { value: 'merge', label: 'Merge Sort' },
    { value: 'quick', label: 'Quick Sort' }
  ];

  return (
    <div className="w-full flex flex-col gap-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Array Size: {arraySize}</label>
          <Slider
            value={[arraySize]}
            min={5}
            max={50}
            step={1}
            onValueChange={(value) => setArraySize(value[0])}
            disabled={isRunning}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Speed: {speed}%</label>
          <Slider
            value={[speed]}
            min={1}
            max={99}
            step={1}
            onValueChange={(value) => setSpeed(value[0])}
            disabled={isRunning}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Algorithm</label>
          <div className="flex flex-wrap gap-2">
            {algorithms.map(algo => (
              <button
                key={algo.value}
                className={`px-3 py-2 text-sm rounded-lg transition-all ${
                  algorithm === algo.value 
                    ? 'bg-wizard-accent text-white font-medium' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => setAlgorithm(algo.value as AlgorithmType)}
                disabled={isRunning}
              >
                {algo.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-4">
        <button
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all"
          onClick={onReset}
          disabled={isRunning}
        >
          Reset Array
        </button>
        
        <button
          className="wizard-btn"
          onClick={onRun}
          disabled={isRunning}
        >
          {isRunning ? 'Sorting...' : 'Start Sorting'}
        </button>
      </div>
    </div>
  );
};

export default AlgoControls;
