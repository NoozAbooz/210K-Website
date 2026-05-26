import React from 'react';
import { Languages } from 'lucide-react';
import { LANGUAGE_OPTIONS, useLanguage, type Language } from '../i18n';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-32 items-center gap-4">
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
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex space-x-8">
              <NavLink href="#our-robot">{t('nav.ourRobot')}</NavLink>
              <NavLink href="#achievements">{t('nav.achievements')}</NavLink>
              <NavLink href="#reveals-and-recaps">{t('nav.revealsAndRecaps')}</NavLink>
              <NavLink href="#events">{t('nav.events')}</NavLink>
              <NavLink href="https://210k.westernmech.ca/path/">{t('nav.pathPlanner')}</NavLink>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-pink-100 bg-white/90 px-3 py-2 shadow-sm">
              <Languages className="h-4 w-4 text-pink-500" />
              <label htmlFor="language-select" className="sr-only">
                {t('nav.language')}
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
                className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer"
              >
                {LANGUAGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
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
