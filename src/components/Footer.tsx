import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gradient-to-br from-pink-50 to-white text-center">
      <div className="container mx-auto px-4">
        <p className="text-gray-600">
          Made with <span className="text-pink-500">💖</span> by {' '}
          <a 
            href="https://github.com/NoozAbooz/210K-Website" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600 transition-colors"
          >
            Nooz
          </a>
        </p>
      </div>
    </footer>
  );
}
