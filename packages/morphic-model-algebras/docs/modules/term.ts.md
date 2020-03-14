---
title: term.ts
nav_order: 10
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraTerm (interface)](#modelalgebraterm-interface)
- [ModelAlgebraTerm1 (interface)](#modelalgebraterm1-interface)
- [ModelAlgebraTerm2 (interface)](#modelalgebraterm2-interface)
- [TermConstructor (interface)](#termconstructor-interface)
- [TermConstructorByInterp (type alias)](#termconstructorbyinterp-type-alias)
- [TermURI (type alias)](#termuri-type-alias)
- [TermURI (constant)](#termuri-constant)

---

# ModelAlgebraTerm (interface)

**Signature**

```ts
export interface ModelAlgebraTerm<F> {
  _F: F
  term: {
    <A, E>(name: string): (a: TermConstructorByInterp<URIS | URIS2, A, E>) => HKT2<F, E, A>
  }
}
```

Added in v0.0.1

# ModelAlgebraTerm1 (interface)

**Signature**

```ts
export interface ModelAlgebraTerm1<F extends URIS> {
  _F: F
  term<A>(name: string): (a: TermConstructorByInterp<F, A, unknown>) => Kind<F, A>
}
```

Added in v0.0.1

# ModelAlgebraTerm2 (interface)

**Signature**

```ts
export interface ModelAlgebraTerm2<F extends URIS2> {
  _F: F
  term<A, E>(name: string): (a: TermConstructorByInterp<F, A, E>) => Kind2<F, E, A>
}
```

Added in v0.0.1

# TermConstructor (interface)

**Signature**

```ts
export interface TermConstructor<A, E> {}
```

Added in v0.0.1

# TermConstructorByInterp (type alias)

**Signature**

```ts
export type TermConstructorByInterp<F extends URIS | URIS2, A, E> = {
  [k in keyof TermConstructor<A, E> & F]: TermConstructor<A, E>[k]
}
```

Added in v0.0.1

# TermURI (type alias)

**Signature**

```ts
export type TermURI = typeof TermURI
```

Added in v0.0.1

# TermURI (constant)

**Signature**

```ts
export const TermURI: "TermURI" = ...
```

Added in v0.0.1
