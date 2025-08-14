import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RevealsAndRecaps } from './components/RevealsAndRecaps';
import { Achievements } from './components/Achievements';
import { Events } from './components/Events';
import { PhotoGallery } from './components/PhotoGallery';
import { Footer } from './components/Footer';
import './styles/animations.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Achievements />
        <RevealsAndRecaps />
        <PhotoGallery />
        <Events />
      </main>
      <Footer />
    </div>
  );
}

export default App;