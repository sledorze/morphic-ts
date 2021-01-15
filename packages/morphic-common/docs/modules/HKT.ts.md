---
title: HKT.ts
nav_order: 3
parent: Modules
---

# Overview

Pattern stolen from fp-ts. Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))

---

<h2 class="text-delta">Table of contents</h2>

- [HKT (interface)](#hkt-interface)
- [URItoKind (interface)](#uritokind-interface)
- [ConfigTypeKind (type alias)](#configtypekind-type-alias)
- [ConfigTypeURIS (type alias)](#configtypeuris-type-alias)
- [Kind (type alias)](#kind-type-alias)
- [URIS (type alias)](#uris-type-alias)
- [URIS\_ (type alias)](#uris_-type-alias)

---

# HKT (interface)

`* -> * -> *` constructors

**Signature**

```ts
export interface HKT<R, E, A> {
  readonly _R: (_: R) => void
  readonly _A: A
  readonly _E: E
}
```

Added in v0.0.1

# URItoKind (interface)

`* -> * -> *` constructors

**Signature**

```ts
export interface URItoKind<R, E, A> {
  readonly _R: (_: R) => void
  readonly _A: A
  readonly _E: E

  readonly ['HKT']: HKT<R, E, A>
}
```

Added in v0.0.1

# ConfigTypeKind (type alias)

Helper to resolve a ConfigType for a particular URI(s)

**Signature**

```ts
export type ConfigTypeKind<URI extends ConfigTypeURIS, E, A> = ConfigType<E, A>[URI]
```

Added in v0.0.1

# ConfigTypeURIS (type alias)

The URIS to Index ConfigType

**Signature**

```ts
export type ConfigTypeURIS = keyof ConfigType<any, any>
```

Added in v0.0.1

# Kind (type alias)

`* -> * -> *` constructors

**Signature**

```ts
export declare type Kind<URI extends URIS, R, E, A> = URItoKind<R, E, A>[URI]
```

Added in v0.0.1

# URIS (type alias)

`* -> * -> *` constructors

**Signature**

```ts
export declare type URIS = Exclude<keyof URItoKind<any, any, any>, '_A' | '_E' | '_R'>
```

Added in v0.0.1

# URIS\_ (type alias)

`* -> * -> *` constructors

**Signature**

```ts
export declare type URIS_ = Exclude<URIS, 'HKT'>
```

Added in v0.0.1
