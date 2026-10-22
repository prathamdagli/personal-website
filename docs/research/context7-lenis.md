# Context7: /darkroomengineering/lenis

Query: React Lenis GSAP ScrollTrigger ticker sync destroy reduced motion

### README.md > Considerations > Reduced motion

Source: https://github.com/darkroomengineering/lenis/blob/main/README.md

### Reduced motion

By default, Lenis honors the user's [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) setting: when it is set to `reduce`, smoothing is disabled (`lerp` is forced to `1` so the scroll tracks the input device 1:1, ignoring `duration`/`easing`) and programmatic scrolls (`scrollTo`, anchor links) jump instantly to their target. Lenis keeps running so WebGL/DOM synchronization stays intact, and the preference is picked up live without a reload. You can check `lenis.prefersReducedMotion` to adapt your own animations.

You can opt out (not recommended) with:

```js
const lenis = new Lenis({
  respectReducedMotion: false,
})
```

--------------------------------

### Integrate Lenis with GSAP ScrollTrigger

Source: https://github.com/darkroomengineering/lenis/blob/main/README.md

Synchronize Lenis smooth scrolling with GSAP ScrollTrigger and ticker.

```js
// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);
```

--------------------------------

### GSAP integration

Source: https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md

Example of integrating Lenis with GSAP's ticker, using autoRaf: false and manually calling raf with time * 1000.

```jsx
import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

function App() {
  const lenisRef = useRef()
  
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])
  
  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
  )
}
```

--------------------------------

### Examples > GSAP integration

Source: https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md

### GSAP integration

```jsx
import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

function App() {
  const lenisRef = useRef()
  
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])
  
  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
  )
}
```

--------------------------------

### Disable respectReducedMotion

Source: https://github.com/darkroomengineering/lenis/blob/main/README.md

Opt out of the default behavior that respects the user's prefers-reduced-motion setting.

```js
const lenis = new Lenis({
  respectReducedMotion: false,
})
```
