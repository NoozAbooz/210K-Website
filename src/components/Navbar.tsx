import React from 'react';

export function Navbar() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-32 items-center">
          <div className="flex justify-center items-center space-x-5">
            <div 
              className="w-[150px] h-[150px] bg-gradient-to-r from-pink-300 to-pink-600"
              style={{
                maskImage: 'url(/assets/logo2.png)',
                WebkitMaskImage: 'url(/assets/logo2.png)',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }}
            />
          </div>
          <div className="hidden md:flex space-x-8">
            <NavLink href="#our-robot">Our Robot</NavLink>
            <NavLink href="#achievements">Achievements</NavLink>
            <NavLink href="#reveals-and-recaps">Reveals & Recaps</NavLink>
            <NavLink href="#events">Events</NavLink>
            <NavLink href="https://210k.westernmech.ca/path/">PathPlanner</NavLink>
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
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle internal links (those starting with #)
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // x pixels above the element
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
    // External links (like PathPlanner) will work normally
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-gray-600 hover:text-pink-500 transition-colors duration-200 font-medium cursor-pointer"
    >
      {children}
    </a>
  );
}
