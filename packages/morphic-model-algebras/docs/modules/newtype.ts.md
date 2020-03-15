---
title: newtype.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraNewtype (interface)](#modelalgebranewtype-interface)
- [ModelAlgebraNewtype1 (interface)](#modelalgebranewtype1-interface)
- [ModelAlgebraNewtype2 (interface)](#modelalgebranewtype2-interface)
- [AnyNewtype (type alias)](#anynewtype-type-alias)
- [NewtypeA (type alias)](#newtypea-type-alias)
- [NewtypeURI (type alias)](#newtypeuri-type-alias)
- [NewtypeURI (constant)](#newtypeuri-constant)

---

# ModelAlgebraNewtype (interface)

**Signature**

```ts
export interface ModelAlgebraNewtype<F> {
  _F: F
  newtype: <N extends AnyNewtype = never>(
    name: string
  ) => {
    <E>(a: HKT2<F, E, NewtypeA<N>>): isOptionalConfig<NewtypeConfig<E, N>, HKT2<F, E, N>>
    <E>(a: HKT2<F, E, NewtypeA<N>>, config: ByInterp<NewtypeConfig<E, N>, URIS | URIS2>): HKT2<F, E, N>
  }
}
```

Added in v0.0.1

# ModelAlgebraNewtype1 (interface)

**Signature**

```ts
export interface ModelAlgebraNewtype1<F extends URIS> {
  _F: F
  newtype<N extends AnyNewtype = never>(
    name: string
  ): (a: Kind<F, NewtypeA<N>>, config?: ByInterp<NewtypeConfig<unknown, N>, F>) => Kind<F, N>
}
```

Added in v0.0.1

# ModelAlgebraNewtype2 (interface)

**Signature**

```ts
export interface ModelAlgebraNewtype2<F extends URIS2> {
  _F: F
  newtype<N extends AnyNewtype = never>(
    name: string
  ): <E>(a: Kind2<F, E, NewtypeA<N>>, config: ByInterp<NewtypeConfig<E, N>, F>) => Kind2<F, E, N>
}
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
