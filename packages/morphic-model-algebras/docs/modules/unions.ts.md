---
title: unions.ts
nav_order: 10
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraUnions (interface)](#modelalgebraunions-interface)
- [ModelAlgebraUnions1 (interface)](#modelalgebraunions1-interface)
- [ModelAlgebraUnions2 (interface)](#modelalgebraunions2-interface)
- [ArrayType (type alias)](#arraytype-type-alias)
- [UnionsURI (type alias)](#unionsuri-type-alias)
- [UnionsURI (constant)](#unionsuri-constant)

---

# ModelAlgebraUnions (interface)

**Signature**

```ts
export interface ModelAlgebraUnions<F> {
  _F: F
  union: {
    <A, B, LA, LB>(types: [HKT2<F, LA, A>, HKT2<F, LB, B>], name: string): HKT2<F, LA | LB, A | B>
    <A, B, C, LA, LB, LC>(types: [HKT2<F, LA, A>, HKT2<F, LB, B>, HKT2<F, LC, C>], name: string): HKT2<
      F,
      LA | LB | LC,
      A | B | C
    >
    <A, B, C, D, LA, LB, LC, LD>(
      types: [HKT2<F, LA, A>, HKT2<F, LB, B>, HKT2<F, LC, C>, HKT2<F, LD, D>],
      name: string
    ): HKT2<F, LA | LB | LC | LD, A | B | C | D>
    <A, B, C, D, E, LA, LB, LC, LD, LE>(
      types: [HKT2<F, LA, A>, HKT2<F, LB, B>, HKT2<F, LC, C>, HKT2<F, LD, D>, HKT2<F, LE, E>],
      name: string
    ): HKT2<F, LA | LB | LC | LD | LE, A | B | C | D | E>
    <L, A>(types: Array<HKT2<F, L, A>>, name: string): HKT2<F, Array<L>, Array<A>>
  }
}
```

Added in v0.0.1

# ModelAlgebraUnions1 (interface)

**Signature**

```ts
export interface ModelAlgebraUnions1<F extends URIS> {
  _F: F
  union: {
    <A, B>(types: [OfType<F, A>, OfType<F, B>], name: string): Kind<F, A | B>
    <A, B, C>(types: [OfType<F, A>, OfType<F, B>, OfType<F, C>], name: string): Kind<F, A | B | C>
    <A, B, C, D>(types: [OfType<F, A>, OfType<F, B>, OfType<F, C>, OfType<F, D>], name: string): Kind<F, A | B | C | D>
    <A, B, C, D, E>(types: [OfType<F, A>, OfType<F, B>, OfType<F, C>, OfType<F, D>, OfType<F, E>], name: string): Kind<
      F,
      A | B | C | D | E
    >
    <A>(types: Array<OfType<F, A>>, name: string): Kind<F, Array<A>>
  }
}
```

Added in v0.0.1

# ModelAlgebraUnions2 (interface)

**Signature**

```ts
export interface ModelAlgebraUnions2<F extends URIS2> {
  _F: F
  union: {
    <A, B, LA, LB>(types: [OfType2<F, LA, A>, OfType2<F, LB, B>], name: string): Kind2<F, LA | LB, A | B>
    <A, B, C, LA, LB, LC>(types: [OfType2<F, LA, A>, OfType2<F, LB, B>, OfType2<F, LC, C>], name: string): Kind2<
      F,
      LA | LB | LC,
      A | B | C
    >
    <A, B, C, D, LA, LB, LC, LD>(
      types: [OfType2<F, LA, A>, OfType2<F, LB, B>, OfType2<F, LC, C>, OfType2<F, LD, D>],
      name: string
    ): Kind2<F, LA | LB | LC | LD, A | B | C | D>
    <A, B, C, D, E, LA, LB, LC, LD, LE>(
      types: [OfType2<F, LA, A>, OfType2<F, LB, B>, OfType2<F, LC, C>, OfType2<F, LD, D>, OfType2<F, LE, E>],
      name: string
    ): Kind2<F, LA | LB | LC | LD | LE, A | B | C | D | E>
    <L, A>(types: Array<OfType2<F, L, A>>, name: string): Kind2<F, Array<L>, Array<A>>
  }
}
```

Added in v0.0.1

# ArrayType (type alias)

**Signature**

```ts
export type ArrayType<X> = X extends Array<infer A> ? A : never
```

Added in v0.0.1

# UnionsURI (type alias)

**Signature**

```ts
export type UnionsURI = typeof UnionsURI
```

Added in v0.0.1

# UnionsURI (constant)

**Signature**

```ts
export const UnionsURI: typeof UnionsURI = ...
```

Added in v0.0.1
