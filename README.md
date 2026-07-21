# ❄️ Portfolio — Game of Thrones Edition 🔥
 
A cinematic, responsive developer portfolio styled around an Ice and Fire visual theme, showcasing engineering projects and technical skills. Built with modern web technologies and optimized for immersive storytelling and full responsiveness.
 
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![TanStack Start](https://img.shields.io/badge/TanStack%20Start-SSR-FF4154)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
 
---
 
## Table of Contents
 
- [Live Demo](#live-demo)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Featured Projects](#featured-projects)
- [Skills](#skills)
- [Setup Instructions](#setup-instructions)
- [License](#license)
---
 
## Live Demo
 
🌐 **Live Site:** _add your deployed Vercel URL here_
📦 **Repository:** [github.com/lakshychauhan/LakshyChauhan_Portfolio](https://github.com/lakshychauhan/LakshyChauhan_Portfolio.git)
 
---
 
## Features
 
### Cinematic Intro
- Animated opening sequence with thunder flashes, sigil zooms, and a split-curtain reveal.
- Gated by session storage so returning visitors skip the intro on repeat visits.
### Ambient Particle System
- Custom particle engine rendering 26+ floating embers and frost motes with randomized size, delay, duration, and drift physics.
- Mouse-parallax on hero elements that shifts the scene based on cursor position.
### Design System
- HSL/OKLCH color variables for consistent contrast and dark-mode transitions.
- Custom serif typography (`Cinzel`, `EB Garamond`, `UnifrakturCook`).
- Radial gradients, responsive drawer menus, and interactive tooltips and tabs.
---
 
## Technology Stack
 
| Layer | Technologies |
|---|---|
| Core Framework | React 19, TypeScript |
| Routing & SSR | TanStack Start (file-based routing) |
| Styling | Tailwind CSS v4, custom keyframe animations |
| Components | Radix UI primitives (Dialog, Tabs, Tooltip, Sheet), Lucide Icons |
| Build System | Vite 8 |
 
---
 
## Featured Projects
 
### 1. QUASAR 2026 — Inter-College Sports Fest Registration Platform
- **Stack:** Node.js, Express, SQLite, Clerk, Three.js
- **Backend:** Concurrency-safe SQLite (WAL mode), a secure payment pipeline with magic-byte file verification, and Jest/Supertest test coverage.
- **Frontend:** Three.js WebGL grid and Lenis smooth-scroll, deployed via PM2 and Caddy.
### 2. PaperVault — AI-Powered College Paper Sharing Platform
- **Stack:** Next.js, NestJS, PostgreSQL, pgvector, Gemini API, Redis, Socket.io
- **Backend:** JWT refresh token rotation, a RAG pipeline using pgvector and Gemini embeddings for natural-language PDF search, and a 16-model Prisma schema.
- **Storage & Optimization:** Redis-backed rate-limiting and Cloudflare R2 storage.
### 3. This Portfolio
- **Stack:** React 19, TypeScript, TanStack Start, Tailwind CSS
- **Design:** Custom animations, responsive drawer layouts, custom typography, and an interactive particle engine.
---
 
## Skills
 
| Category | Details |
|---|---|
| Languages | Python, C++, JavaScript, SQL, HTML/CSS |
| Frameworks | React, Node.js, Next.js, NestJS, Express |
| Databases & Tools | PostgreSQL, MongoDB, SQLite, Redis, Git, Docker, PM2 |
| AI / LLM | Claude, Gemini API, ChatGPT, prompt engineering |
| Core CS | OOP, DBMS, Operating Systems, Computer Networks |
 
---
 
## Setup Instructions
 
Make sure [Node.js](https://nodejs.org/) is installed on your machine.
 
### 1. Clone the Repository
 
```bash
git clone https://github.com/lakshychauhan/LakshyChauhan_Portfolio.git
cd LakshyChauhan_Portfolio
```
 
### 2. Install Dependencies
 
```bash
npm install
# or, with bun
bun install
```
 
### 3. Run the Development Server
 
```bash
npm run dev
# or, with bun
bun run dev
```
 
Open `http://localhost:3000` (or the port output by Vite/TanStack) to view the site locally.
 
### 4. Build for Production
 
```bash
npm run build
# or, with bun
bun run build
```
 
---
 
## License
 
Licensed under the MIT License.
