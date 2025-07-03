# Contributing to DigitalLudus

Thank you for your interest in contributing to DigitalLudus! This project aims to make Latin education more accessible and engaging through technology.

## 🎯 Project Goals

- **Democratize Latin Education** - Make rigorous Latin learning accessible to everyone
- **Modern Learning Experience** - Combine traditional pedagogy with modern technology
- **Community-Driven** - Build with input from educators and students
- **Open Source** - Transparent, collaborative development

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/digitalludus.git
   cd digitalludus
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Contribution Types

### 🎓 Educational Content
- **Vocabulary Lists** - Add words with definitions, etymology
- **Quiz Questions** - Create assessments with explanations
- **Grammar Exercises** - Develop interactive drills
- **Cultural Notes** - Add historical and cultural context

### 💻 Technical Contributions
- **Feature Development** - Build new learning tools
- **UI/UX Improvements** - Enhance user experience
- **Performance Optimization** - Make the app faster
- **Accessibility** - Improve inclusivity
- **Mobile Experience** - Optimize for mobile devices

### 📚 Documentation
- **User Guides** - Help students and teachers
- **API Documentation** - Document code interfaces
- **Educational Resources** - Create learning materials
- **Translation** - Localize for different languages

## 📊 Content Guidelines

### Vocabulary Entries

```typescript
{
  id: 'lesson-number',
  latin: 'puella',
  english: 'girl',
  partOfSpeech: 'noun (fem.)',
  lesson: 1,
  difficulty: 'easy',
  etymology: 'Related to English "puerile"'
}
```

### Quiz Questions

```typescript
{
  id: 'lesson-question',
  question: 'What is the nominative singular of "puella"?',
  options: ['puella', 'puellam', 'puellae', 'puellarum'],
  correctAnswer: 0,
  explanation: 'Clear, educational explanation',
  lesson: 1,
  difficulty: 'easy',
  category: 'grammar'
}
```

## 🎨 Design Principles

### User Experience
- **Clarity First** - Clear, unambiguous interface
- **Progressive Disclosure** - Show information when needed
- **Consistent Patterns** - Reuse familiar UI elements
- **Accessibility** - WCAG 2.1 AA compliance
- **Mobile-First** - Responsive design for all devices

### Educational Design
- **Immediate Feedback** - Quick correction and explanation
- **Spaced Repetition** - Scientifically-proven learning
- **Multiple Modalities** - Visual, auditory, kinesthetic learning
- **Contextual Learning** - Grammar in meaningful contexts
- **Progress Transparency** - Clear learning milestones

## 🔧 Technical Standards

### Code Quality
- **TypeScript** - Type-safe code
- **ESLint** - Consistent code style
- **Prettier** - Automatic formatting
- **Testing** - Unit and integration tests
- **Performance** - Lighthouse scores > 90

### Git Workflow
```bash
# Feature development
git checkout -b feature/vocabulary-driller
git add .
git commit -m "feat: add vocabulary driller component"
git push origin feature/vocabulary-driller
# Create pull request
```

### Commit Messages
Use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 🧪 Testing

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Test Categories
- **Unit Tests** - Individual component testing
- **Integration Tests** - Component interaction testing
- **E2E Tests** - Full user workflow testing
- **Accessibility Tests** - Screen reader compatibility

## 📋 Pull Request Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Accessibility tested
- [ ] Performance impact assessed

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Accessibility verified

## Screenshots
Include relevant screenshots or GIFs
```

## 📖 Educational Standards

### Pedagogical Accuracy
- **Fact-Checked Content** - Verify all Latin information
- **Appropriate Difficulty** - Match lesson complexity
- **Cultural Sensitivity** - Respectful historical context
- **Inclusive Language** - Welcoming to all learners

### Content Review Process
1. **Subject Matter Review** - Latin accuracy verification
2. **Educational Review** - Pedagogical effectiveness
3. **Technical Review** - Code quality and performance
4. **User Testing** - Student and teacher feedback

## 🌟 Recognition

### Contributors
All contributors will be recognized in:
- **README** - Public acknowledgment
- **Contributors Page** - Dedicated recognition page
- **Release Notes** - Feature attribution
- **Academic Publications** - Research paper citations

### Contribution Levels
- **🌱 Seedling** - First contribution
- **🌿 Growing** - 5+ contributions
- **🌳 Established** - 25+ contributions
- **🏛️ Pillar** - Major feature development

## 📞 Getting Help

### Communication Channels
- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - Questions and ideas
- **Discord** - Real-time chat (coming soon)
- **Email** - Direct contact for sensitive issues

### Mentorship
New contributors can request mentorship for:
- **Technical Guidance** - Code review and architecture
- **Educational Content** - Pedagogical best practices
- **Project Understanding** - Codebase navigation
- **Career Development** - Open source experience

## 📜 Code of Conduct

### Our Pledge
We are committed to providing a welcoming, inclusive environment for all contributors, regardless of background, experience level, or identity.

### Expected Behavior
- **Respectful Communication** - Kind, constructive feedback
- **Collaborative Spirit** - Help others succeed
- **Educational Focus** - Keep learning goals central
- **Inclusive Practices** - Welcome diverse perspectives

### Unacceptable Behavior
- Personal attacks or harassment
- Discriminatory language or behavior
- Sharing private information without consent
- Any conduct harmful to the educational mission

## 🎉 Thank You!

Your contributions help make Latin education more accessible and engaging for students worldwide. Together, we're preserving and modernizing one of humanity's greatest linguistic treasures.

---

*Gratias tibi agimus!* - Thank you for contributing to DigitalLudus! 🏛️✨
