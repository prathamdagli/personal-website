# Context7: /motiondivision/motion

Query: React AnimatePresence useReducedMotion page transitions reduced motion

### useReducedMotion for accessibility

Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/useReducedMotion.tsx

Best practice for respecting user motion preferences. Pass `{ type: false }` as transition when reduced motion is preferred, which disables animation entirely while still applying final values.

```tsx
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion"

const style = {
    width: 100,
    height: 100,
    background: "red",
    opacity: 1,
}

export const App = () => {
    const [isVisible, setIsVisible] = useState(false)
    const shouldReduceMotion = useReducedMotion()
    const transition = shouldReduceMotion ? { type: false } : { duration: 1 }
    const variants = {
        visible: { opacity: 1, transition },
        hidden: { opacity: 0, transition },
    }

    useEffect(() => {
        setTimeout(() => setIsVisible(!isVisible), 1500)
    }, [isVisible])

    return (
        <motion.div animate={isVisible ? "visible" : "hidden"} initial={false}>
            <motion.div variants={variants} style={style} />
        </motion.div>
    )
}
```

--------------------------------

### AnimatePresence for menus (accordion) with MotionConfig defaults

Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/tests/animate-presence-exit-height.tsx

A menu/accordion best-practice pattern: each item's panel is animated in/out with AnimatePresence, keyed variants (open/closed) control height+opacity, initial={false} avoids animating on first mount, and MotionConfig supplies the default transition to all motion children. This directly demonstrates the 'AnimatePresence for menus' and 'avoid over-animating list items' guidance — items map renders only buttons, and only the open panel animates via exit variants.

```javascript
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { useState } from "react"

const items = [
    { id: "a", title: "Item A", content: "Content for item A" },
    { id: "b", title: "Item B", content: "Content for item B" },
    { id: "c", title: "Item C", content: "Content for item C" },
]

function AccordionItem({
    item,
    isOpen,
    onToggle,
}: {
    item: (typeof items)[0]
    isOpen: boolean
    onToggle: () => void
}) {
    return (
        <div>
            <button className="trigger" data-id={item.id} onClick={onToggle}>
                {item.title}
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className="panel"
                        data-panel={item.id}
                        variants={{
                            open: { height: "auto", opacity: 1 },
                            closed: { height: 0, opacity: 0 },
                        }}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        style={{ overflow: "hidden" }}
                        transition={{
                            type: "tween",
                            ease: "linear",
                            duration: 10,
                        }}
                    >
                        <div style={{ padding: 20 }}>{item.content}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
```
