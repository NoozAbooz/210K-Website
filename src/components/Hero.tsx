import React from 'react';
import { RocketIcon } from 'lucide-react';

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
      <div className="text-center space-y-8 px-4">
        <div className="animate-float">
          <RocketIcon className="h-24 w-24 mx-auto text-pink-400" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
          <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            Innovation
          </span>{' '}
          Through Robotics
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We are Team 1234, a passionate group of students pushing the boundaries
          of robotics engineering and competitive excellence.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105">
          Join Our Journey
        </button>
      </div>
    </div>
  );
}