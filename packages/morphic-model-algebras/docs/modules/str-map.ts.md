---
title: str-map.ts
nav_order: 9
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraStrMap (interface)](#modelalgebrastrmap-interface)
- [StrMapURI (type alias)](#strmapuri-type-alias)
- [StrMapURI (constant)](#strmapuri-constant)

---

# ModelAlgebraStrMap (interface)

**Signature**

```ts
export interface ModelAlgebraStrMap<F extends URIS, Env extends AnyEnv> {
  _F: F
  strMap: <L, A>(
    codomain: Kind<F, Env, L, A>,
    config?: ConfigsForType<Env, Readonly<Record<string, L>>, Readonly<Record<string, A>>>
  ) => Kind<F, Env, Readonly<Record<string, L>>, Readonly<Record<string, A>>>
  record: <LA extends string, LB, A extends string, B>(
    domain: Kind<F, Env, LA, A>,
    codomain: Kind<F, Env, LB, B>,
    config?: ConfigsForType<Env, Readonly<Record<LA, LB>>, Readonly<Record<A, B>>>
  ) => Kind<F, Env, Readonly<Record<LA, LB>>, Readonly<Record<A, B>>>
}
```

Added in v0.0.1

# StrMapURI (type alias)

**Signature**

```ts
export type StrMapURI = typeof StrMapURI
```

Added in v0.0.1

# StrMapURI (constant)

**Signature**

```ts
export const StrMapURI: "StrMapURI" = ...
```

Added in v0.0.1
