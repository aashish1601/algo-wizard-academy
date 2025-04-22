
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ChallengesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Algorithm Challenges</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Test your skills with interactive coding challenges and algorithm puzzles.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="text-yellow-500 mr-2">⭐</span> 
              Daily Challenge
            </h2>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-xl mb-2">Two Sum</h3>
              <p className="text-gray-600 mb-4">
                Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
              </p>
              <div className="flex justify-end">
                <button className="wizard-btn">
                  Solve Challenge
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-500">
                Difficulty: Easy
              </div>
              <div className="text-gray-500">
                Time remaining: 23:45:12
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Challenge Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="wizard-card overflow-hidden">
              <div className="p-4 bg-emerald-500 text-white font-bold">Beginner</div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Perfect for those just starting with algorithms. Simple problems with clear solutions.</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>15 Challenges</span>
                  <span>~10 min each</span>
                </div>
                <button className="mt-4 w-full py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                  Start Beginner Challenges
                </button>
              </div>
            </div>
            
            <div className="wizard-card overflow-hidden">
              <div className="p-4 bg-amber-500 text-white font-bold">Intermediate</div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">For those with basic algorithm knowledge. More complex problems requiring deeper thinking.</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>20 Challenges</span>
                  <span>~20 min each</span>
                </div>
                <button className="mt-4 w-full py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                  Start Intermediate Challenges
                </button>
              </div>
            </div>
            
            <div className="wizard-card overflow-hidden">
              <div className="p-4 bg-rose-500 text-white font-bold">Advanced</div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">For algorithm experts. Complex problems that require optimal solutions and deep CS knowledge.</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>12 Challenges</span>
                  <span>~30 min each</span>
                </div>
                <button className="mt-4 w-full py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                  Start Advanced Challenges
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left">Rank</th>
                    <th className="py-3 text-left">User</th>
                    <th className="py-3 text-left">Challenges Completed</th>
                    <th className="py-3 text-left">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: 1, user: 'AlgoMaster', challenges: 45, points: 2840 },
                    { rank: 2, user: 'CodeWizard', challenges: 42, points: 2720 },
                    { rank: 3, user: 'SortingQueen', challenges: 39, points: 2650 },
                    { rank: 4, user: 'RecursionKing', challenges: 38, points: 2590 },
                    { rank: 5, user: 'GraphHacker', challenges: 36, points: 2480 }
                  ].map((user) => (
                    <tr key={user.rank} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3">#{user.rank}</td>
                      <td className="py-3 font-medium">{user.user}</td>
                      <td className="py-3">{user.challenges}</td>
                      <td className="py-3 font-bold text-wizard-accent">{user.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button className="text-wizard-accent hover:underline">
                View Full Leaderboard
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChallengesPage;
