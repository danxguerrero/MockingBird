# MockingBird 🐦

> **AI-Powered Technical Interview Practice Platform**

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

MockingBird is a comprehensive AI-powered platform that helps software engineering candidates prepare for technical interviews through realistic mock interview sessions. Built with modern web technologies, it provides an interactive coding environment, AI interviewer simulation, and detailed performance feedback to help users improve their interview skills.

## Features

### 🎯 **Core Interview Features**
- **AI-Powered Interviewer**: Intelligent AI interviewer using Google Gemini API
- **Real-time Coding Environment**: Monaco Editor with syntax highlighting and multiple language support
- **Timed Interview Sessions**: 45-minute interview timer with automatic session management
- **Dynamic Question Bank**: Curated LeetCode-style questions with difficulty levels (Easy, Medium, Hard)
- **Interactive Chat**: Real-time conversation with AI interviewer during coding

### 💻 **Technical Features**
- **Multi-Language Support**: Python, JavaScript, C++, Java
- **Code Analysis**: AI analyzes your code and provides real-time feedback
- **Interview State Management**: Persistent interview sessions with automatic cleanup

### 📊 **Feedback & Analytics**
- **Comprehensive Feedback**: AI-generated performance analysis across multiple dimensions:
  - Communication skills
  - Problem-solving approach
  - Technical competency
  - Testing and debugging
- **Scoring System**: 1-4 scale with overall hire recommendation
- **Chat History**: Complete interview conversation review
- **Performance Tracking**: Detailed insights for improvement

### 🎨 **User Experience**
- **Modern UI/UX**: Clean, intuitive interface with Tailwind CSS
- **Keyboard Shortcuts**: Enter to send messages, Shift+Enter for new lines
- **Real-time Updates**: Live chat and code synchronization
- **Session Management**: Automatic state cleanup and interview restart capability

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (VS Code's editor)
- **AI Integration**: Google Gemini API
- **State Management**: React Context API
- **Deployment**: Vercel-ready configuration

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/danxguerrero/MockingBird.git
   cd MockingBird/mockingbird
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the `mockingbird` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### Starting an Interview

1. **Navigate to the interview page** from the home screen
2. **Click "Start Interview"** to begin a new session
3. **Introduce yourself** when prompted by the AI interviewer
4. **Receive your coding question** from the curated question bank
5. **Code your solution** in the integrated Monaco Editor
6. **Chat with the AI** to ask questions or discuss your approach
7. **Complete the interview** within the 45-minute time limit

### During the Interview

- **Code Editor**: Write your solution in your preferred programming language
- **Language Switching**: Change programming languages at any time
- **Real-time Chat**: Communicate with the AI interviewer
- **Timer**: Monitor your remaining time
- **Code Sharing**: AI can see your code changes when you send a chat

### After the Interview

- **Automatic Feedback**: AI generates comprehensive performance analysis
- **Score Breakdown**: See your performance across all evaluation dimensions
- **Improvement Tips**: Get specific advice for future interviews
- **Chat Review**: Review the complete interview conversation

### Keyboard Shortcuts

- **Enter**: Send message in chat
- **Shift + Enter**: Create new line in chat
- **Standard Editor Shortcuts**: All Monaco Editor shortcuts work as expected

## Project Structure

```
mockingbird/
├── src/
│   ├── app/
│   │   ├── components/          # Shared components (Header, Footer)
│   │   ├── interview/           # Interview functionality
│   │   │   ├── components/      # Interview-specific components
│   │   │   ├── actions.ts       # AI API calls
│   │   │   └── page.tsx         # Interview page
│   │   ├── feedback/            # Feedback system
│   │   │   ├── components/      # Feedback components
│   │   │   ├── hooks/           # Custom hooks
│   │   │   └── actions.ts       # Feedback generation
│   │   ├── data/                # Question bank and static data
│   │   └── types/               # TypeScript type definitions
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout with providers
├── public/                      # Static assets
└── package.json                 # Dependencies and scripts
```

## Contributing

We welcome contributions to MockingBird! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Areas for Contribution
- **Question Bank**: Add new coding questions or improve existing ones
- **UI/UX Improvements**: Enhance the user interface and experience
- **AI Integration**: Improve interview feedback and conversation quality
- **Testing**: Add comprehensive test coverage
- **Documentation**: Improve code documentation and user guides

### Code Standards
- Follow TypeScript best practices
- Use consistent formatting with Prettier
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

**Built with ❤️ for the software engineering community**
