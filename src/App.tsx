import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Achievements } from './components/Achievements';
import { Events } from './components/Events';
import './styles/animations.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Achievements />
      <Events />
    </div>
  );
}

export default App;