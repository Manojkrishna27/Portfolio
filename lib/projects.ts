export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  video?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  accentColor: string;
}

export const projects: Project[] = [
  {
    title: "SecureScan AI",
    subtitle: "Website Security Assessment Platform",
    description:
      "Full-stack cybersecurity platform using React, Flask, MySQL, Docker, Nginx, and AWS to analyze SSL/TLS configurations, security headers, and website security posture with AI-driven recommendations, PDF reporting, and domain monitoring.",
    image: "/projects/securescan-ai.png",
    githubUrl: "https://github.com/Manojkrishna27/Secure_scan",
    tags: ["React", "Flask", "MySQL", "Redis", "Docker", "Nginx", "AWS", "JWT"],
    accentColor: "#06B6D4",
  },
  {
    title: "SecureAuth",
    subtitle: "Authentication & Security Dashboard",
    description:
      "Dockerized authentication platform with JWT authentication, OTP recovery, webcam-based intrusion detection, login monitoring, rate limiting, and role-based access control.",
    image: "/projects/secureauth.png",
    githubUrl: "https://github.com/Manojkrishna27/secure-auth",
    tags: ["React", "Flask", "MySQL", "Docker", "JWT"],
    accentColor: "#6366F1",
  },
  {
    title: "Student Management System",
    subtitle: "Full-Stack CRUD Application",
    description:
      "Full-stack CRUD application with search, sorting, pagination, validation, and responsive user interface design for efficient student record management.",
    image: "/projects/student-management.png",
    githubUrl: "https://github.com/Manojkrishna27/Student-Management",
    tags: ["React", "Flask", "MySQL"],
    accentColor: "#10B981",
  },
];
