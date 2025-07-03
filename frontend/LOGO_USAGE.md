# DigitalLudus Logo Usage

## Logo Files

The DigitalLudus brand includes several logo variations optimized for different use cases:

### Primary Logo Files

- **`logo.svg`** - Main logo (120x80px) for general use
  - Features an open book design in deep red and gold gradients
  - Perfect for headers, documentation, and medium-sized displays

- **`logo-with-text.svg`** - Logo with "DigitalLudus" text (200x60px)
  - Includes the book icon with branded text
  - Ideal for main headers and primary branding locations

- **`favicon.svg`** - Favicon version (32x32px)
  - Optimized for browser tabs and bookmarks
  - Simplified design that works at small sizes

- **`favicon-16.svg`** - Micro favicon (16x16px)
  - Ultra-compact version for very small displays
  - Fallback for legacy browsers

## Design Elements

### Colors
- **Deep Red Gradient**: `#8B0000` → `#B22222` → `#DC143C`
- **Gold Gradient**: `#FFD700` → `#FFA500` → `#FF8C00`
- **Page Color**: `#FFFEF7` → `#F5F5DC` (cream/off-white)

### Typography
- Font Family: Georgia, serif (for logo text)
- Weight: Bold
- Style: Classic, academic feel appropriate for Latin learning

### Symbolism
- **Open Book**: Represents learning, knowledge, and classical education
- **Deep Red**: Academic tradition, Latin heritage, scholarly pursuit
- **Gold**: Excellence, achievement, premium education experience
- **Gradient Effects**: Modern touch while maintaining classical elegance

## Usage Guidelines

### Where the Logo Appears
- Main navigation header (`index.tsx`)
- Lesson page headers (`lesson/[id].tsx`)
- Browser favicon (all pages)
- Meta tags for social sharing

### Implementation
The logos are implemented as SVG files for:
- ✅ Crisp rendering at all sizes
- ✅ Fast loading times
- ✅ Gradient support
- ✅ Accessibility compliance

### Best Practices
- Use `logo-with-text.svg` for main branding locations
- Use `logo.svg` for compact spaces where text is nearby
- Maintain minimum size of 32px height for readability
- Ensure sufficient contrast with background colors

## Technical Implementation

The logos are integrated into the Next.js application through:
- `_document.tsx` - Meta tags and favicon references
- `_app.tsx` - Global title and favicon
- Component files - Direct SVG imports for headers

All logo files are stored in the `/public` directory for optimal Next.js static asset serving.
