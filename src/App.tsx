import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Achievements } from './components/Achievements';
import { Events } from './components/Events';
import { PhotoGallery } from './components/PhotoGallery';
import './styles/animations.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Achievements />
      <PhotoGallery />
      <Events />
    </div>
  );
}

export default App;