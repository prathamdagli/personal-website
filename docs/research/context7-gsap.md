# Context7: /greensock/gsap

Query: React gsap.context cleanup ScrollTrigger matchMedia pin horizontal scrolling reduced motion

### gsap.context(func?, scope?): Context

Source: https://github.com/greensock/gsap/blob/master/_autodocs/api-reference/gsap.md

Creates a context that records animations created inside the provided function for batch revert/kill. Returns the current context when called with no arguments.

```APIDOC
## `gsap.context(func?, scope?): Context`

### Description
Creates a context that records animations created inside the provided function for batch revert/kill. Returns the current context when called with no arguments.

### Method
`context`

### Parameters
- **func** (ContextFunc) - Optional - A function that receives the context and a `contextSafe` helper. Animations created inside are recorded.
- **scope** (Element | string | object) - Optional - A scope element or selector for the context.

### Returns
- **Context** - The created context, or the current context if called with no arguments.

### Context Members
- `selector?` - Optional selector.
- `isReverted` - Whether the context has been reverted.
- `conditions?` - Optional conditions.
- `queries?` - Optional queries.
- `add(methodName, func, scope?)` - Adds a named callable.
- `add(func, scope?)` - Adds a function.
- `ignore(func)` - Ignores animations created inside the function.
- `kill(revert?)` - Kills the context, optionally reverting.
- `revert(config?)` - Reverts all recorded animations.
- `clear()` - Clears the context.
- `getTweens()` - Returns the tweens (runtime only).

### Example
```ts
const ctx = gsap.context((self) => {
  gsap.to(".box", { x: 100 });
  self.add("myAnim", () => gsap.to(".b", { y: 50 }));
}, myElement);
ctx.revert(); // undo everything
```
```

--------------------------------

### Context.kill reverts tweens, runs cleanup, and unregisters from media

Source: https://github.com/greensock/gsap/blob/master/src/gsap-core.js

Called by `_onMediaChange` when a condition toggles. It reverts all tweens in reverse global-time order, kills nested timelines/ScrollTriggers, invokes all registered cleanup functions, clears the context's data, and — when `matchMedia` is true — removes the context from `_media` so it no longer participates in future media change checks.

```javascript
kill(revert, matchMedia) {
		if (revert) {
			let tweens = this.getTweens(),
				i = this.data.length,
				t;
			while (i--) {
				t = this.data[i];
				if (t.data === "isFlip") {
					t.revert();
					t.getChildren(true, true, false).forEach(tween => tweens.splice(tweens.indexOf(tween), 1));
				}
			}
			tweens.map(t => { return {g: t._dur || t._delay || (t._sat && !t._sat.vars.immediateRender) ? t.globalTime(0) : -Infinity, t}}).sort((a, b) => b.g - a.g || -Infinity).forEach(o => o.t.revert(revert));
			i = this.data.length;
			while (i--) {
				t = this.data[i];
				if (t instanceof Timeline) {
					if (t.data !== "nested") {
						t.scrollTrigger && t.scrollTrigger.revert();
						t.kill();
					}
				} else {
					!(t instanceof Tween) && t.revert && t.revert(revert)
				}
			}
			this._r.forEach(f => f(revert, this));
			this.isReverted = true;
		} else {
			this.data.forEach(e => e.kill && e.kill());
		}
		this.clear();
		if (matchMedia) {
			let i = _media.length;
			while (i--) {
				_media[i].id === this.id && _media.splice(i, 1);
			}
		}
	}
```

--------------------------------

### gsap.context: Type definitions and usage

Source: https://github.com/greensock/gsap/blob/master/_autodocs/api-reference/gsap.md

TypeScript type definitions for `gsap.context` and a usage example. The context records animations created inside the callback for batch revert or kill. Calling `ctx.revert()` undoes all animations created within the context. The `self.add` method registers a named callable that can be reverted later.

```ts
type ContextSafeFunc = (func: Function) => Function;
type ContextFunc = (context: Context, contextSafe?: ContextSafeFunc) => Function | any | void;
function context(func?: ContextFunc, scope?: Element | string | object): Context;
```

```ts
const ctx = gsap.context((self) => {
  gsap.to(".box", { x: 100 });
  self.add("myAnim", () => gsap.to(".b", { y: 50 })); // named callable
}, myElement);
ctx.revert(); // undo everything
```

--------------------------------

### anticipatePin: anticipates pinning based on velocity to avoid downward-scroll lag

Source: https://github.com/greensock/gsap/blob/master/src/ScrollTrigger.js

When anticipatePin is set and the trigger is pinned, ScrollTrigger extrapolates the scroll position a few ticks ahead using measured velocity (scroll - scroll2) so the pin engages before the browser's separate-thread scrolling catches up, eliminating the visual lag/glitch that occurs with downward scroll. This directly addresses the downward scroll lag mentioned in the query.

```javascript
			// anticipate the pinning a few ticks ahead of time based on velocity to avoid a visual glitch due to the fact that most browsers do scrolling on a separate thread (not synced with requestAnimationFrame).
			if (anticipatePin && pin && !_refreshing && !_startup && _lastScrollTime) {
				if (!clipped && start < scroll + ((scroll - scroll2) / (_getTime() - _time2)) * anticipatePin) {
					clipped = 0.0001;
				} else if (clipped === 1 && end > scroll + ((scroll - scroll2) / (_getTime() - _time2)) * anticipatePin) {
					clipped = 0.9999;
				}
			}
```

--------------------------------

### MatchMedia class + autoOverwrite + killTweensOf

Source: https://github.com/greensock/gsap/blob/master/src/gsap-core.js

MatchMedia enables responsive animation setups via CSS media queries (e.g. "(prefers-reduced-motion: reduce)"). On match, the callback runs; on mismatch, context.revert() tears down animations. The autoOverwrite block in _initTween selectively kills only conflicting tweens without removing non-overlapping ones. killTweensOf() recursively finds and kills tweens matching given targets/properties.

```javascript
class MatchMedia {
	constructor(scope) {
		this.contexts = [];
		this.scope = scope;
		_context && _context.data.push(this);
	}
	add(conditions, func, scope) {
		_isObject(conditions) || (conditions = {matches: conditions});
		let context = new Context(0, scope || this.scope),
			cond = context.conditions = {},
			mq, p, active;
		_context && !context.selector && (context.selector = _context.selector);
		this.contexts.push(context);
		func = context.add("onMatch", func);
		context.queries = conditions;
		for (p in conditions) {
			if (p === "all") {
				active = 1;
			} else {
				mq = _win.matchMedia(conditions[p]);
				if (mq) {
					_media.indexOf(context) < 0 && _media.push(context);
					(cond[p] = mq.matches) && (active = 1);
					mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
				}
			}
		}
		active && func(context, f => context.add(null, f));
		return this;
	}
	revert(config) {
		this.kill(config || {});
	}
	kill(revert) {
		this.contexts.forEach(c => c.kill(revert, true));
	}
}

// autoOverwrite in _initTween (gsap-core.js ~2201):
if (autoOverwrite && tween._pt) {
	_overwritingTween = tween;
	_globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
	overwritten = !tween.parent;
	_overwritingTween = 0;
}

// Timeline.killTweensOf() (gsap-core.js ~1803):
killTweensOf(targets, props, onlyActive) {
	let tweens = this.getTweensOf(targets, onlyActive),
		i = tweens.length;
	while (i--) {
		(_overwritingTween !== tweens[i]) && tweens[i].kill(targets, props);
	}
	return this;
}
```
