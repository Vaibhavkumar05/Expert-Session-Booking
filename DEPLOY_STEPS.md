# Deploy Steps (Simple)

## 1) Backend on Render
1. Push this repo to GitHub.
2. In Render, click `New +` -> `Blueprint`.
3. Select this repo (Render reads `render.yaml`).
4. Set env vars when prompted:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `CLIENT_URL` = your Netlify site URL (example: `https://expert-sessions-booking.netlify.app`)
5. Deploy.
6. Open Render shell and run:
   - `npm run seed`

## 2) Frontend on Netlify
1. Connect same repo in Netlify.
2. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Environment variable:
   - `VITE_API_URL` = your Render backend URL (example: `https://expert-session-booking-backend.onrender.com`)
4. Redeploy site (`Clear cache and deploy`).

## 3) Test
1. Open backend test URL:
   - `https://<backend-url>/experts?page=1&limit=6`
2. It should return `data` with experts.
3. Open Netlify URL and hard refresh (`Ctrl+F5`).

