import { CatIcon } from 'lucide-react';
import { useLanguage } from '../i18n';

export function Hero() {
  const { t } = useLanguage();

  const scrollToAchievements = () => {
    const achievementsSection = document.getElementById('our-robot'); // scroll to out robot instead hehe
    if (achievementsSection) {
      const offset = -80; // Adjust this value to ensure the title is visible
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = achievementsSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition + offset;
    
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
      <div className="text-center space-y-8 px-4">
        <div className="animate-float">
          <CatIcon className="h-24 w-24 mx-auto text-pink-400" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
          <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            {t('hero.titlePrefix')}
          </span>{' '}
          {t('hero.titleSuffix')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('hero.descriptionPrefix')}
          <a href="https://www.westernmech.ca/" className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
            WestMech Robotics
            <svg className="ms-2 h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
          {t('hero.descriptionSuffix')}
        </p>
        
        <button 
          onClick={scrollToAchievements}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
        >
          {t('hero.cta')}
        </button>
      </div>
    </div>
  );
}