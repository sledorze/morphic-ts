---
title: core.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [CacheType (type alias)](#cachetype-type-alias)
- [Compact (type alias)](#compact-type-alias)
- [OfType (type alias)](#oftype-type-alias)
- [OfType2 (type alias)](#oftype2-type-alias)
- [UnionToIntersection (type alias)](#uniontointersection-type-alias)
- [cacheUnaryFunction (function)](#cacheunaryfunction-function)

---

# CacheType (type alias)

**Signature**

```ts
export type CacheType = <F extends Function1>(f: F) => F
```

Added in v0.0.1

# Compact (type alias)

**Signature**

```ts
export type Compact<A> = {
  [K in keyof A]: A[K]
}
```

Added in v0.0.1

# OfType (type alias)

**Signature**

```ts
export type OfType<F extends URIS, A, RC> = Kind<F, RC, A>
```

Added in v0.0.1

# OfType2 (type alias)

**Signature**

```ts
export type OfType2<F extends URIS2, L, A, RC> = Kind2<F, RC, L, A>
```

Added in v0.0.1

# UnionToIntersection (type alias)

**Signature**

```ts
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
```

Added in v0.0.1

# cacheUnaryFunction (function)

**Signature**

```ts
export function cacheUnaryFunction<F extends Function1>(f: F) { ... }
```

Added in v0.0.1
