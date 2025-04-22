
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-4 px-6 md:px-12 flex justify-between items-center bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-wizard-gradient">
          AlgoWizard
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-gray-700 hover:text-wizard-accent transition-colors">Home</Link>
        <Link to="/visualizer" className="text-gray-700 hover:text-wizard-accent transition-colors">Visualizer</Link>
        <Link to="/learn" className="text-gray-700 hover:text-wizard-accent transition-colors">Learn</Link>
        <Link to="/challenges" className="text-gray-700 hover:text-wizard-accent transition-colors">Challenges</Link>
      </div>
      
      <div>
        <button className="wizard-btn">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
