'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import {
  ScrollReveal,
  ScrollGroup,
  FadeInReveal,
  ScaleInReveal,
  SlideInLeftReveal,
  SlideInRightReveal,
  RotateInReveal,
  BounceInReveal,
  FadeInGroup,
  ScaleInGroup,
  SlideInLeftGroup,
  SlideInRightGroup,
  RotateInGroup,
  BounceInGroup,
  TypewriterReveal,
  SplitTextReveal,
  LineReveal,
  LetterReveal,
  WordReveal,
} from '../components/ScrollReveal';
import { useFadeIn, useSlideInLeft, useSlideInRight, useScaleIn } from '@/app/hooks/useGSAPAnimation';

export default function ScrollRevealDemo() {
  // GSAP Demo hooks
  const heroRef = useFadeIn(1, 0.5) as React.RefObject<HTMLDivElement>;
  const leftRef = useSlideInLeft(1, 0.2) as React.RefObject<HTMLDivElement>;
  const rightRef = useSlideInRight(1, 0.4) as React.RefObject<HTMLDivElement>;
  const scaleRef = useScaleIn(0.8, 0.6) as React.RefObject<HTMLDivElement>;

  // Advanced animation example
  const advancedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!advancedRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: advancedRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      advancedRef.current.querySelectorAll('.stagger-item'),
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center space-y-8">
          <FadeInReveal delay={0.2}>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Scroll Reveal Animations
            </h1>
          </FadeInReveal>

          <div className="max-w-6xl mx-auto ">
            <LineReveal className="text-4xl font-bold overflow-hidden">
              This text will animate line by line
            </LineReveal>
          </div>
          <div className="max-w-6xl mx-auto">
            <WordReveal stagger={0.1} duration={0.6} className="text-4xl font-bold overflow-hidden">
              This text will animate word by word
            </WordReveal>
          </div>
          <div className="max-w-6xl mx-auto">
            <LetterReveal stagger={0.02} duration={0.4} className="text-4xl font-bold overflow-hidden">
              This text will animate character by character
            </LetterReveal>
          </div>
          <div className="max-w-6xl mx-auto">
            <SplitTextReveal splitType="words" stagger={0.05} className="text-4xl font-bold overflow-hidden">
              Dynamic text animation
            </SplitTextReveal>
          </div>
        </div>
      </section>

      {/* Text Animations */}
      <section className="py-20 px-8 bg-amber-100 text-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">Text Animations</h2>
        </div>
        <div className="max-w-6xl mx-auto ">
          <LineReveal className="text-4xl font-bold overflow-hidden">
            This text will animate line by line
          </LineReveal>
        </div>
        <div className="max-w-6xl mx-auto">
          <WordReveal stagger={0.1} duration={0.6} className="text-4xl font-bold overflow-hidden">
            This text will animate word by word
          </WordReveal>
        </div>
        <div className="max-w-6xl mx-auto">
          <LetterReveal stagger={0.02} duration={0.4} className="text-4xl font-bold overflow-hidden">
            This text will animate character by character
          </LetterReveal>
        </div>
        <div className="max-w-6xl mx-auto">
          <SplitTextReveal splitType="words" stagger={0.05} className="text-4xl font-bold overflow-hidden">
            Dynamic text animation
          </SplitTextReveal>
        </div>

        {/* Typewriter Reveal Section */}
        <div className="max-w-6xl mx-auto">
          <TypewriterReveal delay={0.2} duration={0.05} stagger={0.05} className="text-xl font-bold text-[red]">
            Typewriter Effect
          </TypewriterReveal>
        </div>
      </section>

      {/* Individual Animations Section */}
      <section className="py-20 px-8 ">
        <div className="max-w-6xl mx-auto">
          <FadeInReveal>
            <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">Individual Animations</h2>
          </FadeInReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fade In */}
            <FadeInReveal delay={0.2} className='col-span-1'>
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-green-400">Fade In</h3>
                <p className="text-gray-300">Elements fade in with a subtle slide up motion as they enter the viewport.</p>
              </div>
            </FadeInReveal>

            {/* Scale In */}
            <ScaleInReveal delay={0.4}>
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">Scale In</h3>
                <p className="text-gray-300">Elements scale up from 80% to 100% with a smooth back-out easing.</p>
              </div>
            </ScaleInReveal>

            {/* Slide In Left */}
            <SlideInLeftReveal delay={0.6}>
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Slide In Left</h3>
                <p className="text-gray-300">Elements slide in from the left side of the screen with a fade effect.</p>
              </div>
            </SlideInLeftReveal>

            {/* Slide In Right */}
            <SlideInRightReveal delay={0.8}>
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-red-400">Slide In Right</h3>
                <p className="text-gray-300">Elements slide in from the right side of the screen with a fade effect.</p>
              </div>
            </SlideInRightReveal>

            {/* Rotate In */}
            <RotateInReveal delay={1.0}>
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-pink-400">Rotate In</h3>
                <p className="text-gray-300">Elements rotate in from -180 degrees with a smooth fade transition.</p>
              </div>
            </RotateInReveal>

            {/* Bounce In */}
            <BounceInReveal delay={1.2}>
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Bounce In</h3>
                <p className="text-gray-300">Elements bounce in with a playful scale animation and bounce easing.</p>
              </div>
            </BounceInReveal>
          </div>
        </div>
      </section>

      {/* Group Animations Section */}
      <section className="py-20 px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <FadeInReveal>
            <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">Group Animations</h2>
          </FadeInReveal>

          {/* Fade In Group */}
          <div className="mb-16">
            <FadeInReveal>
              <h3 className="text-2xl font-semibold mb-8 text-green-400">Fade In Group</h3>
            </FadeInReveal>

            <FadeInGroup stagger={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-gray-700 p-6 rounded-lg" data-scroll>
                  <div className="w-full h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-4"></div>
                  <h4 className="text-lg font-semibold mb-2">Card {n}</h4>
                  <p className="text-gray-300 text-sm">This card fades in with a staggered animation as part of the group.</p>
                </div>
              ))}
            </FadeInGroup>
          </div>

          {/* Scale In Group */}
          <div className="mb-16">
            <FadeInReveal>
              <h3 className="text-2xl font-semibold mb-8 text-blue-400">Scale In Group</h3>
            </FadeInReveal>

            <ScaleInGroup stagger={0.3} className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-gray-700 p-6 rounded-lg" data-scroll>
                  <div className="w-full h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4"></div>
                  <h4 className="text-lg font-semibold mb-2">Item {n}</h4>
                  <p className="text-gray-300 text-sm">Scale animation with staggered timing.</p>
                </div>
              ))}
            </ScaleInGroup>
          </div>

          {/* Slide In Left Group */}
          <div className="mb-16">
            <FadeInReveal>
              <h3 className="text-2xl font-semibold mb-8 text-yellow-400">Slide In Left Group</h3>
            </FadeInReveal>

            <SlideInLeftGroup stagger={0.25}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((n) => (
                  <div key={n} className="bg-gray-700 p-6 rounded-lg" data-scroll>
                    <div className="w-full h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg mb-4"></div>
                    <h4 className="text-lg font-semibold mb-2">Slide Card {n}</h4>
                    <p className="text-gray-300 text-sm">Slides in from the left with staggered timing.</p>
                  </div>
                ))}
              </div>
            </SlideInLeftGroup>
          </div>

          {/* Slide In Right Group */}
          <div className="mb-16">
            <FadeInReveal>
              <h3 className="text-2xl font-semibold mb-8 text-red-400">Slide In Right Group</h3>
            </FadeInReveal>

            <SlideInRightGroup stagger={0.25}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((n) => (
                  <div key={n} className="bg-gray-700 p-6 rounded-lg" data-scroll>
                    <div className="w-full h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-lg mb-4"></div>
                    <h4 className="text-lg font-semibold mb-2">Slide Card {n}</h4>
                    <p className="text-gray-300 text-sm">Slides in from the right with staggered timing.</p>
                  </div>
                ))}
              </div>
            </SlideInRightGroup>
          </div>

          {/* Rotate In Group */}
          <div className="mb-16">
            <FadeInReveal>
              <h3 className="text-2xl font-semibold mb-8 text-pink-400">Rotate In Group</h3>
            </FadeInReveal>

            <RotateInGroup stagger={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-gray-700 p-6 rounded-lg" data-scroll>
                    <div className="w-full h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg mb-4"></div>
                    <h4 className="text-lg font-semibold mb-2">Rotate Card {n}</h4>
                    <p className="text-gray-300 text-sm">Rotates in with staggered timing.</p>
                  </div>
                ))}
              </div>
            </RotateInGroup>
          </div>

          {/* Bounce In Group */}
          <div className="mb-16">
            <FadeInReveal>
              <h3 className="text-2xl font-semibold mb-8 text-cyan-400">Bounce In Group</h3>
            </FadeInReveal>

            <BounceInGroup stagger={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-gray-700 p-6 rounded-lg" data-scroll>
                    <div className="w-full h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg mb-4"></div>
                    <h4 className="text-lg font-semibold mb-2">Bounce {n}</h4>
                    <p className="text-gray-300 text-sm">Bounces in with staggered timing.</p>
                  </div>
                ))}
              </div>
            </BounceInGroup>
          </div>
        </div>
      </section>

      {/* Custom Animations Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInReveal>
            <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">Custom Animations</h2>
          </FadeInReveal>

          {/* Custom ScrollReveal */}
          <div className="mb-16">
            <FadeInReveal>
              <h3 className="text-2xl font-semibold mb-8 text-indigo-400">Custom ScrollReveal</h3>
            </FadeInReveal>

            <ScrollReveal
              from={{ autoAlpha: 0, y: 100, rotation: 45, scale: 0.5 }}
              to={{ autoAlpha: 1, y: 0, rotation: 0, scale: 1 }}
              duration={1.5}
              delay={0.2}
              ease="elastic.out(1, 0.3)"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-xl text-center">
                <h4 className="text-2xl font-bold mb-4">Custom Animation</h4>
                <p className="text-lg">This element uses a custom animation with rotation, scale, and elastic easing.</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Custom ScrollGroup */}
          <div className="mb-16">
            <FadeInReveal>
              <h3 className="text-2xl font-semibold mb-8 text-teal-400">Custom ScrollGroup</h3>
            </FadeInReveal>

            <ScrollGroup
              from={{ autoAlpha: 0, y: 50, skewX: 15 }}
              to={{ autoAlpha: 1, y: 0, skewX: 0 }}
              duration={1}
              stagger={0.3}
              ease="power4.out"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-gray-700 p-6 rounded-lg" data-scroll>
                    <div className="w-full h-32 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg mb-4"></div>
                    <h4 className="text-lg font-semibold mb-2">Custom Group {n}</h4>
                    <p className="text-gray-300 text-sm">Custom group animation with skew effect.</p>
                  </div>
                ))}
              </div>
            </ScrollGroup>
          </div>
        </div>
      </section>

      {/* Usage Examples Section */}
      <section className="py-20 px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <FadeInReveal>
            <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">Usage Examples</h2>
          </FadeInReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Component Usage */}
            <FadeInReveal delay={0.2}>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-green-400">Component Usage</h3>
                <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                  {`import { FadeInReveal, ScaleInReveal } from '@/components/ScrollReveal';

function MyComponent() {
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
}`}
                </pre>
              </div>
            </FadeInReveal>

            {/* Hook Usage */}
            <FadeInReveal delay={0.4}>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Hook Usage</h3>
                <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                  {`import { useScrollReveal } from '@/hooks/useScrollReveal';

function MyComponent() {
  const ref = useScrollReveal({
    from: { autoAlpha: 0, y: 50 },
    to: { autoAlpha: 1, y: 0 },
    duration: 1,
    delay: 0.2
  });

  return <div ref={ref}>Animated content</div>;
}`}
                </pre>
              </div>
            </FadeInReveal>

            {/* Group Usage */}
            <FadeInReveal delay={0.6}>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">Group Usage</h3>
                <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                  {`import { FadeInGroup } from '@/components/ScrollReveal';

function MyComponent() {
  return (
    <FadeInGroup stagger={0.2}>
      <div data-scroll>Item 1</div>
      <div data-scroll>Item 2</div>
      <div data-scroll>Item 3</div>
    </FadeInGroup>
  );
}`}
                </pre>
              </div>
            </FadeInReveal>

            {/* Utility Usage */}
            <FadeInReveal delay={0.8}>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-red-400">Utility Usage</h3>
                <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                  {`import { fadeInUpReveal } from '@/utils/gsapUtils';

useEffect(() => {
  const element = document.querySelector('.my-element');
  if (element) {
    fadeInUpReveal(element, 0.2);
  }
}, []);`}
                </pre>
              </div>
            </FadeInReveal>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <FadeInReveal className="py-20 px-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Parallax Effect</h2>
          <p className="text-xl">This section moves at a different speed than the rest of the page, creating a beautiful parallax scrolling effect.</p>
        </div>
      </FadeInReveal>

      {/* Advanced Stagger Animation */}
      <section className="py-20 px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <FadeInReveal>
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Advanced Stagger Animation</h2>
          </FadeInReveal>

          <div ref={advancedRef} className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="stagger-item bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">Item {item}</h3>
                <p className="text-gray-600 text-center">This item animates with a stagger effect, creating a wave-like animation.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hook Examples Section */}
      <section className="py-20 px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <FadeInReveal>
            <h2 className="text-4xl font-bold text-center mb-12 text-purple-400">Custom Hook Examples</h2>
          </FadeInReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <div ref={leftRef} className="bg-gray-700 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">useSlideInLeft Hook</h3>
              <p className="text-gray-300">This card uses the custom useSlideInLeft hook for a clean, reusable animation.</p>
            </div>

            <div ref={rightRef} className="bg-gray-700 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">useSlideInRight Hook</h3>
              <p className="text-gray-300">This card uses the custom useSlideInRight hook for consistent animations.</p>
            </div>

            <div ref={scaleRef} className="bg-gray-700 p-8 rounded-lg shadow-lg md:col-span-2">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">useScaleIn Hook</h3>
              <p className="text-gray-300">This card uses the custom useScaleIn hook with a bounce effect for engaging animations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero with Custom Animation */}
      <section className="py-20 px-8 text-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div ref={heroRef} className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">Ready to Animate?</h2>
          <p className="text-xl mb-8">GSAP is now fully integrated into your Next.js project. Start creating amazing animations!</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">Get Started</button>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInReveal>
            <h2 className="text-3xl font-bold mb-8 text-purple-400">Ready to Use in Your Project!</h2>
          </FadeInReveal>

          <ScaleInReveal delay={0.2}>
            <p className="text-xl text-gray-300 mb-8">All these animations are now available throughout your project. Simply import the components or hooks you need and start animating!</p>
          </ScaleInReveal>

          <BounceInReveal delay={0.4}>
            <div className="flex justify-center space-x-4">
              <Link href="/" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Back to Home
              </Link>
            </div>
          </BounceInReveal>
        </div>
      </section>
    </div>
  );
}
