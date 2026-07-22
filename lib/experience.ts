export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  duration: string;
  description: string[];
  upcoming?: boolean;
  accentColor: string;
}

export const experiences: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "Emglitz Technologies",
    duration: "June 2025 — August 2025",
    description: [
      "Developed production-ready web applications using React and Flask.",
      "Integrated REST APIs and optimized backend communication.",
      "Improved application performance and responsiveness.",
      "Collaborated with engineers to deliver customer-facing features using modern development practices.",
    ],
    accentColor: "#60A5FA",
  },
];
