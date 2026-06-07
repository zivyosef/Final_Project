# Final Project — Task Manager

A Hebrew-language student task management app with AI coaching, Google Calendar sync, and push notifications.

## Project Structure

```
Final_Project/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── pages/           # TasksPage
│   │   ├── components/      # HierarchicalChecklist, StuckCoach
│   │   ├── services/        # Gemini AI, Supabase client, DOCX export
│   │   └── hooks/           # useNotifications (FCM)
│   └── public/
├── server/                  # Express backend
│   ├── routes/
│   │   ├── calendar.js      # Google Calendar OAuth + event creation
│   │   └── notifications.js # Firebase push notifications
│   └── index.js
├── legacy/                  # Old vanilla HTML/JS (archived, do not modify)
└── supabase-migrations.sql  # Run this in the Supabase dashboard
```

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 19, Vite, Tailwind CSS v4, Zustand        |
| Backend   | Node.js, Express                                |
| Database  | Supabase (PostgreSQL + Realtime)                |
| AI        | Gemini 2.5 Flash Lite, Tavily search API        |
| Auth      | Supabase Auth                                   |
| Integrations | Google Calendar API, Firebase Cloud Messaging |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Google Cloud](https://console.cloud.google.com) project with Calendar API enabled
- A [Firebase](https://console.firebase.google.com) project (for push notifications)

### 1. Database setup

Run `supabase-migrations.sql` in the Supabase SQL editor to create the required tables (`profiles`, `activity_history`, `user_tasks`).

### 2. Server setup

```bash
cd server
npm install
cp .env.example .env   # then fill in all values
npm run dev            # runs on http://localhost:3001
```

**Required `.env` values:**

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_KEY` | Supabase service role key |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key |
| `TAVILY_API_KEY` | Tavily search API key |

### 3. Client setup

```bash
cd client
npm install
# create client/.env with:
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...
# VITE_GEMINI_API_KEY=...
npm run dev            # runs on http://localhost:5173
```

## Features

- **Hierarchical task checklist** — nested subtasks with checkbox state sync
- **AI coach ("I'm Stuck")** — Gemini-powered coaching when tasks feel overwhelming
- **Google Calendar sync** — export tasks as calendar events via OAuth
- **Push notifications** — FCM-based reminders via Firebase
- **DOCX export** — compile tasks into a Word document
- **Tavily source search** — find academic sources for assignments
- **Supabase Realtime sync** — task state synced across sessions
- **Activity history** — recent actions logged per user

## Notes

- The app is in Hebrew (RTL layout).
- `legacy/` contains the original vanilla JS prototype — kept for reference only.
- `config.js` inside `legacy/` is gitignored as it contains local API keys.
