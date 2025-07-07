export const NAVIGATION_ITEMS = [
  'home',
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
] as const;

export const SECTION_TITLES = {
  about: 'About Me',
  skills: 'Technical Skills',
  projects: 'Featured Projects',
  experience: 'Professional Experience',
  contact: "Let's Work Together",
} as const;

export const GRADIENTS = {
  about: 'from-cyan-400 to-blue-500',
  skills: 'from-purple-400 to-pink-500',
  projects: 'from-emerald-400 to-teal-500',
  experience: 'from-pink-400 to-rose-500',
  contact: 'from-yellow-400 to-orange-500',
} as const;
