---
title: intersections.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraIntersection (interface)](#modelalgebraintersection-interface)
- [IntersectionURI (type alias)](#intersectionuri-type-alias)
- [IntersectionURI (constant)](#intersectionuri-constant)

---

# ModelAlgebraIntersection (interface)

**Signature**

```ts
export interface ModelAlgebraIntersection<F extends URIS, Env extends AnyEnv> {
  _F: F
  intersection: {
    <A, B, LA, LB>(types: [OfType<F, LA, A, Env>, OfType<F, LB, B, Env>], name: string): Kind<F, Env, LA & LB, A & B>
    <A, B, C, LA, LB, LC, Env>(
      types: [OfType<F, LA, A, Env>, OfType<F, LB, B, Env>, OfType<F, LC, C, Env>],
      name: string
    ): Kind<F, Env, LA & LB & LC, A & B & C>
    <A, B, C, D, LA, LB, LC, LD>(
      types: [OfType<F, LA, A, Env>, OfType<F, LB, B, Env>, OfType<F, LC, C, Env>, OfType<F, LD, D, Env>],
      name: string
    ): Kind<F, Env, LA & LB & LC & LD, A & B & C & D>
    <A, B, C, D, E, LA, LB, LC, LD, LE, Env>(
      types: [
        OfType<F, LA, A, Env>,
        OfType<F, LB, B, Env>,
        OfType<F, LC, C, Env>,
        OfType<F, LD, D, Env>,
        OfType<F, LE, E, Env>
      ],
      name: string
    ): Kind<F, Env, LA & LB & LC & LD & LE, A & B & C & D & E>
    <L, A, Env>(types: Array<OfType<F, L, A, Env>>, name: string): Kind<F, Env, Array<L>, Array<A>>
  }
}
```

Added in v0.0.1

# IntersectionURI (type alias)

**Signature**

```ts
export type IntersectionURI = typeof IntersectionURI
```

Added in v0.0.1

# IntersectionURI (constant)

**Signature**

```ts
export const IntersectionURI: "IntersectionURI" = ...
```

Added in v0.0.1
