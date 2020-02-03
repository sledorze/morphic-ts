---
title: recursive.ts
nav_order: 5
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraRecursive (interface)](#modelalgebrarecursive-interface)
- [ModelAlgebraRecursive1 (interface)](#modelalgebrarecursive1-interface)
- [ModelAlgebraRecursive2 (interface)](#modelalgebrarecursive2-interface)
- [RecursiveURI (type alias)](#recursiveuri-type-alias)
- [RecursiveURI (constant)](#recursiveuri-constant)

---

# ModelAlgebraRecursive (interface)

**Signature**

```ts
export interface ModelAlgebraRecursive<F> {
  _F: F
  recursive: <L, A>(a: (x: HKT2<F, L, A>) => HKT2<F, L, A>, name: string) => HKT2<F, L, A>
}
```

Added in v0.0.1

# ModelAlgebraRecursive1 (interface)

**Signature**

```ts
export interface ModelAlgebraRecursive1<F extends URIS> {
  _F: F
  recursive: <A>(a: (x: Kind<F, A>) => Kind<F, A>, name: string) => Kind<F, A>
}
```

Added in v0.0.1

# ModelAlgebraRecursive2 (interface)

**Signature**

```ts
export interface ModelAlgebraRecursive2<F extends URIS2> {
  _F: F
  recursive: <L, A>(a: (x: Kind2<F, L, A>) => Kind2<F, L, A>, name: string) => Kind2<F, L, A>
}
```

Added in v0.0.1

# RecursiveURI (type alias)

**Signature**

```ts
export type RecursiveURI = typeof RecursiveURI
```

Added in v0.0.1

# RecursiveURI (constant)

**Signature**

```ts
export const RecursiveURI: typeof RecursiveURI = ...
```

Added in v0.0.1
