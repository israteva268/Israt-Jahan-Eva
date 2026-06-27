export interface TimelineItem {
  id: string;
  type: "education" | "experience";
  roleOrDegree: string;
  organization: string;
  orgUrl?: string;
  duration: string;
  description: string;
}

export const timelineData: TimelineItem[] = [
  {
    id: "edu-1",
    type: "education",
    roleOrDegree: "B.Sc. in Computer Science & Engineering",
    organization: "United International University",
    orgUrl: "https://www.uiu.ac.bd",
    duration: "Ongoing",
    description: "Deepening knowledge in advanced algorithms, database systems, web development frameworks, and systems design while maintaining a high academic standing.",
  },
  {
    id: "edu-2",
    type: "education",
    roleOrDegree: "Higher Secondary Certificate (HSC)",
    organization: "Birshreshtha Munshi Abdur Rouf Public College",
    orgUrl: "https://www.abdurroufcollege.ac.bd",
    duration: "Completed",
    description: "Completed secondary education in Science, developing strong logical foundation, mathematics competence, and introductory computer programming skills.",
  },
  {
    id: "edu-3",
    type: "education",
    roleOrDegree: "Secondary School Certificate (SSC)",
    organization: "Lakshmipur Govt. Girl's High School",
    orgUrl: "https://lgghs.edu.bd",
    duration: "Completed",
    description: "Nurtured curiosity for science and engineering, actively participating in science fairs and coding clubs.",
  },
  {
    id: "exp-1",
    type: "experience",
    roleOrDegree: "Full Stack Developer (Freelance)",
    organization: "Self-Employed",
    duration: "2024 - Present",
    description: "Building responsive web applications using PHP, Laravel, React, and Tailwind CSS. Implementing secure authentication flow, relational schema databases, and API integrations.",
  },
  {
    id: "exp-2",
    type: "experience",
    roleOrDegree: "Open Source Contributor & Learner",
    organization: "GitHub Community",
    duration: "2023 - Present",
    description: "Contributing to web projects, polishing Javascript/Typescript skills, and mastering modern frameworks like Next.js 15, Shadcn UI, and state management libraries.",
  },
];
