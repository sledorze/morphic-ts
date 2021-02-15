---
title: set.ts
nav_order: 8
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraSet (interface)](#modelalgebraset-interface)
- [SetConfig (interface)](#setconfig-interface)
- [SetURI (type alias)](#seturi-type-alias)
- [SetURI (constant)](#seturi-constant)

---

# ModelAlgebraSet (interface)

**Signature**

```ts
export interface ModelAlgebraSet<F extends URIS, Env extends AnyEnv> {
  _F: F
  set: <L, A>(
    a: Kind<F, Env, L, A>,
    ord: Ord<A>,
    config?: ConfigsForType<Env, Array<L>, ReadonlySet<A>, SetConfig<L, A>>
  ) => Kind<F, Env, Array<L>, ReadonlySet<A>>
}
```

Added in v0.0.1

# SetConfig (interface)

**Signature**

```ts
export interface SetConfig<L, A> {}
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
