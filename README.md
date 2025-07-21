# CodeBrief

CodeBrief is your AI onboarding assistant that explains any codebase in seconds. It helps developers understand codebases 10x faster, accelerating onboarding for new developers and interns by providing instant, AI-powered code explanations, commit summaries, and Q&A features.

---

## 🚀 Features

- **AI Codebase Explanation:** Link a GitHub repository and get AI-generated summaries and explanations for code files.
- **Q&A Assistant:** Ask questions about the codebase and receive detailed, context-aware answers referencing specific files and code snippets.
- **Commit Log Summaries:** View commit history with AI-generated summaries for each commit.
- **Meeting Analysis:** Upload meeting audio files for analysis (via Firebase). ( Not live as of now )
- **Project Management:** Manage multiple projects, each linked to a GitHub repository.
- **User Authentication:** Secure login and user management via Clerk.
- **Billing:** Integrated billing page for plan upgrades.
- **Modern UI:** Responsive, modern interface using Tailwind CSS and Radix UI.

---

## 🎥 Live Demo

- **Loom Demo Video:** [Watch the demo](https://www.loom.com/share/25587e8667384cdf86532bde21cfd9ba?sid=03613fd6-9555-4d80-a3d7-502dde3c4a54)
- **Live Deployment:** _No explicit live deployment link found. If deployed on Vercel, the link would typically be `https://<your-vercel-project>.vercel.app`._

---

## 🛠️ Local Setup

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- Docker (for local Postgres database) or a running Postgres instance
- [Optional] WSL for Windows users

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd codebrief
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Set Up Environment Variables

- Create a `.env` file in the root directory.
- Required variables (based on code and Prisma schema):
  - `DATABASE_URL` (Postgres connection string)
  - `NODE_ENV` (development/production)
  - `GEMINI_API_KEY` (Google Generative AI)
  - `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID`, `FIREBASE_MEASUREMENT_ID` (for Firebase)
  - Clerk and other third-party service keys as needed

### 4. Start the Database (Postgres)

- For local development, use the provided script:
  ```bash
  ./start-database.sh
  ```

  - On Windows, use WSL and Docker Desktop/Podman as described in the script comments.

### 5. Run Database Migrations

```bash
pnpm db:generate
# or
npx prisma migrate dev
```

### 6. Start the Development Server

```bash
pnpm dev
# or
npm run dev
```

- The app will be available at `http://localhost:3000`.

### 7. (Optional) Access Prisma Studio

```bash
pnpm db:studio
# or
npx prisma studio
```

---

## 📁 Project Structure

- `src/` - Main application source code
  - `app/` - Next.js app directory (routes, pages, layouts)
  - `components/` - Reusable UI components
  - `lib/` - Utility libraries (AI, Firebase, GitHub, etc.)
  - `server/` - API routes and server logic
  - `hooks/` - Custom React hooks
  - `trpc/` - tRPC configuration
- `prisma/` - Prisma schema and migrations
- `public/` - Static assets

---

## 🧰 Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS, Radix UI, Clerk
- **Backend:** tRPC, Prisma, Drizzle, Google Generative AI, Firebase
- **Database:** PostgreSQL (with vector extension for embeddings)
- **Dev Tools:** ESLint, Prettier, TypeScript, pnpm

---

## 🤝 Contributing

- Fork the repo and create a pull request.
- Follow the code style and commit guidelines.

