export interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  gradient: string;
  role: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  year: string;
  period: string;
  title: string;
  company: string;
  location: string;
  description: string;
  color: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  tagline: string;
  contact: ContactInfo;
}
