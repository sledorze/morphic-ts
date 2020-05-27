---
title: set.ts
nav_order: 8
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraSet (interface)](#modelalgebraset-interface)
- [ModelAlgebraSet1 (interface)](#modelalgebraset1-interface)
- [ModelAlgebraSet2 (interface)](#modelalgebraset2-interface)
- [SetURI (type alias)](#seturi-type-alias)
- [SetURI (constant)](#seturi-constant)

---

# ModelAlgebraSet (interface)

**Signature**

```ts
export interface ModelAlgebraSet<F, Env> {
  _F: F
  set: <L, A>(a: HKT2<F, Env, L, A>, ord: Ord<A>) => HKT2<F, Env, Array<L>, Set<A>>
}
```

Added in v0.0.1

# ModelAlgebraSet1 (interface)

**Signature**

```ts
export interface ModelAlgebraSet1<F extends URIS, Env extends AnyEnv> {
  _F: F
  set: <A>(a: Kind<F, Env, A>, ord: Ord<A>) => Kind<F, Env, Set<A>>
}
```

Added in v0.0.1

# ModelAlgebraSet2 (interface)

**Signature**

```ts
export interface ModelAlgebraSet2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  set: <L, A>(a: Kind2<F, Env, L, A>, ord: Ord<A>) => Kind2<F, Env, Array<L>, Set<A>>
}
```

Added in v0.0.1

# SetURI (type alias)

**Signature**

```ts
export type SetURI = typeof SetURI
```

Added in v0.0.1

# SetURI (constant)

**Signature**

```ts
export const SetURI: "SetURI" = ...
```

Added in v0.0.1
