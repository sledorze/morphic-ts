---
title: algebras/collections.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraStrMap (interface)](#modelalgebracollection-interface)
- [ModelAlgebraStrMap1 (interface)](#modelalgebracollection1-interface)
- [ModelAlgebraStrMap2 (interface)](#modelalgebracollection2-interface)

---

# ModelAlgebraStrMap (interface)

**Signature**

```ts
export interface ModelAlgebraStrMap {
  set: <L, A>(a: M<L, A>, ord: Ord<A>) => M<Array<L>, Set<A>>
  strMap: <L, A>(codomain: M<L, A>) => M<Array<[string, L]>, Record<string, A>>
}
```

# ModelAlgebraStrMap1 (interface)

**Signature**

```ts
export interface ModelAlgebraStrMap1<F extends URIS> {
  set: <A>(a: Kind<F, A>, ord: Ord<A>) => Kind<F, Set<A>>
  strMap: <A>(codomain: Kind<F, A>) => Kind<F, Record<string, A>>
}
```

# ModelAlgebraStrMap2 (interface)

**Signature**

```ts
export interface ModelAlgebraStrMap2<F extends URIS2> {
  set: <L, A>(a: Kind2<F, L, A>, ord: Ord<A>) => Kind2<F, Array<L>, Set<A>>
  strMap: <L, A>(codomain: Kind2<F, L, A>) => Kind2<F, Record<string, L>, Record<string, A>>
}
```
