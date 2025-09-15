# Dhamecha Frontend

A modern, responsive frontend application for Dhamecha Group built with Next.js 15, featuring advanced GSAP animations and a comprehensive component library.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
- **Advanced Animations**: Comprehensive GSAP integration with scroll-triggered animations
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Component Library**: Reusable UI components with consistent design system
- **Performance Optimized**: Built with Turbopack for faster development and builds
- **Accessibility**: WCAG compliant components and interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: GSAP 3.12.5 with ScrollTrigger
- **Icons**: Lucide React
- **Fonts**: Work Sans & PT Serif (Google Fonts)
- **Build Tool**: Turbopack

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Main navigation header
│   │   ├── Footer.tsx       # Site footer with links
│   │   ├── ScrollReveal.tsx # Animation components
│   │   ├── typography.tsx   # Typography system
│   │   ├── search.tsx       # Search functionality
│   │   └── ui/              # Base UI components
│   ├── contexts/            # React contexts
│   │   └── GSAPContext.tsx  # GSAP provider
│   ├── hooks/               # Custom React hooks
│   │   ├── useGSAPAnimation.ts
│   │   └── useScrollReveal.ts
│   ├── scroll-reveal-demo/  # Animation showcase
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── public/                  # Static assets
└── globals.css              # Global styles
```

## 🎨 Design System

### Typography
- **Work Sans**: Primary font for UI elements
- **PT Serif**: Accent font for headings and special content

### Color Palette
- **Primary**: Violet shades (#351646 to #743795)
- **Neutral**: Grey scale for text and backgrounds
- **Accent**: Various colors for interactive elements

### Components
- **Header**: Fixed navigation with mobile menu
- **Footer**: Comprehensive site footer with links and contact info
- **Typography**: Consistent text styling system
- **Search**: Integrated search functionality
- **Marquee**: Animated text banner

## 🎭 Animation System

The project includes a comprehensive GSAP animation system with:

### Available Components
- `FadeInReveal` - Fade in with slide up
- `ScaleInReveal` - Scale in with bounce effect
- `SlideInLeftReveal` - Slide in from left
- `SlideInRightReveal` - Slide in from right
- `RotateInReveal` - Rotate in animation
- `BounceInReveal` - Bounce in effect
- `TypewriterReveal` - Typewriter text effect

### Group Animations
- `FadeInGroup` - Staggered fade in for multiple elements
- `ScaleInGroup` - Staggered scale in
- `SlideInLeftGroup` - Staggered slide from left
- And more...

### Usage Example
```tsx
import { FadeInReveal, TypewriterReveal } from '@/app/components/ScrollReveal';

function MyComponent() {
  return (
    <div>
      <FadeInReveal delay={0.2}>
        <h1>Animated Title</h1>
      </FadeInReveal>
      
      <TypewriterReveal delay={0.4} stagger={0.1}>
        <p>This text will type out character by character</p>
      </TypewriterReveal>
    </div>
  );
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dhamecha-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Mobile Features
- Collapsible navigation menu
- Touch-friendly interactions
- Optimized animations for mobile performance
- Responsive typography scaling

## 🎯 Key Pages & Features

### Animation Demo (`/scroll-reveal-demo`)
- Interactive showcase of all animation types
- Live code examples
- Performance testing tools
- Animation customization options

## 🔧 Configuration

### GSAP Setup
The project includes a complete GSAP setup with:
- ScrollTrigger plugin for scroll-based animations
- React context for GSAP instance management
- Custom hooks for common animation patterns
- TypeScript support for better development experience

### Tailwind Configuration
- Custom color palette matching brand guidelines
- Typography scale with consistent spacing
- Responsive utilities for all breakpoints
- Animation utilities for enhanced interactions

## 📚 Documentation

- **[GSAP Setup Guide](./GSAP_SETUP.md)** - Complete GSAP integration guide
- **[Scroll Reveal Guide](./SCROLL_REVEAL_GUIDE.md)** - Animation system documentation

## 🚀 Deployment

Built with ❤️ by the Dhamecha Development Team
