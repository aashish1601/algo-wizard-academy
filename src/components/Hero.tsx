
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="w-full py-16 md:py-24 bg-wizard-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Master <span className="bg-clip-text text-transparent bg-wizard-gradient">Algorithms</span> Through Interactive Visualizations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Turn abstract concepts into vibrant, interactive experiences. Watch algorithms come to life, experiment with different inputs, and deepen your understanding through visual learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/visualizer" className="wizard-btn">
                Try Algorithm Visualizer
              </Link>
              <Link to="/learn" className="px-6 py-3 rounded-lg border border-wizard-purple text-wizard-purple hover:bg-wizard-purple/5 transition-colors font-medium">
                Start Learning
              </Link>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md p-6 wizard-card wizard-glow">
              <div className="bg-gray-50 rounded-lg p-4 h-[300px] flex items-end justify-center gap-1 mb-6">
                {[30, 45, 20, 65, 10, 50, 35, 60, 25, 40].map((height, index) => (
                  <div 
                    key={index}
                    className={`animate-float flex-1 rounded-t-sm ${
                      index % 3 === 0 ? 'bg-wizard-accent' : 
                      index % 3 === 1 ? 'bg-wizard-blue' : 'bg-wizard-purple'
                    }`}
                    style={{ 
                      height: `${height}%`, 
                      animationDelay: `${index * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg bg-wizard-accent animate-pulse" style={{ animationDelay: '0.1s' }} />
                  <div className="w-8 h-8 rounded-lg bg-wizard-purple animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-8 h-8 rounded-lg bg-wizard-blue animate-pulse" style={{ animationDelay: '0.3s' }} />
                </div>
                <button className="px-4 py-2 rounded-lg bg-wizard-purple text-white font-medium">Sort</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
