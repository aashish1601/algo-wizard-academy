
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LearnPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Learning Center</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore tutorials, explanations, and interactive lessons on data structures and algorithms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="wizard-card p-6">
              <h2 className="text-2xl font-bold mb-4">🔄 Sorting Algorithms</h2>
              <p className="text-gray-600 mb-4">
                Learn about different ways to sort data and when to use each algorithm.
              </p>
              <a href="#" className="text-wizard-accent font-medium hover:underline">Explore Sorting →</a>
            </div>
            
            <div className="wizard-card p-6">
              <h2 className="text-2xl font-bold mb-4">🔍 Searching Algorithms</h2>
              <p className="text-gray-600 mb-4">
                Discover efficient ways to find elements in various data structures.
              </p>
              <a href="#" className="text-wizard-accent font-medium hover:underline">Explore Searching →</a>
            </div>
            
            <div className="wizard-card p-6">
              <h2 className="text-2xl font-bold mb-4">📊 Data Structures</h2>
              <p className="text-gray-600 mb-4">
                Understand the building blocks that store and organize data.
              </p>
              <a href="#" className="text-wizard-accent font-medium hover:underline">Explore Data Structures →</a>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Learning Path</h2>
            <p className="text-gray-600 mb-6">
              Follow our recommended learning path to master algorithms step by step.
            </p>
            
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
              
              <div className="relative mb-8 pl-12">
                <div className="absolute left-0 w-8 h-8 bg-wizard-accent rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h3 className="text-xl font-bold">Basic Data Structures</h3>
                  <p className="text-gray-600">Start with the fundamentals: arrays, linked lists, stacks, and queues.</p>
                </div>
              </div>
              
              <div className="relative mb-8 pl-12">
                <div className="absolute left-0 w-8 h-8 bg-wizard-accent rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <h3 className="text-xl font-bold">Simple Sorting Algorithms</h3>
                  <p className="text-gray-600">Learn basic sorting techniques: bubble sort, selection sort, and insertion sort.</p>
                </div>
              </div>
              
              <div className="relative mb-8 pl-12">
                <div className="absolute left-0 w-8 h-8 bg-wizard-accent rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <h3 className="text-xl font-bold">Searching Algorithms</h3>
                  <p className="text-gray-600">Master linear and binary search techniques.</p>
                </div>
              </div>
              
              <div className="relative mb-8 pl-12">
                <div className="absolute left-0 w-8 h-8 bg-wizard-accent rounded-full flex items-center justify-center text-white font-bold">4</div>
                <div>
                  <h3 className="text-xl font-bold">Advanced Data Structures</h3>
                  <p className="text-gray-600">Dive into trees, graphs, and hash tables.</p>
                </div>
              </div>
              
              <div className="relative pl-12">
                <div className="absolute left-0 w-8 h-8 bg-wizard-accent rounded-full flex items-center justify-center text-white font-bold">5</div>
                <div>
                  <h3 className="text-xl font-bold">Advanced Algorithms</h3>
                  <p className="text-gray-600">Tackle complex algorithms like dynamic programming, greedy algorithms, and more.</p>
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

export default LearnPage;
