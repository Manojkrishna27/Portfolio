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
    role: "Project Intern",
    company: "Emglitz Technologies",
    duration: "June 2025 — August 2025",
    description: [
      "Developed responsive web interfaces and integrated REST APIs for production-oriented features.",
      "Applied UI/UX best practices to improve usability and visual consistency across pages.",
      "Improved website performance and collaborated with development teams on delivery.",
    ],
    accentColor: "#60A5FA",
  },
];
