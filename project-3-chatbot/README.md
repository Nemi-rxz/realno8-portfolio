# Project 3 - Real Estate Chatbot

RealNov8 Group's chatbot project is a React + Vite app that combines a conversational assistant with a real estate listings panel focused on Nigerian properties and sustainability metrics.

Live URL: https://realno8-portfolio-3ikzt3ffk-emwoiwo-9649s-projects.vercel.app/

## Current Scope

- Chat interface branded as Nova
- Local listings dataset with ROI and SDG-related sustainability fields
- Listings panel with modal details
- Chat-triggered city filtering
- Server-side Groq integration through `api/chat.js`

## Tech Stack

- React 19
- Vite 6
- Vercel Functions
- Groq Chat Completions API

## Local Development

```bash
cd project-3-chatbot
npm install
npm run dev
```

## Environment Variables

For deployment and server-side chat, set:

```env
GROQ_API_KEY=your-real-key
```

The older browser-side `VITE_GROQ_API_KEY` should not be used for production chat access.

## Build

```bash
npm run build
```

## Main Files

- `src/components/ChatPanel.jsx`
- `src/components/ListingsPanel.jsx`
- `src/data/listings.js`
- `src/utils/format.js`
- `api/chat.js`

## Next Work

- Improve query parsing beyond simple city detection
- Clean up remaining deployment/runtime issues in the live app
- Keep deployment settings and portfolio docs in sync
