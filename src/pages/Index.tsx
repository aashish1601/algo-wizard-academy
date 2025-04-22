
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureCards from '../components/FeatureCards';
import AlgorithmSection from '../components/AlgorithmSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <FeatureCards />
      <AlgorithmSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
