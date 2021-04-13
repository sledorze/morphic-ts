---
title: recursive.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraRecursive (interface)](#modelalgebrarecursive-interface)
- [RecursiveConfig (interface)](#recursiveconfig-interface)
- [RecursiveURI (type alias)](#recursiveuri-type-alias)
- [RecursiveURI (constant)](#recursiveuri-constant)

---

# ModelAlgebraRecursive (interface)

**Signature**

```ts
export interface ModelAlgebraRecursive<F extends URIS, Env extends AnyEnv> {
  _F: F
  recursive: <L, A>(
    a: (x: Kind<F, Env, L, A>) => Kind<F, Env, L, A>,
    config?: Named<ConfigsForType<Env, L, A, RecursiveConfig<L, A>>>
  ) => Kind<F, Env, L, A>
}
```

Added in v0.0.1

# RecursiveConfig (interface)

**Signature**

```ts
export interface RecursiveConfig<L, A> {}
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
export const RecursiveURI: "RecursiveURI" = ...
```

Added in v0.0.1
