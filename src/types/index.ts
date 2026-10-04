export type ProjectStatus = 'Production' | 'In Development' | 'Completed' | 'Prototype';
export type ProjectCategory = 'Frontend' | 'Fullstack' | 'Web Application' | 'UI Engineering';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  status: ProjectStatus;
  summary: string;
  whatWasBuilt: string;
  whyItWasBuilt: string;
  howItWasBuilt: string;
  highlights: string[];
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  previewImage?: string;
  logoImage?: string;
  gallery?: { title: string; image: string }[];
  featured: boolean;
}

export type SkillCategory = 'Frontend' | 'Tools & Environment' | 'Currently Exploring';

export interface TechSkill {
  name: string;
  category: SkillCategory;
  role: string;
  context: string;
  isCore?: boolean;
}

export interface Milestone {
  year: string;
  title: string;
  category: 'Milestone' | 'Project' | 'Learning';
  description: string;
}

export interface GitHubRepoItem {
  name: string;
  description: string;
  explanation: string;
  url: string;
  languages: string[];
  demoUrl?: string;
  previewImage?: string;
  category?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  email?: string;
  whatsapp?: string;
}

export interface DeveloperProfile {
  name: string;
  role: string;
  tagline: string;
  status: 'ACTIVE' | 'ONLINE' | 'AVAILABLE_FOR_WORK' | 'OFFLINE';
  location: string;
  timezone: string;
  whyProgramming?: string;
  education?: {
    course: string;
    institution: string;
    location: string;
    description?: string;
  };
  approach?: string;
  focusAreas?: string[];
  futureStep?: string;
  socials: SocialLinks;
}

export interface TerminalOutputLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string | React.ReactNode;
}
