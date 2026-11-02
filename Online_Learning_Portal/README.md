# Online Learning Portal (MERN)

## Requirements
Install Node.js LTS and MongoDB Community Server (or use MongoDB Atlas). Open this folder in VS Code.

## First-time setup
1. In VS Code open Terminal > New Terminal.
2. Backend setup:
```powershell
cd backend
npm install
Copy-Item .env.example .env
```
Open `backend/.env`. For local MongoDB use:
`MONGO_URI=mongodb://127.0.0.1:27017/online_learning_portal`
3. Add sample courses and assignments:
```powershell
npm run seed
```
4. Start backend:
```powershell
npm run dev
```
Keep this terminal open. API: http://localhost:5000/api/health

5. Open a SECOND terminal (click + in terminal panel):
```powershell
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## Every later run
Terminal 1: `cd backend` then `npm run dev`
Terminal 2: `cd frontend` then `npm run dev`

Register an account in the app, then explore courses, enroll, view dashboard and assignments.
If using Atlas, replace MONGO_URI in backend/.env with your Atlas connection string.
