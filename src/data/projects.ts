export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "volunteer-management",
    title: "Laravel Volunteer Management System",
    description: "A comprehensive platform designed to streamline volunteer recruitment, shifts coordination, event tracking, and impact reporting for non-profit organizations.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Alpine.js"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    featured: true,
  },
  {
    id: "portfolio-website",
    title: "Modern Developer Portfolio",
    description: "A premium, fully responsive portfolio website built with Next.js 15, App Router, Framer Motion, and Tailwind CSS. Features 3 dynamic, switchable themes.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    featured: true,
  },
  {
    id: "role-profile-management",
    title: "Role-Based Profile Management System",
    description: "A secure dashboard system showcasing advanced RBAC (Role-Based Access Control) mechanisms. Features user registration, profile editing, audits logs, and dynamic permission grids.",
    tech: ["PHP", "Laravel", "PostgreSQL", "Tailwind CSS", "Livewire"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    featured: true,
  },
];
