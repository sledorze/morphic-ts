---
title: newtype.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraNewtype (interface)](#modelalgebranewtype-interface)
- [AnyNewtype (type alias)](#anynewtype-type-alias)
- [NewtypeA (type alias)](#newtypea-type-alias)
- [NewtypeURI (type alias)](#newtypeuri-type-alias)
- [NewtypeURI (constant)](#newtypeuri-constant)

---

# ModelAlgebraNewtype (interface)

**Signature**

```ts
export interface ModelAlgebraNewtype<F extends URIS, Env> {
  _F: F
  newtype<N extends AnyNewtype = never>(
    name: string // on purpose type relaxation `Kind<F, R, N>` instead of `Kind<F, R, NewtypeA<N>>`
  ): <E>(a: Kind<F, Env, E, NewtypeA<N>>, config?: ConfigsForType<Env, E, N>) => Kind<F, Env, E, N>
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
