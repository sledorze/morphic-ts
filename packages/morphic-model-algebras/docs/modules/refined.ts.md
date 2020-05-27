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
    <E, A, B extends A>(
      a: HKT2<F, Env, E, A>,
      refinement: Refinement<A, B>,
      name: string,
      config?: ConfigsForType<Env, E, B>
    ): HKT2<F, Env, E, B>
  }
}
```

Added in v0.0.1

# ModelAlgebraRefined1 (interface)

**Signature**

```ts
export interface ModelAlgebraRefined1<F extends URIS, Env extends AnyEnv> {
  _F: F
  refined<A, B extends A>(
    a: Kind<F, Env, A>,
    refinement: Refinement<A, B>,
    name: string,
    config?: ConfigsForType<Env, unknown, B>
  ): Kind<F, Env, B>
}
```

Added in v0.0.1

# ModelAlgebraRefined2 (interface)

**Signature**

```ts
export interface ModelAlgebraRefined2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  refined<E, A, B extends A>(
    a: Kind2<F, Env, E, A>,
    refinement: Refinement<A, B>,
    name: string,
    config?: ConfigsForType<Env, E, B>
  ): Kind2<F, Env, E, B>
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
