# Homepage

## hero section changes

### home/HomeHero.tsx

- Instead of repeating the media query, use the pre-installed `useMatchMedia` hook:

```ts
const isMobileView = window.innerWidth <= 768; //replaced
```

```ts
const isTablet = useMatchMedia("(max-width:768px)");
const isMobileView = isTablet || isMobile; //with
```

- Skip intro animation on mobile

```ts
if (isMobileView) return;   // added
}, [isMobileView]);         // was []
```

**Why:** the animation sets `opacity: 0` on `wrapperRef`, which holds the hero
image and `<H1>` — the LCP element. LCP isn't recorded until the fade ends:
2 rAF + 0.5s ≈ **530ms added**. Skipped on mobile, kept on desktop.

**Why the dep:** `useMatchMedia` returns `false` before mount, so with `[]` the
guard ran against a stale value and never fired. `[isMobileView]` re-runs it
once the query resolves.

**Impact:** mobile LCP −530ms. CLS unchanged (opacity/transform don't affect it).

- Removed `key` from Swiper

```tsx
key={`home-hero-${isDesktopPointer}`}   // removed
```

**Why:** `isDesktopPointer` flips `false → true` after mount, so the key change
forced a full unmount/remount of Swiper on every desktop load — rebuild slides,
re-measure, restart autoplay, plus a slide flash.

- Reducing image quality per slide

```tsx
quality={index === 0 ? 80 : 60}   // was: index === 0 ? 70 : 80
```

### home/Home