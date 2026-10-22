# Context7: /pmndrs/drei

Query: PerformanceMonitor adaptive DPR React Three Fiber useGLTF preload

### Preload a model with useGLTF.preload

Source: https://github.com/pmndrs/drei/blob/master/docs/loaders/gltf-use-gltf.mdx

Preloads a model so it is cached before it is rendered, improving performance.

```jsx
useGLTF.preload(url)
```

--------------------------------

### useGLTF

Source: https://github.com/pmndrs/drei/blob/master/docs/loaders/gltf-use-gltf.mdx

A convenience hook that uses useLoader and GLTFLoader to load glTF models. It returns the GLTF object and an ObjectMap containing nodes and materials.

```APIDOC
## useGLTF

### Description
A convenience hook that uses `useLoader` and `GLTFLoader` to load glTF models. It returns the GLTF object and an ObjectMap containing nodes and materials.

### Signature
```ts
useGLTF<T extends string | string[]>(
  path: T,
  useDraco?: boolean | string = true,
  useMeshOpt: boolean = true,
  extendLoader?: (loader: GLTFLoader) => void
): T extends any[] ? (GLTF & ObjectMap)[] : GLTF & ObjectMap
```

### Parameters
- **path** (string | string[]) - Required - The path to the glTF model file or an array of paths.
- **useDraco** (boolean | string) - Optional - Defaults to `true`. If `true`, uses CDN-loaded Draco binaries. If a string, uses the provided path for Draco decoder binaries.
- **useMeshOpt** (boolean) - Optional - Defaults to `true`. Whether to use mesh optimization.
- **extendLoader** (function) - Optional - A callback to extend the GLTFLoader instance, e.g., to set KTX2 loader.

### Returns
- If `path` is a string, returns `GLTF & ObjectMap`.
- If `path` is an array, returns an array of `GLTF & ObjectMap`.

### Types
- `GLTF` interface includes: `animations`, `scene`, `scenes`, `cameras`, `asset`, `parser`, `userData`.
- `ObjectMap` type: `{ nodes: { [name: string]: THREE.Object3D }, materials: { [name: string]: THREE.Material } }`.

### Usage Examples

#### Basic
```jsx
const gltf = useGLTF(url)
```

#### Preload
```jsx
useGLTF.preload(url)
```

#### Draco (decompression)
```jsx
useGLTF(url, '/draco-gltf')
```

#### Custom Draco decoder path globally
```tsx
useGLTF.setDecoderPath(path)
```

#### Extend loader for KTX2 textures
```tsx
import { KTX2Loader } from 'three-stdlib'
const ktx2Loader = new KTX2Loader()
ktx2Loader.setTranscoderPath('https://unpkg.com/three@0.168.0/examples/jsm/libs/basis/')

// ...

const { gl } = useThree()
useGLTF('facecap.glb', true, true, (loader) => {
  loader.setKTX2Loader(ktx2Loader.detectSupport(gl))
})
```

### Notes
- Draco binaries default to CDN loaded at `https://www.gstatic.com/draco/v1/decoders/` and are only loaded for compressed models.
- For CDN-loaded Draco binaries, prefetching can speed up loading. Add `<link>` tags to your `<head>` with exact version matching.

```

--------------------------------

### PerformanceMonitor

Source: https://github.com/pmndrs/drei/blob/master/docs/performances/performance-monitor.mdx

You can also use the `onChange` callback to get notified when the average changes in whichever direction. This allows you to make gradual changes. It gives you a `factor` between 0 and 1, which is increased by incline and decreased by decline. The `factor` is initially 0.5 by default. If your app starts with lowest defaults and gradually increases quality set `factor` to 0. If it starts with highest defaults and decreases quality, set it to 1. If it starts in the middle and can either increase or decrease, set it to 0.5.

The following starts at the highest dpr (2) and clamps the gradual dpr between 0.5 at the lowest and 2 at the highest. If the app is in trouble it will reduce `factor` by `step` until it is either 0 or the app has found its sweet spot above that.

```jsx
const [dpr, setDpr] = useState(2)
return (
 <Canvas dpr={dpr}>
  <PerformanceMonitor factor={1} onChange={({ factor }) => setDpr(Math.floor(0.5 + 1.5 * factor, 1))} />
```

--------------------------------

### Gltf / useGLTF > `useGLTF` hook > Basic

Source: https://github.com/pmndrs/drei/blob/master/docs/loaders/gltf-use-gltf.mdx

```jsx
const gltf = useGLTF(url)
```

You can also preload a model:

```jsx
useGLTF.preload(url)
```

--------------------------------

### Gradual dpr adjustment with onChange and factor

Source: https://github.com/pmndrs/drei/blob/master/docs/performances/performance-monitor.mdx

Starts at dpr 2, uses factor=1 and onChange to gradually reduce dpr between 0.5 and 2. The snippet is incomplete (missing closing tags) as shown.

```jsx
const [dpr, setDpr] = useState(2)
return (
 <Canvas dpr={dpr}>
  <PerformanceMonitor factor={1} onChange={({ factor }) => setDpr(Math.floor(0.5 + 1.5 * factor, 1))} />
```
