'use client';

import React, { memo, useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Coffee,
  Gamepad2,
  Zap,
  Heart,
  Smile,
  ArrowRight,
  Github,
  Linkedin,
} from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { personalInfo } from '../../data/personalInfo';
import { SECTION_TITLES, GRADIENTS } from '../../data/constants';
import SectionTitle from '../ui/SectionTitle';

const ContactSection: React.FC = memo(() => {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [funFact, setFunFact] = useState(0);
  const [coffeeCount, setCoffeeCount] = useState(0);

  const funFacts = [
    "I debug with console.log() and I'm not ashamed! 🐛",
    "I've written more 'Hello World' programs than actual apps 👋",
    "My code works on my machine... that's what matters, right? 💻",
    'I turn caffeine into code and bugs into features ☕',
    'I speak fluent JavaScript, broken English, and sarcasm 🗣️',
    'Stack Overflow is basically my second home 🏠',
    "I have 99 problems but a glitch ain't one... wait, yes it is 🎯",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFunFact((prev) => (prev + 1) % funFacts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [funFacts.length]);

  const handleCoffeeClick = () => {
    setCoffeeCount((prev) => prev + 1);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 relative z-20"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Let's Connect & Have Some Fun!"
          gradient={GRADIENTS.contact}
        />

        <ContactIntro isVisible={isVisible} funFact={funFacts[funFact]} />

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          <ContactInfo isVisible={isVisible} />
          <InteractiveFun
            isVisible={isVisible}
            coffeeCount={coffeeCount}
            onCoffeeClick={handleCoffeeClick}
          />
        </div>

        <GamesCallToAction isVisible={isVisible} />
      </div>
    </section>
  );
});

const ContactIntro: React.FC<{
  isVisible: boolean;
  funFact: string;
}> = memo(({ isVisible, funFact }) => (
  <div
    className={`text-center max-w-4xl mx-auto transform transition-all duration-700 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}
  >
    <p className="text-xl mb-6 leading-relaxed text-gray-300">
      Want to work together? Great! But first, let's be honest about what you're
      getting into... 😄
    </p>

    <div className="bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-700/50">
      <div className="flex items-center justify-center gap-3 mb-3">
        <Smile className="w-6 h-6 text-yellow-400" />
        <span className="text-lg font-semibold text-yellow-400">
          Developer Confession
        </span>
      </div>
      <p className="text-lg text-gray-300 italic">"{funFact}"</p>
    </div>

    <div className="flex items-center justify-center gap-6 text-gray-400 mb-8">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span className="text-sm">Usually responds within 24 hours</span>
      </div>
      <div className="flex items-center gap-2">
        <Coffee className="w-4 h-4" />
        <span className="text-sm">Powered by caffeine & determination</span>
      </div>
    </div>
  </div>
));

const ContactInfo: React.FC<{ isVisible: boolean }> = memo(({ isVisible }) => {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Me',
      value: personalInfo.contact.email,
      description: 'For serious business talks (and memes)',
      action: `mailto:${personalInfo.contact.email}?subject=Let's Build Something Amazing!&body=Hi Antonio! I visited your portfolio and...`,
      color: 'text-cyan-400',
    },
    {
      icon: Phone,
      title: 'Call Me',
      value: personalInfo.contact.phone,
      description: 'If you dare interrupt my coding flow 😉',
      action: `tel:${personalInfo.contact.phone}`,
      color: 'text-purple-400',
    },
    {
      icon: MapPin,
      title: 'Find Me',
      value: personalInfo.contact.location,
      description: 'Probably at a coffee shop with my laptop',
      action: 'https://maps.google.com/?q=Zagreb,Croatia',
      color: 'text-green-400',
    },
  ];

  return (
    <div
      className={`space-y-6 transform transition-all duration-700 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
      }`}
      style={{ transitionDelay: '200ms' }}
    >
      <h3 className="text-2xl font-bold mb-8 text-gradient">Get In Touch</h3>

      {contactMethods.map(
        ({ icon: Icon, title, value, description, action, color }, index) => (
          <ContactCard
            key={title}
            icon={Icon}
            title={title}
            value={value}
            description={description}
            action={action}
            color={color}
            index={index}
          />
        )
      )}

      <div className="mt-8 p-6 glass-effect rounded-xl">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-400" />
          Social Media Stalking
        </h4>
        <div className="flex space-x-4">
          <a
            href={personalInfo.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm">My Code</span>
          </a>
          <a
            href={personalInfo.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105"
          >
            <Linkedin className="w-5 h-5" />
            <span className="text-sm">Professional Me</span>
          </a>
        </div>
      </div>
    </div>
  );
});

const ContactCard: React.FC<{
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  action: string;
  color: string;
  index: number;
}> = memo(({ icon: Icon, title, value, description, action, color, index }) => (
  <a
    href={action}
    target={action.startsWith('http') ? '_blank' : undefined}
    rel={action.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="block p-6 glass-effect rounded-xl hover-lift border border-gray-800/50 group"
    style={{ transitionDelay: `${index * 100 + 300}ms` }}
  >
    <div className="flex items-start space-x-4">
      <div
        className={`p-3 rounded-lg bg-gray-800/50 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold mb-1 group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-gray-300 mb-1">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </a>
));

const InteractiveFun: React.FC<{
  isVisible: boolean;
  coffeeCount: number;
  onCoffeeClick: () => void;
}> = memo(({ isVisible, coffeeCount, onCoffeeClick }) => {
  const getCoffeeMessage = (count: number) => {
    if (count === 0) return 'Click to fuel my coding! ☕';
    if (count < 5) return `${count} cups down! I'm getting warmed up! 🔥`;
    if (count < 10) return `${count} cups! Now we're talking! ⚡`;
    if (count < 20) return `${count} cups! I'm in the ZONE! 🚀`;
    return `${count} cups! I've achieved enlightenment! 🧘‍♂️✨`;
  };

  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
      }`}
      style={{ transitionDelay: '400ms' }}
    >
      <div className="glass-effect rounded-xl p-8 border border-gray-800/50">
        <h3 className="text-2xl font-bold mb-6 text-gradient">
          Interactive Developer Dashboard
        </h3>

        <div className="space-y-6">
          {/* Coffee Counter */}
          <div className="text-center p-6 bg-gray-800/30 rounded-xl">
            <button
              onClick={onCoffeeClick}
              className="mb-4 p-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-110"
            >
              <Coffee className="w-8 h-8 text-white" />
            </button>
            <p className="text-lg font-semibold mb-2">Developer Fuel Station</p>
            <p className="text-sm text-gray-400">
              {getCoffeeMessage(coffeeCount)}
            </p>
          </div>

          {/* Developer Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-800/30 rounded-xl">
              <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-xl font-bold">99%</div>
              <div className="text-xs text-gray-400">Caffeine Level</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-xl">
              <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <div className="text-xl font-bold">∞</div>
              <div className="text-xs text-gray-400">Passion for Code</div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="text-center">
            <p className="text-gray-400 mb-4">Ready to start a project?</p>
            <a
              href={`mailto:${personalInfo.contact.email}?subject=Let's Build Something Amazing!&body=Hi Antonio! I visited your portfolio and I'm interested in working together. Here's what I have in mind:%0D%0A%0D%0A[Tell me about your project]`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              <Mail className="w-5 h-5" />
              <span>Let's Talk!</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

const GamesCallToAction: React.FC<{ isVisible: boolean }> = memo(
  ({ isVisible }) => (
    <div
      className={`text-center mt-16 transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: '600ms' }}
    >
      <div className="glass-effect rounded-xl p-8 border border-gray-800/50 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Gamepad2 className="w-8 h-8 text-cyan-400" />
          <h3 className="text-3xl font-bold text-gradient">
            Wait, Don't Leave Yet!
          </h3>
        </div>

        <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
          Since you've made it this far, how about a little fun? I built some
          games to showcase my skills AND entertain you! Think of it as a
          technical demo disguised as playtime! 🎮
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => (window.location.href = '/games')}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center space-x-2 shadow-lg"
          >
            <Gamepad2 className="w-6 h-6" />
            <span>Play My Games</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href={`mailto:${personalInfo.contact.email}?subject=I Played Your Games!&body=Hi Antonio! I just played your games and...`}
            className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Skip to Business</span>
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Pro tip: Playing my games might give you bonus points in the hiring
          process 😉
        </p>
      </div>
    </div>
  )
);

ContactSection.displayName = 'ContactSection';
ContactIntro.displayName = 'ContactIntro';
ContactInfo.displayName = 'ContactInfo';
ContactCard.displayName = 'ContactCard';
InteractiveFun.displayName = 'InteractiveFun';
GamesCallToAction.displayName = 'GamesCallToAction';

export default ContactSection;
