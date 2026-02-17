# Real-Time Poll Rooms

A full-stack web application that allows users to create polls, share them via a link, and collect votes with real-time result updates for all viewers.

This project was built as part of a Full-Stack assignment focusing on correctness, real-time behavior, fairness, and persistence.

---

## 🚀 Features

- Create a poll with a question and multiple options
- Generate a shareable poll link
- Vote on a poll (single choice)
- Real-time vote count updates for all users
- Persistent storage (polls and votes are saved in the database)
- Basic fairness / anti-abuse mechanisms

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express.js
- Socket.IO
- Sequelize ORM

### Database
- MySQL (Railway)

### Deployment
- Backend & Database: Railway
- Frontend: Vercel

---

## 🔄 Real-Time Implementation

Real-time updates are implemented using **Socket.IO**.

- Each poll acts as a separate socket room
- When a user votes:
  - The vote is saved to the database
  - Updated results are emitted to all clients connected to that poll room
- All connected users see results update instantly without refreshing the page

---

## 🔐 Fairness / Anti-Abuse Mechanisms

### 1. One Vote per Browser (Voter Hash)
- A unique `voterHash` is generated and stored in the browser using `localStorage`
- Each vote is recorded with the associated `pollId` and `voterHash`
- Before accepting a vote, the backend checks if the same `voterHash` has already voted in that poll

**Prevents:**
- Multiple votes by refreshing the page
- Accidental duplicate submissions

**Limitation:**
- Can be bypassed by clearing browser storage or using a different browser/device

---

### 2. Server-Side Vote Validation
- Fairness is enforced on the backend, not just the frontend
- Even if a user manipulates frontend requests, the backend blocks duplicate votes for the same poll

**Prevents:**
- API abuse
- Tampered frontend requests

---

## 📦 Persistence

- Polls, options, and votes are stored in a MySQL database
- Refreshing the page does not reset results
- Shared poll links continue to work even after server restarts

---

## ⚠️ Edge Cases Handled

- Poll creation requires at least 2 options
- Invalid or non-existent poll IDs return safe responses
- Page refresh after voting does not allow re-voting
- Concurrent voting from multiple users
- Socket reconnection keeps results in sync

---

## 🚧 Known Limitations / Future Improvements

- No user authentication (anonymous voting only)
- VPNs or incognito mode can bypass browser-based restrictions
- No poll expiration or admin controls
- Results visualization can be improved (charts, percentages)

---

## ▶️ Running Locally

### Live Demo
Frontend: https://real-time-poll-room-seven.vercel.app/
Backend: https://real-time-poll-room-production.up.railway.app


### Backend
```bash
npm install
node index.js
