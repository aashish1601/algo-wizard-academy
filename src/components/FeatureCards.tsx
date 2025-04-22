
import React from 'react';

const FeatureCards: React.FC = () => {
  const features = [
    {
      title: 'Interactive Visualizations',
      description: 'Watch algorithms sort, search, and traverse in real-time with color-coded animations',
      icon: '✨'
    },
    {
      title: 'Step-By-Step Breakdown',
      description: 'Understand each step with detailed explanations and visual cues',
      icon: '🔍'
    },
    {
      title: 'Control The Process',
      description: 'Adjust speed, input size, and algorithm type to explore different scenarios',
      icon: '🎮'
    },
    {
      title: 'Learn by Doing',
      description: 'Experiment with different algorithms and watch how they perform',
      icon: '🧠'
    }
  ];

  return (
    <div className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why AlgoWizard Academy?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learning algorithms doesn't have to be intimidating. 
            Our interactive platform makes complex concepts accessible and fun.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="wizard-card p-6 flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
