import React, { memo } from 'react';
import { personalInfo } from '../../data/personalInfo';
import SocialLinks from '../ui/SocialLinks';

const Footer: React.FC = memo(() => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50 bg-black/20 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <FooterInfo />
          <SocialLinks />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
});

const FooterInfo: React.FC = memo(() => (
  <div className="text-center md:text-left">
    <h3 className="font-bold text-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
      {personalInfo.name}
    </h3>
    <p className="text-sm text-gray-400">{personalInfo.title}</p>
  </div>
));

const FooterCopyright: React.FC = memo(() => (
  <div className="mt-8 pt-8 border-t border-gray-800/50 text-center">
    <p className="text-sm text-gray-500">
      © 2024 {personalInfo.name}. Built with Next.js, TypeScript, Three.js, and
      passion for innovation.
    </p>
    <p className="text-xs mt-2 text-gray-600">"{personalInfo.tagline}"</p>
  </div>
));

Footer.displayName = 'Footer';
FooterInfo.displayName = 'FooterInfo';
FooterCopyright.displayName = 'FooterCopyright';

export default Footer;
