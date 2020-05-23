---
title: refined.ts
nav_order: 7
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
export interface ModelAlgebraRefined<F, Env> {
  _F: F
  refined: {
    <E, A, N extends string, B extends { readonly [K in N]: symbol }>(
      a: HKT2<F, Env, E, A>,
      refinement: Refinement<A, Branded<A, B>>,
      name: N,
      config?: ConfigsForType<Env, E, Branded<A, B>>
    ): HKT2<F, Env, E, Branded<A, B>>
  }
}
```

Added in v0.0.1

# ModelAlgebraRefined1 (interface)

**Signature**

```ts
export interface ModelAlgebraRefined1<F extends URIS, Env extends AnyEnv> {
  _F: F
  refined<A, N extends string, B extends { readonly [K in N]: symbol }>(
    a: Kind<F, Env, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N,
    config?: ConfigsForType<Env, unknown, Branded<A, B>>
  ): Kind<F, Env, Branded<A, B>>
}
```

Added in v0.0.1

# ModelAlgebraRefined2 (interface)

**Signature**

```ts
export interface ModelAlgebraRefined2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  refined<E, A, N extends string, B extends { readonly [K in N]: symbol }>(
    a: Kind2<F, Env, E, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N,
    config?: ConfigsForType<Env, E, Branded<A, B>>
  ): Kind2<F, Env, E, Branded<A, B>>
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
