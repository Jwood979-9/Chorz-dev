# Chorz

A full-stack task management web application built to demonstrate modern development practices, focusing on robust API design, server-state synchronization, and optimized database queries.

## 🛠 Tech Stack

* **Frontend:** React (Vite), `@tanstack/react-query`, Material-UI (MUI)

* **Backend:** Node.js, Express.js, Zod

* **Database & Cloud:** Firebase Firestore (NoSQL), Firebase Cloud Functions

## 

### Backend & API Engineering

* **Defensive API Design:** All incoming `POST` and `PUT` request payloads are strictly parsed and validated using **Zod**. The Express router actively rejects malformed data before it reaches the database.

* **RESTful Architecture:** Clean, decoupled CRUD endpoints (`GET`, `POST`, `PUT`, `DELETE`) with standard HTTP status code management.

### Frontend UI & State Management

* **Global Server State:** Replaced manual state and prop-drilling with **React Query**.

* **Cache Synchronization:** Data mutations trigger targeted cache invalidations (`queryClient.invalidateQueries`), automatically keeping the task feed and analytics charts in sync without full-page reloads.

* **Component-Driven UI:** Built with modular React components and Material-UI (MUI), utilizing the `sx` prop for scoped CSS overrides.

### Database Optimization

* **Server-Side Aggregations:** Analytics data is calculated using Firestore's `.count()` method on the backend. This decouples statistics from list fetching and prevents reading full document payloads just to calculate percentages.

* **Cursor-Based Pagination:** The main task feed utilizes `orderBy`, `limit`, and `startAfter` to serve data in fast, low-latency chunks.

##  Repository Structure

```
Chorz-Dev/
├── frontend/                 # React + Vite client application
│   ├── src/
│   │   ├── components/       # TaskForm, TaskList, PieChart
│   │   └── App.jsx           # Main dashboard layout & QueryClientProvider
│
└── functions/                # Node.js/Express Backend (Cloud Functions)
    ├── config/               # Database initialization
    └── routes/               # Express API endpoints (tasks.js)

```