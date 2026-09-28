import { DeveloperProfile, GitHubRepoItem, TechSkill } from '../types';

export const DEVELOPER_PROFILE: DeveloperProfile = {
  name: 'Miguel Helmann',
  role: 'Developer',
  tagline: 'I am a developer focused on building websites, landing pages, and simple systems.',
  status: 'ACTIVE',
  location: 'Cascavel / PR',
  timezone: 'UTC-3',
  education: {
    course: 'Técnico em Desenvolvimento de Sistemas',
    institution: 'CEEP Pedro Boaretto Neto',
    location: 'Cascavel / PR',
    description: 'Estou estudando desenvolvimento de sistemas e aprendendo principalmente através de projetos práticos.',
  },
  approach: 'I am still at the beginning of my development journey, so my focus is on learning the fundamentals, understanding how things work, and building practical projects instead of making things more complicated than they need to be.',
  focusAreas: [
    'JavaScript',
    'TypeScript',
    'Python',
    'React',
    'HTML',
    'CSS'
  ],
  futureStep: 'Engenharia de Software',
  socials: {
    github: 'https://github.com/miguelhelmann',
    email: 'miguelpierihelmann@outlook.com',
    whatsapp: '+55 (45) 98406-0089',
  }
};

/**
 * Public GitHub Repositories
 * Source of truth: https://github.com/miguelhelmann
 */
export const GITHUB_REPOS: GitHubRepoItem[] = [
  {
    name: 'FELINE',
    description: 'landing page para uma marca fictícia de carros superesportivos.',
    explanation: 'Landing page responsiva com foco em estética visual de alto impacto, tipografia e estilização moderna.',
    url: 'https://github.com/miguelhelmann/FELINE',
    languages: ['TypeScript', 'CSS', 'HTML'],
  },
  {
    name: 'fish-suplementos-site',
    description: 'Desenvolvimento de site comercial para apresentação de lojas físicas e produtos.',
    explanation: 'Desenvolvimento de site comercial para apresentação de lojas físicas, catálogo de produtos e integração com WhatsApp.',
    url: 'https://github.com/miguelhelmann/fish-suplementos-site',
    languages: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    name: 'glassmorphism-login',
    description: 'login inspirado no tema glassmorphism',
    explanation: 'Estudo prático de interface explorando efeitos translúcidos, profundidade com CSS e formulário interativo.',
    url: 'https://github.com/miguelhelmann/glassmorphism-login',
    languages: ['JavaScript', 'CSS', 'HTML'],
  },
  {
    name: 'miguelhelmann',
    description: 'repositório de perfil pessoal no GitHub',
    explanation: 'Configuração do README de perfil documentando linguagens e ferramentas de estudo em desenvolvimento web.',
    url: 'https://github.com/miguelhelmann/miguelhelmann',
    languages: ['Markdown'],
  },
];

/**
 * Confirmed Core Technologies & Interactive Contexts
 */
export const CORE_TECH_IDENTITIES = [
  {
    name: 'JavaScript',
    shortRole: 'Web logic & interaction',
    desc: 'Lógica web, manipulação de eventos e dinamismo de interface.',
    scale: 'large', // editorial visual scale
  },
  {
    name: 'TypeScript',
    shortRole: 'Static typing & safety',
    desc: 'Tipagem estática, interfaces e prevenção de erros em tempo de desenvolvimento.',
    scale: 'medium',
  },
  {
    name: 'Python',
    shortRole: 'Programming & logic',
    desc: 'Fundamentos de programação, algoritmos e exploração de scripts.',
    scale: 'medium',
  },
  {
    name: 'React',
    shortRole: 'Component-driven UI',
    desc: 'Interfaces dinâmicas baseadas em componentes reutilizáveis e estado.',
    scale: 'large',
  },
  {
    name: 'HTML',
    shortRole: 'Semantic structure',
    desc: 'Estruturação semântica, acessibilidade e marcação limpa.',
    scale: 'small',
  },
  {
    name: 'CSS',
    shortRole: 'Layout & styling',
    desc: 'Estilização responsiva, Flexbox, CSS Grid e design visual.',
    scale: 'small',
  },
];

/**
 * Functional tech skills specification
 */
export const TECH_SKILLS: TechSkill[] = [
  {
    name: 'HTML & CSS',
    category: 'Frontend',
    role: 'Structure & Styling',
    context: 'Semantic markup, accessible layout structures, Flexbox, CSS Grid, and responsive design.',
    isCore: true
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    role: 'Core Language',
    context: 'DOM manipulation, asynchronous workflows, event handling, and interactive web logic.',
    isCore: true
  },
  {
    name: 'React',
    category: 'Frontend',
    role: 'Component UI',
    context: 'Component-driven interface development, hooks, state handling, and structured single-page applications.',
    isCore: true
  },
  {
    name: 'Git & GitHub',
    category: 'Tools & Environment',
    role: 'Version Control',
    context: 'Repository management, branch workflows, commit history, and code versioning.',
    isCore: true
  },
  {
    name: 'VS Code & DevTools',
    category: 'Tools & Environment',
    role: 'Development Environment',
    context: 'Code editing, terminal workflow, browser devtools inspection, and responsive device testing.',
    isCore: true
  },
  {
    name: 'TypeScript',
    category: 'Currently Exploring',
    role: 'Type System',
    context: 'Adding type safety to JavaScript code, writing interfaces, and catching errors before runtime.',
    isCore: true
  },
  {
    name: 'Python',
    category: 'Currently Exploring',
    role: 'Programming Fundamentals',
    context: 'Scripting, algorithms, and backend logic exploration as part of Systems Development studies at CEEP.',
    isCore: true
  }
];
