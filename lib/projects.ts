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
    title: "Enterprise AI Compliance Auditor",
    subtitle: "RAG-Powered Contract & Policy Auditing System",
    description:
      "Production-grade, multi-tenant AI system for automated legal contract ingestion, policy comparison, and risk analysis using advanced RAG. Features dynamic provider-agnostic AI adapters (Gemini & OpenAI), Qdrant vector embeddings, PyMuPDF semantic chunking, and Redis-backed RBAC security to audit business agreements against regulatory standards.",
    image: "/projects/Screenshot from 2026-07-22 21-08-02.png",
    githubUrl: "https://github.com/Manojkrishna27/ENTERPRISE-AI-COMPLIANCE-AUDITOR",
    tags: ["React", "Flask", "Python", "LlamaIndex", "Qdrant", "PostgreSQL", "Redis", "Docker"],
    accentColor: "#8B5CF6",
  },
  {
    title: "SecureScan AI",
    subtitle: "Website Security Assessment Platform",
    description:
      "Enterprise-grade cybersecurity platform that analyzes SSL/TLS configurations, security headers, and website security posture while generating AI-powered security recommendations. Built using scalable backend architecture with cloud-ready deployment, asynchronous task processing, automated PDF reporting, and secure authentication.",
    image: "/projects/securescan-ai.png",
    githubUrl: "https://github.com/Manojkrishna27/Secure_scan",
    tags: ["React", "Flask", "MySQL", "Redis", "Docker", "AWS", "JWT"],
    accentColor: "#06B6D4",
  },
  {
    title: "SecureAuth",
    subtitle: "Authentication & Security Dashboard",
    description:
      "Production-ready authentication and security system designed for high reliability and active threat protection. Features JWT session management, multi-factor OTP recovery, webcam intrusion monitoring, rate limiting, and role-based access control built on containerized microservices.",
    image: "/projects/secureauth.png",
    githubUrl: "https://github.com/Manojkrishna27/secure-auth",
    tags: ["React", "Flask", "MySQL", "Docker", "JWT"],
    accentColor: "#6366F1",
  },
  {
    title: "Student Management System",
    subtitle: "Full-Stack CRUD Application",
    description:
      "High-throughput data management service engineered for efficient record handling, database query optimization, data validation, and real-time pagination. Delivers production-level reliability with clean backend-frontend API contracts.",
    image: "/projects/student-management.png",
    githubUrl: "https://github.com/Manojkrishna27/Student-Management",
    tags: ["React", "Flask", "MySQL"],
    accentColor: "#10B981",
  },
];
