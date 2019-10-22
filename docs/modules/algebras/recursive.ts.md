---
title: algebras/recursive.ts
nav_order: 5
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraRecursive (interface)](#modelalgebrarecursive-interface)
- [ModelAlgebraRecursive1 (interface)](#modelalgebrarecursive1-interface)
- [ModelAlgebraRecursive2 (interface)](#modelalgebrarecursive2-interface)

---

# ModelAlgebraRecursive (interface)

**Signature**

```ts
export interface ModelAlgebraRecursive {
  recursive: <L, A>(a: () => M<L, A>) => M<L, A>
}
```

# ModelAlgebraRecursive1 (interface)

**Signature**

```ts
export interface ModelAlgebraRecursive1<F extends URIS> {
  recursive: <A>(a: () => Kind<F, A>) => Kind<F, A>
}
```

# ModelAlgebraRecursive2 (interface)

**Signature**

```ts
export interface ModelAlgebraRecursive2<F extends URIS2> {
  recursive: <L, A>(a: () => Kind2<F, L, A>) => Kind2<F, L, A>
}
```
