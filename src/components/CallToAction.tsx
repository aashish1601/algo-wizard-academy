
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <div className="w-full py-16 bg-wizard-gradient text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master Algorithms?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of learners who've transformed their understanding of DSA through visual learning.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/visualizer"
            className="px-8 py-4 bg-white text-wizard-accent font-bold rounded-lg hover:bg-opacity-90 transition-all"
          >
            Start Visualizing
          </Link>
          <Link 
            to="/learn"
            className="px-8 py-4 bg-transparent border-2 border-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
          >
            Explore Tutorials
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
