# Context7: /pmndrs/react-three-fiber

Query: Canvas frameloop demand useFrame performance pause offscreen reduced motion

### Set Canvas frameloop to demand for on-demand rendering

Source: https://github.com/pmndrs/react-three-fiber/blob/master/docs/advanced/scaling-performance.mdx

Set the canvas frameloop prop to 'demand' to enable on-demand rendering. Frames render only when prop changes are detected throughout the component tree, keeping the scene idle when nothing is moving.

```jsx
<Canvas frameloop="demand">
```

--------------------------------

### Scaling performance > On-demand rendering

Source: https://github.com/pmndrs/react-three-fiber/blob/master/docs/advanced/scaling-performance.mdx

three.js apps usually run in a game-loop that executes 60 times a second, React Three Fiber is no different. This is perfectly fine when your scene has _constantly_ moving parts in it. This is what generally drains batteries the most and makes fans spin up.

But if the moving parts in your scene are allowed to come to rest, then it would be wasteful to keep rendering. In such cases you can opt into on-demand rendering, which will only render when necessary. This saves battery and keeps noisy fans in check.

Open the sandbox below in a full screen and look into dev tools, you will see that it is completely idle when nothing is going on. It renders only when you move the model.

<Codesandbox id="wvgxp" screenshot_url="https://github.com/pmndrs/react-three-fiber/raw/master/docs/advanced/wvgxp.webp" />

All you need to do is set the canvas `frameloop` prop to `demand`. It will render frames whenever it detects prop changes throughout the component tree.

```jsx
<Canvas frameloop="demand">
```

--------------------------------

### frameloop modes: `always`, `demand`, and `never`

Source: https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/core/loop.ts

How the render loop checks frameloop to decide whether to render a frame, and how `advance()` is used for manual rendering in `frameloop="never"` mode. When `frameloop` is `'always'` every rAF renders; when `'demand'` it decrements a frame counter and stops; when `'never'` the user must call `advance()` manually.

```typescript
function update(timestamp: number, state: RootState, frame?: XRFrame) {
  let delta = state.clock.getDelta()

  // In frameloop='never' mode, clock times are updated using the provided timestamp
  if (state.frameloop === 'never' && typeof timestamp === 'number') {
    delta = timestamp - state.clock.elapsedTime
    state.clock.oldTime = state.clock.elapsedTime
    state.clock.elapsedTime = timestamp
  }

  subscribers = state.internal.subscribers
  for (let i = 0; i < subscribers.length; i++) {
    subscription = subscribers[i]
    subscription.ref.current(subscription.store.getState(), delta, frame)
  }

  if (!state.internal.priority && state.gl.render) state.gl.render(state.scene, state.camera)

  state.internal.frames = Math.max(0, state.internal.frames - 1)
  return state.frameloop === 'always' ? 1 : state.internal.frames
}

// ... in loop():
    if (
      state.internal.active &&
      (state.frameloop === 'always' || state.internal.frames > 0) &&
      !state.gl.xr?.isPresenting
    ) {
      repeat += update(timestamp, state)
    }

/** Advances the frameloop and runs render effects, useful for when manually rendering via `frameloop="never"`. */
export function advance(timestamp: number, runGlobalEffects: boolean = true, state?: RootState, frame?: XRFrame): void {
  if (runGlobalEffects) flushGlobalEffects('before', timestamp)
  if (!state) for (const root of _roots.values()) update(timestamp, root.store.getState())
  else update(timestamp, state, frame)
  if (runGlobalEffects) flushGlobalEffects('after', timestamp)
}
```

--------------------------------

### state properties

Source: https://github.com/pmndrs/react-three-fiber/blob/master/docs/API/hooks.mdx

| `legacy`          | Disables global color management via `THREE.ColorManagement`                  | `boolean`                                                                                                                                                                                                      |
| `frameloop`       | Render mode: always, demand, never                                            | `always`, `demand`, `never`                                                                                                                                                                                    |
| `performance`     | System regression                                                             | `{ current: number, min: number, max: number, debounce: number, regress: () => void }`                                                                                                                         |
| `size`            | Canvas size in pixels                                                         | `{ width: number, height: number, top: number, left: number }`                                                                                                                                                 |
| `viewport`        | Canvas viewport size in three.js units. Note: This is different from [`gl.getViewport`](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.getViewport) which returns the drawbuffer size                                               | `{ width: number, height: number, initialDpr: number, dpr: number, factor: number, distance: number, aspect: number, getCurrentViewport: (camera?: Camera, target?: THREE.Vector3, size?: Size) => Viewport }` |
| `xr`              | XR interface, manages WebXR rendering                                         | `{ connect: () => void, disconnect: () => void }`                                                                                                                                                              |
| `set`             | Allows you to set any state property                                          | `(state: SetState<RootState>) => void`                                                                                                                                                                         |
| `get`             | Allows you to retrieve any state property non-reactively                      | `() => GetState<RootState>`                                                                                                                                                                                    |
| `invalidate`      | Request a new render, given that `frameloop === 'demand'`                     | `() => void`                                                                                                                                                                                                   |
| `advance`         | Advance one tick, given that `frameloop === 'never'`                          | `(timestamp: number, runGlobalEffects?: boolean) => void`                                                                                                                                                      |
| `setSize`         | Resize the canvas                                                             | `(width: number, height: number, top?: number, left?: number) => void`                                                                                                                                         |
| `setDpr`          | Set the pixel-ratio                                                           | `(dpr: number) => void`                                                                                                                                                                                        |
| `setFrameloop`    | Shortcut to set the current render mode                                       | `(frameloop?: 'always', 'demand', 'never') => void`                                                                                                                                                            |
| `setEvents`       | Shortcut to setting the event layer                                           | `(events: Partial<EventManager<any>>) => void`                                                                                                                                                                 |
| `onPointerMissed` | Response for pointer clicks that have missed a target                         | `() => void`                                                                                                                                                                                                   |

--------------------------------

### invalidate

Source: https://github.com/pmndrs/react-three-fiber/blob/master/docs/API/hooks.mdx

Request a new render, given that `frameloop === 'demand'`.

```APIDOC
## invalidate

### Description
Request a new render, given that `frameloop === 'demand'`.

### Method
Function

### Signature
`() => void`

### Parameters
None

### Returns
`void`
```
