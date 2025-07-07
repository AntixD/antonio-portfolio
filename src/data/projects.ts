import { Project } from '../types/portfolio';

export const projects: Project[] = [
  {
    id: 1,
    title: 'GPU as a Service (GaaS)',
    description:
      'Led frontend development of a comprehensive platform connecting GPU owners with users needing GPU power for AI training and high-performance computing.',
    image: '🖥️',
    tech: ['Next.js 15', 'React 19', 'React Query', 'Shadcn UI'],
    gradient: 'from-blue-600 via-purple-600 to-indigo-800',
    role: 'Lead Frontend Developer',
  },
  {
    id: 2,
    title: 'Fanable - Web3 Collectibles',
    description:
      'Built a comprehensive NFT marketplace for digital collectibles with physical redemption capabilities and blockchain ownership verification.',
    image: '🎴',
    tech: ['Next.js', 'React Native', 'TamagUI', 'Blockchain APIs'],
    gradient: 'from-purple-600 via-pink-600 to-rose-800',
    role: 'Frontend Developer',
  },
  {
    id: 3,
    title: 'Pups Fun - Web3 Gambling',
    description:
      'Developed a decentralized gambling platform with cryptocurrency support, secure wallet integrations, and trustless blockchain transactions.',
    image: '🎲',
    tech: ['Next.js', 'Blockchain', 'Unisat Wallet', 'SWR', 'Zustand'],
    gradient: 'from-emerald-600 via-teal-600 to-cyan-800',
    role: 'Full-Stack Developer',
  },
  {
    id: 4,
    title: 'PDF Pro - License Management',
    description:
      'Redesigned and modernized a PDF licensing application with intuitive interfaces for teams to track licenses and manage digital products.',
    image: '📄',
    tech: ['Next.js', 'React 19', 'Tailwind', 'MySQL', 'License Spring'],
    gradient: 'from-red-600 via-orange-600 to-yellow-800',
    role: 'Frontend Developer',
  },
  {
    id: 5,
    title: 'VetDoc - Online Veterinary',
    description:
      'Built a subscription-based platform for pet care with personalized plans, video consultations, and secure payment processing.',
    image: '🐕',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    gradient: 'from-green-600 via-emerald-600 to-teal-800',
    role: 'Full-Stack Developer',
  },
  {
    id: 6,
    title: 'Djoraj - E-commerce Platform',
    description:
      'Developed a comprehensive marketplace for various categories including cars and electronics, optimized for web and mobile.',
    image: '🛒',
    tech: ['React', 'Material-UI', 'Redux', 'CSS'],
    gradient: 'from-indigo-600 via-blue-600 to-purple-800',
    role: 'Frontend Developer',
  },
];
