import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import Project from "@/models/Project";
import Certification from "@/models/Certification";
import Social from "@/models/Social";
import SkillCategory from "@/models/SkillCategory";
import HeroModel from "@/models/Hero";
import AboutModel from "@/models/About";

/**
 * POST /api/admin/seed
 *
 * Seeds the database with the current static data from the codebase.
 * Requires a secret key in the request body to prevent accidental runs.
 * Only creates data if collections are empty (safe to re-run).
 */
export async function POST(req: NextRequest) {
  const { secret, adminUsername, adminPassword } = await req.json();

  if (secret !== process.env.SEED_SECRET) {
    return Response.json({ error: "Invalid seed secret" }, { status: 403 });
  }

  await dbConnect();

  const results: Record<string, string> = {};

  // 1. Seed admin (only if none exist)
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0 && adminUsername && adminPassword) {
    await Admin.create({ username: adminUsername, password: adminPassword });
    results.admin = "Created";
  } else {
    results.admin = adminCount > 0 ? "Already exists" : "Skipped (no credentials)";
  }

  // 2. Seed hero
  const heroCount = await HeroModel.countDocuments();
  if (heroCount === 0) {
    await HeroModel.create({
      greeting: "Hey, I'm",
      name: "Manojkrishna",
      tagline: "Forward Deployed Engineer | AI & Data Science Student",
      splineUrl:
        "https://prod.spline.design/AeryvEqWxr2qjINc/scene.splinecode",
    });
    results.hero = "Created";
  } else {
    results.hero = "Already exists";
  }

  // 3. Seed about
  const aboutCount = await AboutModel.countDocuments();
  if (aboutCount === 0) {
    await AboutModel.create({
      heading: "Who I am & What I offer",
      paragraphs: [
        "I am a final-year B.Tech Artificial Intelligence and Data Science student at V.S.B College of Engineering Technical Campus, passionate about building production-ready AI systems, scalable backend services, cloud infrastructure, and customer-focused software solutions. I enjoy working across the full technology stack to solve complex real-world engineering challenges.",
        "My interests include Forward Deployed Engineering, software engineering, AI applications, cloud computing, cybersecurity, and modern web technologies. I have hands-on experience designing and deploying applications using React, Flask, AWS, Docker, Redis, MySQL, and secure system architectures.",
        "Recognized with a LeetCode Problem Solving Excellence Award, Top Performer in Department for Problem Solving, Hackathon 360 3.0 participation, and Top 15 Talkathon placement.",
      ],
    });
    results.about = "Created";
  } else {
    results.about = "Already exists";
  }

  // 4. Seed projects
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: "Enterprise AI Compliance Auditor",
        subtitle: "RAG-Powered Contract & Policy Auditing System",
        description:
          "Production-grade, multi-tenant AI system for automated legal contract ingestion, policy comparison, and risk analysis using advanced RAG. Features dynamic provider-agnostic AI adapters (Gemini & OpenAI), Qdrant vector embeddings, PyMuPDF semantic chunking, and Redis-backed RBAC security to audit business agreements against regulatory standards.",
        image: "/projects/Screenshot from 2026-07-22 21-08-02.png",
        githubUrl: "https://github.com/Manojkrishna27/ENTERPRISE-AI-COMPLIANCE-AUDITOR",
        tags: ["React", "Flask", "Python", "LlamaIndex", "Qdrant", "PostgreSQL", "Redis", "Docker"],
        accentColor: "#8B5CF6",
        order: 0,
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
        order: 1,
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
        order: 2,
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
        order: 3,
      },
    ]);
    results.projects = `Created 4`;
  } else {
    results.projects = `Already has ${projectCount}`;
  }

  // 5. Seed certifications
  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    await Certification.insertMany([
      {
        name: "AWS Cloud Technical Essentials",
        image: "/certificates/aws-cloud-technical-essentials.png",
        link: "https://coursera.org/verify/NJ3W6RL6D19B",
        order: 0,
      },
      {
        name: "Introduction to Databases for Back-End Development",
        image: "/certificates/meta-databases-backend.png",
        link: "https://coursera.org/verify/AMJP9S5HAPEC",
        order: 1,
      },
      {
        name: "Programming in Python",
        image: "/certificates/meta-python-programming.png",
        link: "https://coursera.org/verify/0IZ8CJIQIZWG",
        order: 2,
      },
      {
        name: "React Basics",
        image: "/certificates/meta-react-basics.png",
        link: "https://coursera.org/verify/602AFDOUN01Z",
        order: 3,
      },
    ]);
    results.certifications = `Created 4`;
  } else {
    results.certifications = `Already has ${certCount}`;
  }

  // 6. Seed socials
  const socialCount = await Social.countDocuments();
  if (socialCount === 0) {
    await Social.insertMany([
      { platform: "GitHub", url: "GITHUB_URL_HERE", order: 0 },
      { platform: "LinkedIn", url: "LINKEDIN_URL_HERE", order: 1 },
      { platform: "LeetCode", url: "LEETCODE_URL_HERE", order: 2 },
    ]);
    results.socials = `Created 3`;
  } else {
    results.socials = `Already has ${socialCount}`;
  }

  // 7. Seed skill categories
  const skillCount = await SkillCategory.countDocuments();
  if (skillCount === 0) {
    await SkillCategory.insertMany([
      {
        title: "AI Engineering",
        categoryIconKey: "Bot",
        color: "#3B82F6",
        gradientFrom: "#3B82F6",
        gradientTo: "#8B5CF6",
        gradientColor: "#3B82F6",
        span: "col-span-3 lg:col-span-1",
        skills: [
          { name: "Prompt Engineering", iconKey: "openai" },
          { name: "RAG Systems", iconKey: "tanstack" },
          { name: "LLM Integration", iconKey: "openai" },
          { name: "AI APIs", iconKey: "restapi" },
          { name: "Qdrant", iconKey: "qdrant" },
        ],
        order: 0,
      },
      {
        title: "Programming",
        categoryIconKey: "Code2",
        color: "#F472B5",
        gradientFrom: "#F472B6",
        gradientTo: "#FBBF24",
        gradientColor: "#F472B6",
        span: "col-span-2 lg:col-span-2",
        skills: [
          { name: "Python", iconKey: "python" },
        ],
        order: 1,
      },
      {
        title: "Frontend",
        categoryIconKey: "Monitor",
        color: "#60A5FA",
        gradientFrom: "#60A5FA",
        gradientTo: "#A78BFA",
        gradientColor: "#60A5FA",
        span: "col-span-3 lg:col-span-1",
        skills: [
          { name: "HTML", iconKey: "html" },
          { name: "CSS", iconKey: "css" },
          { name: "JavaScript", iconKey: "javascript" },
          { name: "React.js", iconKey: "react" },
        ],
        order: 2,
      },
      {
        title: "Backend",
        categoryIconKey: "Server",
        color: "#34D399",
        gradientFrom: "#34D399",
        gradientTo: "#FBBF24",
        gradientColor: "#34D399",
        span: "col-span-3 lg:col-span-1",
        skills: [
          { name: "Flask", iconKey: "python" },
          { name: "REST APIs", iconKey: "restapi" },
          { name: "JWT Authentication", iconKey: "restapi" },
        ],
        order: 3,
      },
      {
        title: "Databases",
        categoryIconKey: "Database",
        color: "#A78BFA",
        gradientFrom: "#A78BFA",
        gradientTo: "#FB923C",
        gradientColor: "#A78BFA",
        span: "col-span-3 lg:col-span-1",
        skills: [
          { name: "MySQL", iconKey: "postgresql" },
          { name: "Redis", iconKey: "redis" },
          { name: "Qdrant", iconKey: "qdrant" },
        ],
        order: 4,
      },
      {
        title: "Cloud & DevOps",
        categoryIconKey: "Wrench",
        color: "#FB923C",
        gradientFrom: "#FB923C",
        gradientTo: "#F472B6",
        gradientColor: "#FB923C",
        span: "col-span-3 lg:col-span-1",
        skills: [
          { name: "AWS", iconKey: "docker" },
          { name: "Docker", iconKey: "docker" },
          { name: "Linux", iconKey: "linux" },
        ],
        order: 5,
      },
      {
        title: "Tools",
        categoryIconKey: "Wrench",
        color: "#10B981",
        gradientFrom: "#10B981",
        gradientTo: "#3B82F6",
        gradientColor: "#10B981",
        span: "col-span-3 lg:col-span-1",
        skills: [
          { name: "Git", iconKey: "git" },
          { name: "GitHub", iconKey: "github" },
          { name: "Postman", iconKey: "postman" },
          { name: "VS Code", iconKey: "github" },
        ],
        order: 6,
      },
    ]);
    results.skills = `Created 6 categories`;
  } else {
    results.skills = `Already has ${skillCount} categories`;
  }

  return Response.json({ success: true, results });
}
