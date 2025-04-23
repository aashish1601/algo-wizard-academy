import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CodeSubmission from '../components/CodeSubmission';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Star, Clock, Award } from 'lucide-react';
import { AuthProvider } from "../context/AuthContext";
import AuthSection from "../components/AuthSection";

const LearnPage: React.FC = () => {
  const currentProblem = {
    title: "Implement Bubble Sort",
    description: "Write a function that implements the bubble sort algorithm. The function should take an array of numbers as input and return the sorted array. Your algorithm will be tested for correctness and performance using AWS Lambda.",
    example: `Input: [64, 34, 25, 12, 22, 11, 90]
Output: [11, 12, 22, 25, 34, 64, 90]

function bubbleSort(arr) {
  // Your code here
  // Make sure to return the sorted array
}`,
    expectedOutput: "[11, 12, 22, 25, 34, 64, 90]",
    timeLimit: 500
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="flex items-center justify-between mb-6">
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold mb-4">Learning Center</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Practice implementing algorithms and get instant feedback on your solutions powered by AWS.
                </p>
              </div>
              <AuthSection />
            </div>
            
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <CodeSubmission problem={currentProblem} />
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                    Leaderboard
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Top performers for this challenge
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      { name: "Alex", score: 98, time: 240 },
                      { name: "Taylor", score: 95, time: 283 },
                      { name: "Jamie", score: 92, time: 310 }
                    ].map((user, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-bold">{i+1}</span>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            {user.score}/100
                          </span>
                          <span className="text-xs text-gray-500">
                            {user.time}ms
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <span className="text-sm text-wizard-accent hover:underline cursor-pointer">
                      View full leaderboard →
                    </span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-indigo-500" />
                    Daily Challenge
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    New challenge unlocks in 5:45:32
                  </p>
                  
                  <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                    <h4 className="font-medium text-sm">Implement Quick Sort</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-600">Difficulty: Hard</span>
                      <div className="flex">
                        <Star className="h-3 w-3 text-amber-400" />
                        <Star className="h-3 w-3 text-amber-400" />
                        <Star className="h-3 w-3 text-amber-400" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <Award className="mr-2 h-5 w-5 text-emerald-500" />
                    Your Achievements
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Login with Amazon Cognito to track your progress
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Algorithm Apprentice", desc: "Solve 5 problems", unlocked: true },
                      { name: "Speed Demon", desc: "Solve under 200ms", unlocked: true },
                      { name: "Code Ninja", desc: "Perfect score", unlocked: false },
                      { name: "Consistency King", desc: "7-day streak", unlocked: false }
                    ].map((badge, i) => (
                      <div 
                        key={i} 
                        className={`border rounded-lg p-2 text-center ${
                          badge.unlocked ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200 opacity-60'
                        }`}
                      >
                        <div className="text-xs font-semibold mb-1">
                          {badge.name}
                        </div>
                        <div className="text-[10px] text-gray-600">
                          {badge.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-4 text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                    Sign in to Sync Progress
                  </button>
                </div>
              </div>
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
    </AuthProvider>
  );
};

export default LearnPage;
