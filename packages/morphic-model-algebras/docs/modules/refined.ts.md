---
title: refined.ts
nav_order: 7
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraRefined (interface)](#modelalgebrarefined-interface)
- [RefinedURI (type alias)](#refineduri-type-alias)
- [RefinedURI (constant)](#refineduri-constant)

---

# ModelAlgebraRefined (interface)

**Signature**

```ts
export interface ModelAlgebraRefined<F extends URIS, Env extends AnyEnv> {
  _F: F
  refined<E, A, B extends A>(
    a: Kind<F, Env, E, A>,
    refinement: Refinement<A, B>,
    name: string,
    config?: ConfigsForType<Env, E, B>
  ): Kind<F, Env, E, B>
}
```

Added in v0.0.1

# RefinedURI (type alias)

**Signature**

```ts
export type RefinedURI = typeof RefinedURI
```

Added in v0.0.1

# RefinedURI (constant)

**Signature**

```ts
export const RefinedURI: "RefinedURI" = ...
```

Added in v0.0.1
