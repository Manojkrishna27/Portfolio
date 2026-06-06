# Manojkrishna M — Portfolio

Personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.

## Owner

- **Name:** Manojkrishna M
- **Role:** Full Stack Developer | AI & Data Science Student
- **Email:** manojkrishna2725@gmail.com

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL` — production site URL for SEO
- `MONGODB_URI` — optional, for admin CMS
- `SENDGRID_*` — optional, for contact form emails
- `ADMIN_*` / `JWT_SECRET` — optional, for admin panel

## Social Links

Update placeholders in `lib/constants.ts`:

- `GITHUB_URL_HERE`
- `LINKEDIN_URL_HERE`
- `LEETCODE_URL_HERE`

## Deploy on Vercel

1. Push this repository to GitHub
2. Import the project on [Vercel](https://vercel.com/new)
3. Set root directory to `portfolio` if needed
4. Add environment variables
5. Deploy

Build command: `npm run build`
