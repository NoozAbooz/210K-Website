import React from 'react';
import { useLanguage } from '../i18n';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-6 bg-gradient-to-br from-pink-50 to-white text-center">
      <div className="container mx-auto px-4">
        <p className="text-gray-600">
          {t('footer.madeWith')} <span className="text-pink-500">💖</span> {t('footer.onGitHub')} {' '}
          <a 
            href="https://github.com/NoozAbooz/210K-Website" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600 transition-colors"
          >
            GitHub 
          </a>
          . © Michael Zheng (NoozAbooz) 2024-2026
        </p>
      </div>
    </footer>
  );
}
