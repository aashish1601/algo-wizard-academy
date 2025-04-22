
import React, { useState, useEffect } from 'react';
import AlgoControls from './AlgoControls';
import AlgoDisplay from './AlgoDisplay';
import { generateRandomArray } from '../utils/arrayUtils';

type AlgorithmType = 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick';

const AlgoVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(20);
  const [speed, setSpeed] = useState<number>(50);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [comparisonIndices, setComparisonIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    const newArray = generateRandomArray(arraySize, 5, 100);
    setArray(newArray);
    setCurrentStep(0);
    setComparisonIndices([]);
    setSortedIndices([]);
  };

  const runAlgorithm = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setComparisonIndices([]);
    setSortedIndices([]);
    
    try {
      if (algorithm === 'bubble') {
        await runBubbleSort();
      } else if (algorithm === 'insertion') {
        await runInsertionSort();
      } else if (algorithm === 'selection') {
        await runSelectionSort();
      } else if (algorithm === 'merge') {
        // For now, we'll use a simpler algorithm
        await runBubbleSort();
      } else if (algorithm === 'quick') {
        // For now, we'll use a simpler algorithm
        await runBubbleSort();
      }
    } finally {
      setIsRunning(false);
      // Mark all indices as sorted when algorithm completes
      setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
      setComparisonIndices([]);
    }
  };

  const runBubbleSort = async () => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Set current comparison
        setComparisonIndices([j, j + 1]);
        
        // Wait according to speed setting
        await new Promise(resolve => setTimeout(resolve, 100 - speed));
        
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap
          const temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;
          
          // Update array in state to cause re-render
          setArray([...arrayCopy]);
        }
      }
      
      // Mark current index as sorted
      setSortedIndices(prevSorted => [...prevSorted, n - i - 1]);
    }
  };

  const runInsertionSort = async () => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;
    
    for (let i = 1; i < n; i++) {
      let key = arrayCopy[i];
      let j = i - 1;
      
      // Set current element being inserted
      setComparisonIndices([i]);
      await new Promise(resolve => setTimeout(resolve, 100 - speed));
      
      while (j >= 0 && arrayCopy[j] > key) {
        setComparisonIndices([j, j + 1]);
        await new Promise(resolve => setTimeout(resolve, 100 - speed));
        
        arrayCopy[j + 1] = arrayCopy[j];
        j--;
        
        setArray([...arrayCopy]);
      }
      
      arrayCopy[j + 1] = key;
      setArray([...arrayCopy]);
      
      // Mark as sorted
      setSortedIndices(prevSorted => [...prevSorted, i]);
    }
  };

  const runSelectionSort = async () => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;
    
    for (let i = 0; i < n; i++) {
      let minIdx = i;
      
      // Set current minimum
      setComparisonIndices([minIdx]);
      await new Promise(resolve => setTimeout(resolve, 100 - speed));
      
      for (let j = i + 1; j < n; j++) {
        // Compare current with minimum
        setComparisonIndices([minIdx, j]);
        await new Promise(resolve => setTimeout(resolve, 100 - speed));
        
        if (arrayCopy[j] < arrayCopy[minIdx]) {
          minIdx = j;
          setComparisonIndices([minIdx]);
          await new Promise(resolve => setTimeout(resolve, 100 - speed));
        }
      }
      
      // Swap
      if (minIdx !== i) {
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[minIdx];
        arrayCopy[minIdx] = temp;
        
        setArray([...arrayCopy]);
      }
      
      // Mark as sorted
      setSortedIndices(prevSorted => [...prevSorted, i]);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-lg">
      <AlgoControls 
        arraySize={arraySize} 
        setArraySize={setArraySize}
        speed={speed}
        setSpeed={setSpeed}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        onReset={resetArray}
        onRun={runAlgorithm}
        isRunning={isRunning}
      />
      <AlgoDisplay 
        array={array} 
        comparisonIndices={comparisonIndices}
        sortedIndices={sortedIndices}
      />
    </div>
  );
};

export default AlgoVisualizer;
