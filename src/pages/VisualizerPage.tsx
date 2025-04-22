
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AlgoVisualizer from '../components/AlgoVisualizer';

const VisualizerPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Algorithm Visualizer</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch algorithms in action and understand how they work through visual representation.
            </p>
          </div>
          
          <AlgoVisualizer />
          
          <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">How to Use This Visualizer</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="font-bold text-lg mb-2">1. Choose Parameters</div>
                <p className="text-gray-600">
                  Adjust the array size and sorting speed using the sliders. Select an algorithm from the options.
                </p>
              </div>
              
              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="font-bold text-lg mb-2">2. Generate Array</div>
                <p className="text-gray-600">
                  Click "Reset Array" to generate a new random array with the selected size.
                </p>
              </div>
              
              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="font-bold text-lg mb-2">3. Start Sorting</div>
                <p className="text-gray-600">
                  Click "Start Sorting" and watch as the algorithm organizes the elements in ascending order.
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-bold mb-2">Color Legend:</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-wizard-accent mr-2"></div>
                  <span>Unsorted Element</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-400 mr-2"></div>
                  <span>Elements Being Compared</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-emerald-400 mr-2"></div>
                  <span>Sorted Element</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VisualizerPage;
