---
title: intersections.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraIntersection (interface)](#modelalgebraintersection-interface)
- [ModelAlgebraIntersection1 (interface)](#modelalgebraintersection1-interface)
- [ModelAlgebraIntersection2 (interface)](#modelalgebraintersection2-interface)
- [IntersectionURI (type alias)](#intersectionuri-type-alias)
- [IntersectionURI (constant)](#intersectionuri-constant)

---

# ModelAlgebraIntersection (interface)

**Signature**

```ts
export interface ModelAlgebraIntersection<F, Env> {
  _F: F
  intersection: {
    <A, B, LA, LB>(types: [HKT2<F, Env, LA, A>, HKT2<F, Env, LB, B>], name: string): HKT2<F, Env, LA & LB, A & B>
    <A, B, C, LA, LB, LC>(types: [HKT2<F, Env, LA, A>, HKT2<F, Env, LB, B>, HKT2<F, Env, LC, C>], name: string): HKT2<
      F,
      Env,
      LA & LB & LC,
      A & B & C
    >
    <A, B, C, D, LA, LB, LC, LD>(
      types: [HKT2<F, Env, LA, A>, HKT2<F, Env, LB, B>, HKT2<F, Env, LC, C>, HKT2<F, Env, LD, D>],
      name: string
    ): HKT2<F, Env, LA & LB & LC & LD, A & B & C & D>
    <A, B, C, D, E, LA, LB, LC, LD, LE>(
      types: [HKT2<F, Env, LA, A>, HKT2<F, Env, LB, B>, HKT2<F, Env, LC, C>, HKT2<F, Env, LD, D>, HKT2<F, Env, LE, E>],
      name: string
    ): HKT2<F, Env, LA & LB & LC & LD & LE, A & B & C & D & E>
    <L, A, Env>(types: Array<HKT2<F, Env, L, A>>): HKT2<F, Env, Array<L>, Array<A>>
  }
}
```

Added in v0.0.1

# ModelAlgebraIntersection1 (interface)

**Signature**

```ts
export interface ModelAlgebraIntersection1<F extends URIS, Env extends AnyEnv> {
  _F: F
  intersection: {
    <A, B>(types: [OfType<F, A, Env>, OfType<F, B, Env>], name: string): Kind<F, Env, A & B>
    <A, B, C, Env>(types: [OfType<F, A, Env>, OfType<F, B, Env>, OfType<F, C, Env>], name: string): Kind<
      F,
      Env,
      A & B & C
    >
    <A, B, C, D>(
      types: [OfType<F, A, Env>, OfType<F, B, Env>, OfType<F, C, Env>, OfType<F, D, Env>],
      name: string
    ): Kind<F, Env, A & B & C & D>
    <A, B, C, D, E, Env>(
      types: [OfType<F, A, Env>, OfType<F, B, Env>, OfType<F, C, Env>, OfType<F, D, Env>, OfType<F, E, Env>],
      name: string
    ): Kind<F, Env, A & B & C & D & E>
    <A, Env>(types: Array<OfType<F, A, Env>>, name: string): Kind<F, Env, Array<A>>
  }
}
```

Added in v0.0.1

# ModelAlgebraIntersection2 (interface)

**Signature**

```ts
export interface ModelAlgebraIntersection2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  intersection: {
    <A, B, LA, LB>(types: [OfType2<F, LA, A, Env>, OfType2<F, LB, B, Env>], name: string): Kind2<F, Env, LA & LB, A & B>
    <A, B, C, LA, LB, LC, Env>(
      types: [OfType2<F, LA, A, Env>, OfType2<F, LB, B, Env>, OfType2<F, LC, C, Env>],
      name: string
    ): Kind2<F, Env, LA & LB & LC, A & B & C>
    <A, B, C, D, LA, LB, LC, LD>(
      types: [OfType2<F, LA, A, Env>, OfType2<F, LB, B, Env>, OfType2<F, LC, C, Env>, OfType2<F, LD, D, Env>],
      name: string
    ): Kind2<F, Env, LA & LB & LC & LD, A & B & C & D>
    <A, B, C, D, E, LA, LB, LC, LD, LE, Env>(
      types: [
        OfType2<F, LA, A, Env>,
        OfType2<F, LB, B, Env>,
        OfType2<F, LC, C, Env>,
        OfType2<F, LD, D, Env>,
        OfType2<F, LE, E, Env>
      ],
      name: string
    ): Kind2<F, Env, LA & LB & LC & LD & LE, A & B & C & D & E>
    <L, A, Env>(types: Array<OfType2<F, L, A, Env>>, name: string): Kind2<F, Env, Array<L>, Array<A>>
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
