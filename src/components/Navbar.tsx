import React from 'react';
import { CatIcon } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-32 items-center">
          <div className="flex justify-center items-center space-x-5">
            <img
              src="https://210k.westernmech.ca/assets/logo.png"
              alt="image"
              width={100}
              height={100}
            />
            <span className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
              210K
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <NavLink href="#achievements">Achievements</NavLink>
            <NavLink href="#photos">Photos</NavLink>
            <NavLink href="#events">Events</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-pink-500 transition-colors duration-200 font-medium"
    >
      {children}
    </a>
  );
}
