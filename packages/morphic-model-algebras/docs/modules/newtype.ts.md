---
title: newtype.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [IsoConfig (interface)](#isoconfig-interface)
- [ModelAlgebraNewtype (interface)](#modelalgebranewtype-interface)
- [NewtypeConfig (interface)](#newtypeconfig-interface)
- [PrismConfig (interface)](#prismconfig-interface)
- [AOfIso (type alias)](#aofiso-type-alias)
- [AOfPrism (type alias)](#aofprism-type-alias)
- [AnyNewtype (type alias)](#anynewtype-type-alias)
- [NewtypeA (type alias)](#newtypea-type-alias)
- [NewtypeURI (type alias)](#newtypeuri-type-alias)
- [NewtypeURI (constant)](#newtypeuri-constant)

---

# IsoConfig (interface)

**Signature**

```ts
export interface IsoConfig<L, A, N> {}
```

Added in v0.0.1

# ModelAlgebraNewtype (interface)

**Signature**

```ts
export interface ModelAlgebraNewtype<F extends URIS, Env> {
  _F: F
  newtype<N extends AnyNewtype = never>(
    name: string
  ): <E>(
    a: Kind<F, Env, E, NewtypeA<N>>,
    config?: ConfigsForType<Env, E, N, NewtypeConfig<E, NewtypeA<N>, N>>
  ) => Kind<F, Env, E, N>
  newtypeIso<E, A, N extends Newtype<any, A>>(
    iso: Iso<A, N>,
    a: Kind<F, Env, E, A>,
    name: string,
    config?: ConfigsForType<Env, E, N, IsoConfig<E, A, N>>
  ): Kind<F, Env, E, N>
  newtypePrism: {
    <E, A, N extends Newtype<any, A>>(
      prism: Prism<A, N>,
      a: Kind<F, Env, E, A>,
      name: string,
      config?: ConfigsForType<Env, E, N, PrismConfig<E, A, N>>
    ): Kind<F, Env, E, N>
  }
}
```

Added in v0.0.1

# NewtypeConfig (interface)

**Signature**

```ts
export interface NewtypeConfig<L, A, N> {}
```

Added in v0.0.1

# PrismConfig (interface)

**Signature**

```ts
export interface PrismConfig<L, A, N> {}
```

Added in v0.0.1

# AOfIso (type alias)

**Signature**

```ts
export type AOfIso<X> = X extends Iso<infer S, infer A> ? A : never
```

Added in v0.0.1

# AOfPrism (type alias)

**Signature**

```ts
export type AOfPrism<X> = X extends Prism<infer S, infer A> ? A : never
```

Added in v0.0.1

# AnyNewtype (type alias)

**Signature**

```ts
export type AnyNewtype = Newtype<any, any>
```

Added in v0.0.1

# NewtypeA (type alias)

**Signature**

```ts
export type NewtypeA<N extends AnyNewtype> = N extends Newtype<any, infer A> ? A : never
```

Added in v0.0.1

# NewtypeURI (type alias)

**Signature**

```ts
export type NewtypeURI = typeof NewtypeURI
```

Added in v0.0.1

# NewtypeURI (constant)

**Signature**

```ts
export const NewtypeURI: "NewtypeURI" = ...
```

Added in v0.0.1
