# Contactly

React 18 + Vite contact list frontend for the Flask contacts API.

## Create a fresh React project

```powershell
npm create vite@latest contacts-frontend -- --template react
cd contacts-frontend
npm install
npm install react@18 react-dom@18
```

Replace the generated `src` files with this project's `src` files, then add `.env.example`.

## Run locally

From the repository root:

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Set `VITE_API_URL` in `.env` to the Flask API's base URL. Restart Vite after changing it.

## Build

```powershell
npm run build
```

## Deploy to Vercel

Import the repository into Vercel and set **Root Directory** to `frontend`. Vercel detects Vite automatically. Add `VITE_API_URL` under **Project Settings → Environment Variables** for the production API, then redeploy.
