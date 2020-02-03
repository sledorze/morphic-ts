---
title: HKT.ts
nav_order: 2
parent: Modules
---

# Overview

Pattern stolen from fp-ts. Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))

---

<h2 class="text-delta">Table of contents</h2>

- [HKT (interface)](#hkt-interface)
- [HKT2 (interface)](#hkt2-interface)
- [URItoKind (interface)](#uritokind-interface)
- [URItoKind2 (interface)](#uritokind2-interface)
- [Kind (type alias)](#kind-type-alias)
- [Kind2 (type alias)](#kind2-type-alias)
- [URIS (type alias)](#uris-type-alias)
- [URIS2 (type alias)](#uris2-type-alias)

---

# HKT (interface)

**Signature**

```ts
export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}
```

Added in v0.0.1

# HKT2 (interface)

`* -> * -> *` constructors

**Signature**

```ts
export interface HKT2<URI, E, A> extends HKT<URI, A> {
  readonly _E: E
}
```

Added in v0.0.1

# URItoKind (interface)

`* -> *` constructors

**Signature**

```ts
export interface URItoKind<A> {
  _A: A
}
```

Added in v0.0.1

# URItoKind2 (interface)

`* -> * -> *` constructors

**Signature**

```ts
export interface URItoKind2<E, A> {
  _A: A
  _E: E
}
```

Added in v0.0.1

# Kind (type alias)

`* -> *` constructors

**Signature**

```ts
export declare type Kind<URI extends URIS, A> = URI extends URIS ? URItoKind<A>[URI] : any
```

Added in v0.0.1

# Kind2 (type alias)

`* -> * -> *` constructors

**Signature**

```ts
export declare type Kind2<URI extends URIS2, E, A> = URI extends URIS2 ? URItoKind2<E, A>[URI] : any
```

Added in v0.0.1

# URIS (type alias)

`* -> *` constructors

**Signature**

```ts
export declare type URIS = Exclude<keyof URItoKind<any>, '_A'>
```

Added in v0.0.1

# URIS2 (type alias)

`* -> * -> *` constructors

**Signature**

```ts
export declare type URIS2 = Exclude<keyof URItoKind2<any, any>, '_A' | '_E'>
```

Added in v0.0.1
