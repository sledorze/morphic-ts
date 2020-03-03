---
title: str-map.ts
nav_order: 8
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
export interface ModelAlgebraStrMap<F> {
  _F: F
  strMap: {
    <L, A>(codomain: HKT2<F, L, A>): isOptionalConfig<
      StrMapConfig<L, A>,
      HKT2<F, Array<[string, L]>, Record<string, A>>
    >
    <L, A>(codomain: HKT2<F, L, A>, config?: ByInterp<StrMapConfig<L, A>, URIS | URIS2>): HKT2<
      F,
      Array<[string, L]>,
      Record<string, A>
    >
  }
}
```

Added in v0.0.1

# ModelAlgebraStrMap1 (interface)

**Signature**

```ts
export interface ModelAlgebraStrMap1<F extends URIS> {
  _F: F
  strMap: <A>(codomain: Kind<F, A>, config?: ByInterp<StrMapConfig<unknown, A>, F>) => Kind<F, Record<string, A>>
}
```

Added in v0.0.1

# ModelAlgebraStrMap2 (interface)

**Signature**

```ts
export interface ModelAlgebraStrMap2<F extends URIS2> {
  _F: F
  strMap: <L, A>(
    codomain: Kind2<F, L, A>,
    config?: ByInterp<StrMapConfig<L, A>, F>
  ) => Kind2<F, Record<string, L>, Record<string, A>>
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
