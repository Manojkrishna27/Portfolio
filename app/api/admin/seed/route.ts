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
      name: "Manojkrishna M",
      tagline: "Full Stack Developer | AI & Data Science Student",
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
        "I am a final-year B.Tech Artificial Intelligence and Data Science student at V.S.B College of Engineering Technical Campus, passionate about Full Stack Development, Cybersecurity, Cloud Computing, and AI-driven solutions. I enjoy building secure, scalable, and efficient applications that solve real-world problems.",
        "My focus is on software engineering, cloud technologies, cybersecurity, and modern web development — with hands-on experience across React, Flask, AWS, Docker, and secure system design.",
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
        title: "SecureScan AI",
        subtitle: "Website Security Assessment Platform",
        description:
          "Full-stack cybersecurity platform using React, Flask, MySQL, Docker, Nginx, and AWS to analyze SSL/TLS configurations, security headers, and website security posture with AI-driven recommendations, PDF reporting, and domain monitoring.",
        image: "/projects/securescan-ai.png",
        githubUrl: "https://github.com/Manojkrishna27/Secure_scan",
        tags: ["React", "Flask", "MySQL", "Redis", "Docker", "Nginx", "AWS", "JWT"],
        accentColor: "#06B6D4",
        order: 0,
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
        order: 1,
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
        order: 2,
      },
    ]);
    results.projects = `Created 3`;
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
        title: "Programming",
        categoryIconKey: "Code2",
        color: "#F472B5",
        gradientFrom: "#F472B6",
        gradientTo: "#FBBF24",
        gradientColor: "#F472B6",
        span: "col-span-2 lg:col-span-2",
        skills: [
          { name: "Python", iconKey: "python" },
          { name: "Java", iconKey: "java" },
          { name: "JavaScript", iconKey: "javascript" },
        ],
        order: 0,
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
        order: 1,
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
        order: 2,
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
        ],
        order: 3,
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
          { name: "Nginx", iconKey: "express" },
          { name: "Linux", iconKey: "linux" },
        ],
        order: 4,
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
        order: 5,
      },
    ]);
    results.skills = `Created 6 categories`;
  } else {
    results.skills = `Already has ${skillCount} categories`;
  }

  return Response.json({ success: true, results });
}
