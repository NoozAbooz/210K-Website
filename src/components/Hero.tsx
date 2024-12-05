import React from 'react';
import { CatIcon } from 'lucide-react';

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
      <div className="text-center space-y-8 px-4">
        <div className="animate-float">
          <CatIcon className="h-24 w-24 mx-auto text-pink-400" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
          <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            Kawaii
          </span>{' '}
          Kittens
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We are Team 210K, a passionate group of robotics students from
          Alberta, Canada affiliated with Western Mechatronics Robotics Club.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105">
          Meow meow
        </button>
      </div>
    </div>
  );
}
