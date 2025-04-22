
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">AlgoWizard</h3>
            <p className="text-sm text-gray-400">
              Making data structures and algorithms accessible, visual, and fun to learn.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/learn/sorting" className="hover:text-wizard-accent transition-colors">Sorting Algorithms</Link></li>
              <li><Link to="/learn/searching" className="hover:text-wizard-accent transition-colors">Searching Algorithms</Link></li>
              <li><Link to="/learn/data-structures" className="hover:text-wizard-accent transition-colors">Data Structures</Link></li>
              <li><Link to="/learn/advanced" className="hover:text-wizard-accent transition-colors">Advanced Topics</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/visualizer" className="hover:text-wizard-accent transition-colors">Algorithm Visualizer</Link></li>
              <li><Link to="/playground" className="hover:text-wizard-accent transition-colors">Code Playground</Link></li>
              <li><Link to="/challenges" className="hover:text-wizard-accent transition-colors">Challenges</Link></li>
              <li><Link to="/leaderboard" className="hover:text-wizard-accent transition-colors">Leaderboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-wizard-accent transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-wizard-accent transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-wizard-accent transition-colors">Discord Community</a></li>
              <li><a href="#" className="hover:text-wizard-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AlgoWizard Academy. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-wizard-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-wizard-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
