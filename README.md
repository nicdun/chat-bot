# ND Chat - Modern AI Chat Application

A beautiful and feature-rich chat application built with Next.js and powered by Google's Gemini AI. Experience seamless conversations with a modern, responsive interface and persistent chat history.

![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?logo=typescript)

## ✨ Features

- 🤖 Powered by Google's Gemini AI
- 💬 Real-time chat interface with markdown support
- 🎨 Beautiful UI with Tailwind CSS and Shadcn components
- 💾 Persistent chat history using DexieDB (IndexedDB)
- 🚀 Fast and responsive with Next.js App Router
- 📱 Fully responsive design
- ⚡ Real-time message streaming
- 🎭 Loading animations with Framer Motion
- 🔄 Chat thread management
- 🎨 Syntax highlighting for code blocks

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI with Radix UI primitives
- **State Management**: DexieDB for local storage
- **Animations**: Framer Motion
- **Markdown**: React Markdown with GFM support

### Backend
- **Framework**: FastAPI
- **AI Integration**: Google Gemini API
- **Authentication**: Session-based (coming soon)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/nicdun/chat-bot.git
cd chat-bot
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your API keys and configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

Create a `.env.local` file with the following variables for the server:

```env
GOOGLE_API_KEY=your_gemini_api_key
```

Create a `.env.local` file with the following variables for the server:

```env
NEXT_PUBLIC_API_URL=your_fastapi_backend_url
```

## 📦 Project Structure

```
chat-bot/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── chat/              # Chat page components
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
├── lib/                   # Utility functions and configurations
├── public/               # Static assets
└── styles/               # Global styles
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.