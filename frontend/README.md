# DigitalLudus Frontend

DigitalLudus is a modern, interactive Latin learning platform that serves as a digital companion to the Ludus textbook. Built with Next.js, TypeScript, and shadcn/ui components.

## Features

- 🎓 **Interactive Lessons**: Structured lessons with vocabulary, grammar, and practice exercises
- 📚 **PDF Textbook Integration**: Built-in PDF reader with navigation tools
- 🧠 **Adaptive Vocabulary Practice**: Spaced repetition system for vocabulary drilling
- 📝 **Lesson-Specific Quizzes**: Customized quizzes for each lesson
- 🤖 **AI-Powered Tutor**: Magister Marcellus, your Roman AI tutor powered by Gemini
- 👤 **Optional Authentication**: Progress tracking with NextAuth.js
- 🎨 **Modern UI/UX**: Beautiful blue/indigo design with gradients and animations
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/digitalludus.git
   cd digitalludus/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys (optional for basic functionality):
   - `GEMINI_API_KEY`: For AI tutor functionality
   - `NEXTAUTH_SECRET`: For authentication (generate with `openssl rand -base64 32`)
   - Google OAuth credentials (optional)

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to see the application.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── AIChat.tsx       # Magister Marcellus AI tutor
│   ├── Quiz.tsx         # Quiz component
│   ├── VocabularyDriller.tsx  # Vocabulary practice
│   └── ...
├── pages/               # Next.js pages
│   ├── api/             # API routes
│   ├── lesson/          # Lesson pages
│   ├── index.tsx        # Homepage
│   └── about.tsx        # About page
├── data/                # Static data
│   ├── lessons.ts       # Lesson content
│   └── quiz.ts          # Quiz data
└── styles/              # Global styles
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Radix UI** - Primitive components
- **NextAuth.js** - Authentication
- **Google Gemini API** - AI tutor functionality
- **React PDF** - PDF viewing

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Authors

- Max Liu & Ronald Qiao

---

*Making Latin accessible through technology. 🏛️*