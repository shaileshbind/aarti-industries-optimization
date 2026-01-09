# Scroll Reveal Animation Guide

This guide explains how to use the comprehensive scroll reveal animation system in your Next.js project.

## Overview

The scroll reveal system provides multiple ways to create scroll-triggered animations:

1. **React Components** - Easy-to-use wrapper components
2. **React Hooks** - Custom hooks for more control
3. **Utility Functions** - Direct GSAP utility functions
4. **Group Animations** - Staggered animations for multiple elements

## Quick Start

### 1. Using Components (Recommended for most cases)

```tsx
import {
  FadeInReveal,
  ScaleInReveal,
  FadeInGroup,
} from "@/components/ScrollReveal";

function MyComponent() {
  return (
    <div>
      {/* Single element animation */}
      <FadeInReveal delay={0.2}>
        <h1>Animated Title</h1>
      </FadeInReveal>

      {/* Group animation */}
      <FadeInGroup stagger={0.2}>
        <div data-scroll>Item 1</div>
        <div data-scroll>Item 2</div>
        <div data-scroll>Item 3</div>
      </FadeInGroup>
    </div>
  );
}
```

### 2. Using Hooks (For custom animations)

```tsx
import { useScrollReveal } from "@/hooks/useScrollReveal";

function MyComponent() {
  const ref = useScrollReveal({
    from: { autoAlpha: 0, y: 50 },
    to: { autoAlpha: 1, y: 0 },
    duration: 1,
    delay: 0.2,
  });

  return <div ref={ref}>Animated content</div>;
}
```

### 3. Using Utility Functions (For programmatic control)

```tsx
import { fadeInUpReveal } from "@/utils/gsapUtils";

useEffect(() => {
  const element = document.querySelector(".my-element");
  if (element) {
    fadeInUpReveal(element, 0.2);
  }
}, []);
```

## Available Components

### Individual Animation Components

| Component            | Description           | Default Animation                                            |
| -------------------- | --------------------- | ------------------------------------------------------------ |
| `FadeInReveal`       | Fade in with slide up | `autoAlpha: 0, y: 50` → `autoAlpha: 1, y: 0`                 |
| `ScaleInReveal`      | Scale in with bounce  | `autoAlpha: 0, scale: 0.8` → `autoAlpha: 1, scale: 1`        |
| `SlideInLeftReveal`  | Slide in from left    | `autoAlpha: 0, x: -100` → `autoAlpha: 1, x: 0`               |
| `SlideInRightReveal` | Slide in from right   | `autoAlpha: 0, x: 100` → `autoAlpha: 1, x: 0`                |
| `RotateInReveal`     | Rotate in             | `autoAlpha: 0, rotation: -180` → `autoAlpha: 1, rotation: 0` |
| `BounceInReveal`     | Bounce in             | `autoAlpha: 0, scale: 0.3` → `autoAlpha: 1, scale: 1`        |

### Group Animation Components

| Component           | Description            | Stagger Default |
| ------------------- | ---------------------- | --------------- |
| `FadeInGroup`       | Group fade in          | 0.2s            |
| `ScaleInGroup`      | Group scale in         | 0.2s            |
| `SlideInLeftGroup`  | Group slide from left  | 0.2s            |
| `SlideInRightGroup` | Group slide from right | 0.2s            |
| `RotateInGroup`     | Group rotate in        | 0.2s            |
| `BounceInGroup`     | Group bounce in        | 0.2s            |

### Generic Components

| Component      | Description                                  |
| -------------- | -------------------------------------------- |
| `ScrollReveal` | Generic scroll reveal with custom animation  |
| `ScrollGroup`  | Generic group animation with custom settings |

## Component Props

### Individual Components Props

```tsx
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // Animation delay in seconds
  duration?: number; // Animation duration in seconds
  stagger?: number; // Stagger delay for group animations
  disabled?: boolean; // Disable animation
  as?: keyof JSX.IntrinsicElements; // HTML element type
}
```

### Group Components Props

```tsx
interface ScrollGroupProps extends ScrollRevealProps {
  groupSelector?: string; // CSS selector for child elements (default: '[data-scroll]')
}
```

### Generic ScrollReveal Props

```tsx
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  disabled?: boolean;

  // Animation properties
  from?: gsap.TweenVars; // Initial state
  to?: gsap.TweenVars; // Final state
  duration?: number; // Animation duration
  delay?: number; // Animation delay
  stagger?: number; // Stagger delay
  ease?: string; // Easing function

  // ScrollTrigger properties
  trigger?: string | Element; // Trigger element
  start?: string; // Start position (default: 'top 80%')
  end?: string; // End position
  toggleActions?: string; // Toggle actions (default: 'play none none reverse')
  scrub?: boolean | number; // Scrub animation
  pin?: boolean; // Pin element
  pinSpacing?: boolean; // Pin spacing

  // Callbacks
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: () => void;
}
```

## Hook Usage

### useScrollReveal Hook

```tsx
import { useScrollReveal } from "@/hooks/useScrollReveal";

function MyComponent() {
  const ref = useScrollReveal(
    {
      from: { autoAlpha: 0, y: 50 },
      to: { autoAlpha: 1, y: 0 },
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      start: "top 80%",
      onComplete: () => console.log("Animation complete"),
    },
    [
      /* dependencies */
    ],
  );

  return <div ref={ref}>Animated content</div>;
}
```

### Predefined Hook Functions

```tsx
import {
  useFadeInReveal,
  useScaleInReveal,
  useSlideInLeftReveal,
  useSlideInRightReveal,
  useRotateInReveal,
  useBounceInReveal,
  useGroupReveal,
} from "@/hooks/useScrollReveal";

// Individual animations
const fadeRef = useFadeInReveal(1, 0.2); // duration, delay
const scaleRef = useScaleInReveal(1, 0.4);
const slideLeftRef = useSlideInLeftReveal(1, 0.6);

// Group animation
const groupRef = useGroupReveal("fadeIn", 1, 0.2, 0.2); // type, duration, delay, stagger
```

## Utility Functions

### Direct GSAP Functions

```tsx
import {
  fadeInUpReveal,
  scaleInReveal,
  fadeInUpGroup,
  createScrollReveal,
} from "@/utils/gsapUtils";

// Quick animations
useEffect(() => {
  const element = document.querySelector(".my-element");
  if (element) {
    fadeInUpReveal(element, 0.2); // element, delay
  }
}, []);

// Custom animation
useEffect(() => {
  const element = document.querySelector(".my-element");
  if (element) {
    createScrollReveal(element, {
      from: { autoAlpha: 0, y: 100, rotation: 45 },
      to: { autoAlpha: 1, y: 0, rotation: 0 },
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
    });
  }
}, []);
```

## Common Use Cases

### 1. Page Sections

```tsx
function HomePage() {
  return (
    <div>
      <FadeInReveal delay={0.2}>
        <section className="hero">
          <h1>Welcome to Our Site</h1>
        </section>
      </FadeInReveal>

      <ScaleInReveal delay={0.4}>
        <section className="features">
          <h2>Our Features</h2>
        </section>
      </ScaleInReveal>

      <FadeInGroup stagger={0.2}>
        <section className="testimonials" data-scroll>
          <div className="testimonial">Testimonial 1</div>
        </section>
        <section className="testimonials" data-scroll>
          <div className="testimonial">Testimonial 2</div>
        </section>
        <section className="testimonials" data-scroll>
          <div className="testimonial">Testimonial 3</div>
        </section>
      </FadeInGroup>
    </div>
  );
}
```

### 2. Card Grids

```tsx
function ProductGrid({ products }) {
  return (
    <FadeInGroup stagger={0.1}>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={product.id} className="product-card" data-scroll>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </FadeInGroup>
  );
}
```

### 3. Text Animations

```tsx
function AnimatedText({ text }) {
  return (
    <FadeInReveal delay={0.2}>
      <h1 className="text-4xl font-bold">{text}</h1>
    </FadeInReveal>
  );
}
```

### 4. Custom Animations

```tsx
function CustomAnimation() {
  return (
    <ScrollReveal
      from={{ autoAlpha: 0, y: 100, rotation: 45, scale: 0.5 }}
      to={{ autoAlpha: 1, y: 0, rotation: 0, scale: 1 }}
      duration={1.5}
      delay={0.2}
      ease="elastic.out(1, 0.3)"
    >
      <div className="custom-element">Custom animated content</div>
    </ScrollReveal>
  );
}
```

## Advanced Configuration

### Custom ScrollTrigger Settings

```tsx
<ScrollReveal
  from={{ autoAlpha: 0, y: 50 }}
  to={{ autoAlpha: 1, y: 0 }}
  trigger=".my-trigger" // Custom trigger element
  start="top 90%" // Start when element is 90% from top
  end="bottom 10%" // End when element is 10% from bottom
  toggleActions="play pause resume reverse" // Custom toggle actions
  scrub={1} // Scrub animation with scroll
  pin={true} // Pin element during animation
>
  <div>Advanced animation</div>
</ScrollReveal>
```

### Performance Optimization

```tsx
// Use will-change CSS property for better performance
<FadeInReveal className="will-change-transform">
  <div>Optimized animation</div>
</FadeInReveal>

// Disable animations on mobile if needed
<FadeInReveal disabled={isMobile}>
  <div>Desktop-only animation</div>
</FadeInReveal>
```

## Best Practices

1. **Use appropriate delays**: Space out animations with delays (0.1s, 0.2s, 0.3s, etc.)
2. **Keep stagger values small**: 0.1s to 0.3s for group animations
3. **Use semantic HTML**: Choose appropriate HTML elements with the `as` prop
4. **Test on mobile**: Ensure animations work well on touch devices
5. **Consider performance**: Use `will-change` CSS property for complex animations
6. **Accessibility**: Ensure animations don't interfere with user experience

## Troubleshooting

### Common Issues

1. **Animations not triggering**: Check if ScrollTrigger is properly registered
2. **Elements jumping**: Ensure initial state is properly set with `from` values
3. **Performance issues**: Reduce animation complexity or use `will-change` CSS
4. **Mobile issues**: Test on actual devices, not just browser dev tools

### Debug Mode

```tsx
// Enable ScrollTrigger markers for debugging
if (process.env.NODE_ENV === "development") {
  ScrollTrigger.config({
    markers: true,
  });
}
```

## Examples

Visit `/scroll-reveal-demo` to see all animations in action with live examples and code snippets.

## Support

For more advanced GSAP features, refer to the [GSAP Documentation](https://greensock.com/docs/) and [ScrollTrigger Plugin Documentation](https://greensock.com/docs/v3/Plugins/ScrollTrigger).
