# GSAP Animation Setup

This project includes a complete GSAP (GreenSock Animation Platform) setup with React integration for Next.js.

## 🚀 What's Included

### 1. Core Setup
- **GSAP Package**: Latest 3.x installed
- **ScrollTrigger Plugin**: For scroll-based animations
- **GSAP Context Provider**: React context for managing GSAP instances
- **TypeScript Support**: Strong typing where possible

### 2. Custom Hooks
- `useGSAPAnimation`: Main hook for creating custom animations
- `useFadeIn`, `useSlideInLeft`, `useSlideInRight`, `useScaleIn`, `useRotateIn`

### 3. Reusable Components
- `ScrollReveal`, `ScrollGroup` wrappers
- Predefined reveals: `FadeInReveal`, `ScaleInReveal`, `SlideInLeftReveal`, `SlideInRightReveal`, `RotateInReveal`, `BounceInReveal`
- Text utilities: `TypewriterReveal`, `SplitTextReveal`, `LineReveal`, `WordReveal`, `LetterReveal`

## 📁 File Structure

```
src/app/
├── contexts/
│   └── GSAPContext.tsx          # GSAP React context provider
├── hooks/
│   ├── useGSAPAnimation.ts      # Custom GSAP hooks
│   └── useScrollReveal.ts       # Scroll-triggered reveal hooks
├── components/
│   └── ScrollReveal.tsx         # Reveal components (and text helpers)
├── scroll-reveal-demo/
│   └── page.tsx                 # Demo page showcasing animations
└── layout.tsx                   # Wraps with GSAPProvider
```

## 🎯 Usage Examples

### Basic Animation Hook
```tsx
import { useFadeIn } from '@/app/hooks/useGSAPAnimation';

function MyComponent() {
  const elementRef = useFadeIn(1, 0.5);
  return <div ref={elementRef}>This will fade in</div>;
}
```

### Custom Animation
```tsx
import { useGSAPAnimation } from '@/app/hooks/useGSAPAnimation';

function MyComponent() {
  const elementRef = useGSAPAnimation({
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1 },
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: { start: 'top 80%', end: 'bottom 20%' }
  });
  return <div ref={elementRef}>Custom animation</div>;
}
```

### Reveal Components
```tsx
import { FadeInReveal, ScaleInReveal } from '@/app/components/ScrollReveal';

function Example() {
  return (
    <div>
      <FadeInReveal delay={0.2}>
        <h1>Animated Title</h1>
      </FadeInReveal>
      <ScaleInReveal delay={0.4}>
        <p>Animated content</p>
      </ScaleInReveal>
    </div>
  );
}
```

## 🔧 Configuration Defaults
- Start: `'top 80%'`
- Toggle Actions: `'play none none reverse'`
- Ease: `'power3.out'` (varies per preset)

## 🎯 Best Practices
1. Clean up ScrollTrigger instances in `useEffect` cleanup
2. Respect `prefers-reduced-motion`
3. Keep stagger values modest (0.05–0.3s)
4. Test on mobile devices

## 🔗 Resources
- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Plugin](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP + React](https://greensock.com/docs/v3/React)

---
Your GSAP setup is ready to use. Visit `/scroll-reveal-demo` for live examples.
