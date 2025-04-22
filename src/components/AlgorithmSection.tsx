
import React from 'react';
import { Link } from 'react-router-dom';

const AlgorithmSection: React.FC = () => {
  const algorithms = [
    {
      category: 'Sorting',
      algorithms: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort']
    },
    {
      category: 'Searching',
      algorithms: ['Linear Search', 'Binary Search', 'Depth-First Search', 'Breadth-First Search']
    },
    {
      category: 'Data Structures',
      algorithms: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Hash Tables']
    },
    {
      category: 'Advanced',
      algorithms: ['Dynamic Programming', 'Greedy Algorithms', 'Backtracking', 'Divide & Conquer']
    }
  ];

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Algorithms</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dive into our extensive library of algorithm visualizations and interactive tutorials.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {algorithms.map((category, index) => (
            <div 
              key={index}
              className="wizard-card overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-4 bg-wizard-gradient text-white font-bold text-lg">
                {category.category}
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {category.algorithms.map((algo, algoIndex) => (
                    <li key={algoIndex} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-wizard-purple mr-2" />
                      <Link 
                        to={`/learn/${category.category.toLowerCase()}/${algo.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-700 hover:text-wizard-accent transition-colors"
                      >
                        {algo}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/learn" 
            className="inline-flex items-center wizard-btn"
          >
            <span>View All Algorithms</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2 animate-bounce-right" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmSection;
