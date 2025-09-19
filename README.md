# StudyNow Flashcards 🐝

A delightful flashcard study application with a sweet bee theme! Create, organize, and study with interactive honey jar flashcards.

## Features

- 🍯 **Create Custom Decks**: Build your own flashcard collections
- 🐝 **Interactive Study Sessions**: Smooth flip animations and progress tracking
- 📊 **Progress Analytics**: Track your learning journey
- 🎨 **Beautiful UI**: Bee-themed design with honey jar aesthetics
- 💾 **Local Storage**: Your decks are saved locally in your browser

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd study-now-flashcards
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Technologies Used

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React hooks + localStorage
- **Icons**: Lucide React

## How to Use

1. **Create a Deck**: Click "Create Your First Honey Jar" to make a new flashcard deck
2. **Add Cards**: Fill in questions and answers for your flashcards
3. **Study**: Browse your decks and start studying sessions
4. **Track Progress**: Monitor your learning progress over time

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Main application pages
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── lib/            # Utility functions
└── assets/         # Static assets
```
