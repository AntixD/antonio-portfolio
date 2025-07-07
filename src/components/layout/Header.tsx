'use client';

import React, { memo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '../../hooks/useActiveSection';
import { NAVIGATION_ITEMS } from '../../data/constants';
import { personalInfo } from '../../data/personalInfo';
import { usePortfolio } from '@/context/PortfolioContext';

const Header: React.FC = memo(() => {
  const { scrollToSection } = usePortfolio();
  const activeSection = useActiveSection([...NAVIGATION_ITEMS]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleNavClick = (item: string) => {
    scrollToSection(item);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <DesktopNavigation
            activeSection={activeSection}
            onNavClick={handleNavClick}
          />
          <MobileMenuButton
            isOpen={mobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
    </nav>
  );
});

const Logo: React.FC = memo(() => (
  <div className="font-bold text-xl bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
    {personalInfo.name}
  </div>
));

const DesktopNavigation: React.FC<{
  activeSection: string;
  onNavClick: (item: string) => void;
}> = memo(({ activeSection, onNavClick }) => (
  <div className="hidden md:flex space-x-8">
    {NAVIGATION_ITEMS.map((item) => (
      <button
        key={item}
        onClick={() => onNavClick(item)}
        className={`capitalize transition-all duration-300 cursor-pointer hover:text-cyan-400 ${
          activeSection === item ? 'text-cyan-400' : 'text-gray-300'
        }`}
      >
        {item}
      </button>
    ))}
  </div>
));

const MobileMenuButton: React.FC<{
  isOpen: boolean;
  onClick: () => void;
}> = memo(({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="md:hidden p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
    aria-label="Toggle mobile menu"
  >
    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
  </button>
));

const MobileMenu: React.FC<{
  isOpen: boolean;
  activeSection: string;
  onNavClick: (item: string) => void;
}> = memo(({ isOpen, activeSection, onNavClick }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-gray-800/50">
      <div className="px-4 py-6 space-y-4">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => onNavClick(item)}
            className={`block w-full text-left capitalize transition-all duration-300 hover:text-cyan-400 ${
              activeSection === item ? 'text-cyan-400' : 'text-gray-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
});

Header.displayName = 'Header';
Logo.displayName = 'Logo';
DesktopNavigation.displayName = 'DesktopNavigation';
MobileMenuButton.displayName = 'MobileMenuButton';
MobileMenu.displayName = 'MobileMenu';

export default Header;
