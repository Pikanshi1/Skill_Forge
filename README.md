# 🤖 AI Course Builder

> **Create. Learn. Grow. — Build personalized courses with AI.**

**AI Course Builder** is a full-stack AI-powered learning platform that helps users create structured courses, generate learning content, organize lessons, and build interactive learning experiences with the help of artificial intelligence.

The platform combines **AI-generated educational content** with a modern learning dashboard to make course creation faster, more structured, and personalized.

---

## ✨ Features

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

---

## 🛠️ Tech Stack

### Frontend

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
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd AI-Course-Builder
```

---

### 2. Setup the Backend

```bash
cd backend
npm install
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

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Start the development server:

```bash
npm run dev
```

---

## 🔐 Environment Variables

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

---

## 🔮 Future Improvements

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
