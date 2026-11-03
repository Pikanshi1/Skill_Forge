<<<<<<< HEAD
# 🤖 AI Course Builder

> **Create. Learn. Grow. — Build personalized courses with AI.**

**AI Course Builder** is a full-stack AI-powered learning platform that helps users create structured courses, generate learning content, organize lessons, and build interactive learning experiences with the help of artificial intelligence.

The platform combines **AI-generated educational content** with a modern learning dashboard to make course creation faster, more structured, and personalized.
=======
# 🎓 AI Course Builder

> An AI-powered learning platform that automatically generates structured courses, lessons, quizzes, and learning objectives from a topic using Generative AI.

<p align="center">
  <a href="YOUR_LIVE_FRONTEND_URL">
    <img src="https://img.shields.io/badge/Live-Demo-success?style=for-the-badge" />
  </a>
</p>
>>>>>>> 3dcf4c2 (feat: improve AI tutor, lesson generation, quizzes, and theme UI)

---

## ✨ Features

<<<<<<< HEAD
* 🤖 **AI-Powered Course Generation**

  * Generate courses using AI based on a topic or learning goal.
  * Automatically create structured course content.

* 📚 **Course & Lesson Management**

  * Organize courses into modules and lessons.
  * Manage and update generated learning content.

* 📝 **AI-Generated Learning Content**

  * Generate educational explanations and lesson material.
  * Create structured content around specific topics.

* ❓ **Quiz & Assessment System**

  * Create quizzes for courses and lessons.
  * Help learners test and reinforce their understanding.

* 📊 **Learning Dashboard**

  * View courses and learning progress.
  * Track important learning information in one place.

* 🔐 **Authentication & Authorization**

  * Secure user authentication.
  * Protected routes and user-specific resources.

* ⚡ **Modern Full-Stack Architecture**

  * Separate frontend and backend.
  * REST API-based communication.
  * Persistent PostgreSQL database.

---

## 🎯 Why AI Course Builder?

Creating a complete course manually can take significant time — from planning the curriculum to writing lessons and preparing assessments.

AI Course Builder aims to simplify this process by using AI to assist with **course planning, content generation, and learning material creation**, allowing users to focus more on learning and less on repetitive content creation.

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Next.js Frontend   │
                    │   React + TypeScript  │
                    └──────────┬───────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Node.js + Express   │
                    │      Backend API     │
                    └───────┬───────┬──────┘
                            │       │
                    ┌───────▼───┐ ┌─▼──────────────┐
                    │ PostgreSQL │ │   AI Service   │
                    │  + Prisma  │ │ Groq / LLM API │
                    └───────┬────┘ └────────────────┘
                            │
                            ▼
                         Neon DB
```

=======
* 🤖 **AI Course Generation** — Generate complete courses from a topic.
* 📚 **Course Management** — Create, edit, delete, and view courses.
* 📝 **AI-Generated Lessons** — Generate structured lesson content and learning objectives.
* 🧠 **AI-Generated Quizzes** — Create quizzes based on course content.
* 🤖 **AI Tutor** — Chat with one persistent tutor for general questions, programming and DSA, DBMS, SQL, OS, CN, AI/ML, mathematics, code debugging, and lesson explanations.
* 📊 **Learning Analytics** — Track course and learning progress.
* 🔐 **JWT Authentication** — Secure user authentication and protected APIs.
* 🏆 **Certificates** — Generate certificates after course completion.
* 📈 **Progress Tracking** — Monitor lesson and course completion.
* 📱 **Responsive UI** — Works across desktop and mobile devices.

---

## 🧠 AI Workflow

```text
User enters a topic
        ↓
Next.js Frontend
        ↓
Express.js Backend
        ↓
Groq AI API
        ↓
Structured Course
        ↓
Lessons + Objectives + Quizzes
        ↓
PostgreSQL Database
        ↓
Learning Dashboard
```

The application has one conversational AI feature: **AI Tutor**. It supports general-purpose
follow-up conversations, persistent chat history, New Chat, and optional course and lesson
context. Course generation, lesson generation, and quizzes use the same shared Groq integration
as supporting learning workflows rather than separate chat features.

---

## 📸 Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Course Generation

![Course Generation](screenshots/course-generation.png)

### Course / Lessons

![Course](screenshots/course.png)

### Analytics

![Analytics](screenshots/analytics.png)

>>>>>>> 3dcf4c2 (feat: improve AI tutor, lesson generation, quizzes, and theme UI)
---

## 🛠️ Tech Stack

### Frontend

<<<<<<< HEAD
* Next.js
* React
* TypeScript
* Tailwind CSS
* Zustand
* Axios
* React Query
* Recharts

### Backend

* Node.js
* Express.js
* TypeScript
* REST APIs
* JWT Authentication

### Database

* PostgreSQL
* Prisma ORM
* Neon PostgreSQL

### AI

* Groq API
* OpenAI-compatible API integration
* Large Language Models for course and learning-content generation

### Development & Deployment

* Git
* GitHub
* Docker
* Postman
* Vercel
* Render

---

## 📂 Project Structure

```text
AI-Course-Builder/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── store/
│   ├── services/
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── prisma/
│   └── ...
│
├── README.md
└── ...
=======
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat\&logo=next.js\&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat\&logo=react\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat\&logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat\&logo=tailwindcss\&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat\&logo=express\&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat\&logo=prisma\&logoColor=white)

### Database & AI

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat\&logo=postgresql\&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-AI-orange?style=flat)

---

## 🏗️ Architecture

```text
┌─────────────────────┐
│   Next.js Frontend  │
│ React + TypeScript  │
└──────────┬──────────┘
           │ REST API
           ↓
┌─────────────────────┐
│  Express Backend    │
│   Node + TypeScript │
└───────┬───────┬─────┘
        │       │
        ↓       ↓
┌───────────┐ ┌────────────┐
│ PostgreSQL│ │  Groq AI   │
│  + Prisma │ │    API     │
└───────────┘ └────────────┘
>>>>>>> 3dcf4c2 (feat: improve AI tutor, lesson generation, quizzes, and theme UI)
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
<<<<<<< HEAD
git clone <your-repository-url>
cd AI-Course-Builder
```

---

### 2. Setup the Backend
=======
git clone YOUR_GITHUB_REPOSITORY_URL
cd ai-course-builder
```

### 2. Backend
>>>>>>> 3dcf4c2 (feat: improve AI tutor, lesson generation, quizzes, and theme UI)

```bash
cd backend
npm install
<<<<<<< HEAD
```

Create a `.env` file:

```env
PORT=5001

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_groq_model
```

Then generate Prisma Client:

```bash
npx prisma generate
```

Push the database schema:

```bash
npx prisma db push
```

Start the backend:

```bash
npm run dev
```

---

### 3. Setup the Frontend
=======
npm run dev
```

### 3. Frontend
>>>>>>> 3dcf4c2 (feat: improve AI tutor, lesson generation, quizzes, and theme UI)

```bash
cd frontend
npm install
<<<<<<< HEAD
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Start the development server:

```bash
npm run dev
```

=======
npm run dev
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

>>>>>>> 3dcf4c2 (feat: improve AI tutor, lesson generation, quizzes, and theme UI)
---

## 🔐 Environment Variables

<<<<<<< HEAD
| Variable              | Description                         |
| --------------------- | ----------------------------------- |
| `DATABASE_URL`        | PostgreSQL/Neon database connection |
| `JWT_SECRET`          | Secret used for authentication      |
| `GROQ_API_KEY`        | API key for AI functionality        |
| `GROQ_MODEL`          | AI model used for generation        |
| `NEXT_PUBLIC_API_URL` | Backend API URL                     |

> ⚠️ Never commit `.env` or `.env.local` files to GitHub.

---

## 🚀 Deployment

### Frontend

The Next.js frontend can be deployed using **Vercel**.

Set:

```env
NEXT_PUBLIC_API_URL=<your-deployed-backend-url>/api
```

### Backend

The Express backend can be deployed using **Render** or another Node.js-compatible hosting platform.

Configure the required environment variables in the hosting platform before deployment.

### Database

The project uses **PostgreSQL**, with **Neon** suitable for cloud database hosting.
=======
### Backend `.env`

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_random_secret_at_least_32_characters_long
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_groq_model
FRONTEND_URL=https://your-frontend-domain.com
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASSWORD=your_16_character_gmail_app_password
```

### Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

`FRONTEND_URL` is the deployed frontend origin allowed by backend CORS, for example
`https://skill-forge.vercel.app` without a trailing slash. `NEXT_PUBLIC_API_URL` is the
deployed backend API base URL, including `/api`.

Password reset email uses Gmail SMTP. Enable 2-Step Verification on the Gmail account,
create a 16-character Google App Password, and set it as `EMAIL_PASSWORD`. Do not use
your regular Gmail password or commit the real value.

---

## 📁 Project Structure

```text
ai-course-builder/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── store/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── prisma/
│   └── server.ts
│
└── screenshots/
    ├── dashboard.png
    ├── course-generation.png
    ├── course.png
    └── analytics.png
```

---

## 🌐 Deployment

| Service  | Platform        |
| -------- | --------------- |
| Frontend | Vercel          |
| Backend  | Render          |
| Database | Neon PostgreSQL |
| AI       | Groq API        |
>>>>>>> 3dcf4c2 (feat: improve AI tutor, lesson generation, quizzes, and theme UI)

---

## 🔮 Future Improvements

<<<<<<< HEAD
* 🎯 Personalized learning paths
* 🧠 Improved AI-generated curricula
* 💬 AI learning assistant
* 📈 Advanced learning analytics
* 🏆 Gamification and achievements
* 📜 Course completion certificates
* 👥 Collaborative course creation
* 🔊 AI-generated audio learning content
* 🌐 Multi-language course generation
* 📱 Improved mobile learning experience

---

## 🌟 Vision

The goal of AI Course Builder is to make learning more **accessible, structured, and personalized** by combining modern web technologies with artificial intelligence.

Instead of following a one-size-fits-all learning approach, the platform aims to help users create learning experiences that match their **goals, interests, and pace**.

---

## 👩‍💻 Author

### Pikanshi Mehta

**3rd Year Computer Science Engineering Student — NIT Hamirpur**

Interested in:

* Full-Stack Development
* Artificial Intelligence & Machine Learning
* DSA & Problem Solving
* Open Source
* Building impactful products

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub!

---

> **Build skills. Build ideas. Build your future. 🚀**
=======
* 🎯 Personalized Learning Paths
* 🧾 AI Summaries & Flashcards
* 🌍 Multi-language Course Generation
* 📚 AI Resource Recommendations
* 📱 Progressive Web App
* ⭐ Course Ratings & Reviews

---

## 👨‍💻 Author

**Pikanshi Mehta**

Computer Science Engineering
NIT Hamirpur

---

⭐ If you like this project, consider giving it a star!
>>>>>>> 3dcf4c2 (feat: improve AI tutor, lesson generation, quizzes, and theme UI)
