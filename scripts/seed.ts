/**
 * Seed script — run once to populate MongoDB with all current portfolio data
 * and create your admin account.
 *
 * Usage:
 *   npm run seed
 *
 * Requires in .env.local:
 *   MONGODB_URI=...
 *   ADMIN_USERNAME=...
 *   ADMIN_PASSWORD=...
 */

import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/* ------------------------------------------------------------------ */
/*  Inline Mongoose schemas (avoids path-alias issues outside Next)    */
/* ------------------------------------------------------------------ */

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const HeroSchema = new mongoose.Schema({
  greeting: { type: String, default: "Hey, I'm" },
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  splineUrl: { type: String },
}, { timestamps: true });

const AboutSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraphs: [{ type: String }],
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  liveUrl: { type: String },
  githubUrl: { type: String, required: true },
  tags: [{ type: String }],
  accentColor: { type: String, default: "#3B82F6" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const SocialSchema = new mongoose.Schema({
  platform: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({ name: String, iconKey: String }, { _id: false });
const SkillCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  categoryIconKey: { type: String, required: true },
  color: String,
  gradientFrom: String,
  gradientTo: String,
  gradientColor: String,
  span: { type: String, default: "col-span-3 lg:col-span-1" },
  skills: [SkillSchema],
  order: { type: Number, default: 0 },
}, { timestamps: true });

/* ------------------------------------------------------------------ */
/*  Models                                                             */
/* ------------------------------------------------------------------ */

const Admin          = mongoose.models.Admin          || mongoose.model("Admin", AdminSchema);
const Hero           = mongoose.models.Hero           || mongoose.model("Hero", HeroSchema);
const About          = mongoose.models.About          || mongoose.model("About", AboutSchema);
const Project        = mongoose.models.Project        || mongoose.model("Project", ProjectSchema);
const Certification  = mongoose.models.Certification  || mongoose.model("Certification", CertificationSchema);
const Social         = mongoose.models.Social         || mongoose.model("Social", SocialSchema);
const SkillCategory  = mongoose.models.SkillCategory  || mongoose.model("SkillCategory", SkillCategorySchema);

/* ------------------------------------------------------------------ */
/*  Main seed function                                                 */
/* ------------------------------------------------------------------ */

const heroData = {
  greeting: "Hey, I'm",
  name: "Manojkrishna M",
  tagline: "Full Stack Developer | AI & Data Science Student",
  splineUrl: "https://prod.spline.design/AeryvEqWxr2qjINc/scene.splinecode",
};

const aboutData = {
  heading: "Who I am & What I offer",
  paragraphs: [
    "I am a final-year B.Tech Artificial Intelligence and Data Science student at V.S.B College of Engineering Technical Campus, passionate about Full Stack Development, Cybersecurity, Cloud Computing, and AI-driven solutions. I enjoy building secure, scalable, and efficient applications that solve real-world problems.",
    "My focus is on software engineering, cloud technologies, cybersecurity, and modern web development — with hands-on experience across React, Flask, AWS, Docker, and secure system design.",
    "Recognized with a LeetCode Problem Solving Excellence Award, Top Performer in Department for Problem Solving, Hackathon 360 3.0 participation, and Top 15 Talkathon placement.",
  ],
};

const projectsData = [
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
];

const certificationsData = [
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
];

const socialsData = [
  { platform: "GitHub", url: "GITHUB_URL_HERE", order: 0 },
  { platform: "LinkedIn", url: "LINKEDIN_URL_HERE", order: 1 },
  { platform: "LeetCode", url: "LEETCODE_URL_HERE", order: 2 },
];

const skillCategoriesData = [
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
];

/* ------------------------------------------------------------------ */
/*  Main seed function                                                 */
/* ------------------------------------------------------------------ */

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is not set. Add it to your .env.local file.");
    process.exit(1);
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error("❌ ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env.local");
    process.exit(1);
  }

  console.log("\n🌱 Portfolio Database Seeder\n");
  console.log("⏳ Connecting to MongoDB…");
  await mongoose.connect(uri);
  console.log("✅ Connected\n");

  const results: Record<string, string> = {};

  // 1. Admin
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(adminPassword, salt);
    await Admin.create({ username: adminUsername, password: hashed });
    results["Admin"] = `✅ Created (${adminUsername})`;
  } else {
    results["Admin"] = "⏭️  Already exists — skipped";
  }

  // 2. Hero
  const heroCount = await Hero.countDocuments();
  if (heroCount === 0) {
    await Hero.create(heroData);
    results["Hero"] = "✅ Created";
  } else {
    results["Hero"] = "⏭️  Already exists — skipped";
  }

  // 3. About
  const aboutCount = await About.countDocuments();
  if (aboutCount === 0) {
    await About.create(aboutData);
    results["About"] = "✅ Created";
  } else {
    results["About"] = "⏭️  Already exists — skipped";
  }

  // 4. Projects
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(projectsData);
    results["Projects"] = `✅ Created ${projectsData.length} projects`;
  } else {
    results["Projects"] = `⏭️  Already has ${projectCount} — skipped`;
  }

  // 5. Certifications
  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    await Certification.insertMany(certificationsData);
    results["Certifications"] = `✅ Created ${certificationsData.length} certifications`;
  } else {
    results["Certifications"] = `⏭️  Already has ${certCount} — skipped`;
  }

  // 6. Socials
  const socialCount = await Social.countDocuments();
  if (socialCount === 0) {
    await Social.insertMany(socialsData);
    results["Socials"] = `✅ Created ${socialsData.length} socials`;
  } else {
    results["Socials"] = `⏭️  Already has ${socialCount} — skipped`;
  }

  // 7. Skill Categories
  const skillCount = await SkillCategory.countDocuments();
  if (skillCount === 0) {
    await SkillCategory.insertMany(skillCategoriesData);
    results["Skills"] = `✅ Created ${skillCategoriesData.length} categories`;
  } else {
    results["Skills"] = `⏭️  Already has ${skillCount} — skipped`;
  }

  // Print summary
  console.log("─".repeat(45));
  for (const [key, val] of Object.entries(results)) {
    console.log(`  ${key.padEnd(18)} ${val}`);
  }
  console.log("─".repeat(45));
  console.log("\n🎉 Seed complete! Log in at /admin\n");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
