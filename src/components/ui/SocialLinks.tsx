import React, { memo } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

const SocialLinks: React.FC = memo(() => {
  const socialLinks = [
    {
      href: personalInfo.contact.github,
      icon: Github,
      label: 'GitHub',
    },
    {
      href: personalInfo.contact.linkedin,
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: `mailto:${personalInfo.contact.email}`,
      icon: Mail,
      label: 'Email',
    },
  ];

  return (
    <div className="flex justify-center space-x-6">
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          className="p-3 rounded-full bg-gray-800/30 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
          aria-label={label}
        >
          <Icon className="w-6 h-6" />
        </a>
      ))}
    </div>
  );
});

SocialLinks.displayName = 'SocialLinks';

export default SocialLinks;
