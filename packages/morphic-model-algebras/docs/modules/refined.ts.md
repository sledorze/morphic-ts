---
title: refined.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraRefined (interface)](#modelalgebrarefined-interface)
- [ModelAlgebraRefined1 (interface)](#modelalgebrarefined1-interface)
- [ModelAlgebraRefined2 (interface)](#modelalgebrarefined2-interface)
- [RefinedURI (type alias)](#refineduri-type-alias)
- [RefinedURI (constant)](#refineduri-constant)

---

# ModelAlgebraRefined (interface)

**Signature**

```ts
export interface ModelAlgebraRefined<F> {
  _F: F
  refined: {
    <E, A, N extends string, B extends { readonly [K in N]: symbol }>(
      a: HKT2<F, E, A>,
      refinement: Refinement<A, Branded<A, B>>,
      name: N
    ): isOptionalConfig<Refinedfig, HKT2<F, E, Branded<A, B>>>
    <E, A, N extends string, B extends { readonly [K in N]: symbol }>(
      a: HKT2<F, E, A>,
      refinement: Refinement<A, Branded<A, B>>,
      name: N,
      config: ByInterp<Refinedfig, URIS | URIS2>
    ): HKT2<F, E, Branded<A, B>>
  }
}
```

Added in v0.0.1

# ModelAlgebraRefined1 (interface)

**Signature**

```ts
export interface ModelAlgebraRefined1<F extends URIS> {
  _F: F
  refined<A, N extends string, B extends { readonly [K in N]: symbol }>(
    a: Kind<F, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N,
    config: ByInterp<Refinedfig, F>
  ): Kind<F, Branded<A, B>>
}
```

Added in v0.0.1

# ModelAlgebraRefined2 (interface)

**Signature**

```ts
export interface ModelAlgebraRefined2<F extends URIS2> {
  _F: F
  refined<E, A, N extends string, B extends { readonly [K in N]: symbol }>(
    a: Kind2<F, E, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N,
    config: ByInterp<Refinedfig, F>
  ): Kind2<F, E, Branded<A, B>>
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
export const RefinedURI: typeof RefinedURI = ...
```

Added in v0.0.1
