---
title: str-map.ts
nav_order: 9
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraStrMap (interface)](#modelalgebrastrmap-interface)
- [ModelAlgebraStrMap1 (interface)](#modelalgebrastrmap1-interface)
- [ModelAlgebraStrMap2 (interface)](#modelalgebrastrmap2-interface)
- [StrMapURI (type alias)](#strmapuri-type-alias)
- [StrMapURI (constant)](#strmapuri-constant)

---

# ModelAlgebraStrMap (interface)

**Signature**

```ts
export interface ModelAlgebraStrMap<F, Env> {
  _F: F
  strMap: {
    <L, A>(codomain: HKT2<F, Env, L, A>, config?: ConfigsForType<Env, Record<string, L>, Record<string, A>>): HKT2<
      F,
      Env,
      Record<string, L>,
      Record<string, A>
    >
  }
}
```

Added in v0.0.1

# ModelAlgebraStrMap1 (interface)

**Signature**

```ts
export interface ModelAlgebraStrMap1<F extends URIS, Env extends AnyEnv> {
  _F: F
  strMap: <A>(
    codomain: Kind<F, Env, A>,
    config?: ConfigsForType<Env, unknown, Record<string, A>>
  ) => Kind<F, Env, Record<string, A>>
}
```

Added in v0.0.1

# ModelAlgebraStrMap2 (interface)

**Signature**

```ts
export interface ModelAlgebraStrMap2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  strMap: <L, A>(
    codomain: Kind2<F, Env, L, A>,
    config?: ConfigsForType<Env, Record<string, L>, Record<string, A>>
  ) => Kind2<F, Env, Record<string, L>, Record<string, A>>
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
