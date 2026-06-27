export interface Skill {
  name: string;
  iconName: string; // Map to Lucide icons
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "HTML5", iconName: "Code" },
      { name: "CSS3", iconName: "Palette" },
      { name: "JavaScript", iconName: "FileCode2" },
      { name: "TypeScript", iconName: "FileCode" },
      { name: "React", iconName: "Atom" },
      { name: "Next.js", iconName: "Layers" },
      { name: "Tailwind CSS", iconName: "Wind" },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "PHP", iconName: "Binary" },
      { name: "Laravel", iconName: "Cpu" },
      { name: "Node.js", iconName: "Terminal" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", iconName: "Database" },
      { name: "PostgreSQL", iconName: "DatabaseBackup" },
      { name: "Supabase", iconName: "Flame" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", iconName: "GitBranch" },
      { name: "GitHub", iconName: "Github" },
      { name: "VS Code", iconName: "AppWindow" },
      { name: "Antigravity", iconName: "Compass" },
      { name: "Vercel", iconName: "Triangle" },
    ],
  },
];
