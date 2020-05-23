---
title: unknown.ts
nav_order: 12
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraUnknown (interface)](#modelalgebraunknown-interface)
- [ModelAlgebraUnknown1 (interface)](#modelalgebraunknown1-interface)
- [ModelAlgebraUnknown2 (interface)](#modelalgebraunknown2-interface)
- [Keys (type alias)](#keys-type-alias)
- [UnknownURI (type alias)](#unknownuri-type-alias)
- [UnknownURI (constant)](#unknownuri-constant)

---

# ModelAlgebraUnknown (interface)

**Signature**

```ts
export interface ModelAlgebraUnknown<F, Env> {
  _F: F
  unknown: {
    (config?: ConfigsForType<Env, unknown, unknown>): HKT2<F, Env, unknown, unknown>
  }
}
```

Added in v0.0.1

# ModelAlgebraUnknown1 (interface)

**Signature**

```ts
export interface ModelAlgebraUnknown1<F extends URIS, Env extends AnyEnv> {
  _F: F
  unknown(config?: ConfigsForType<Env, unknown, unknown>): Kind<F, Env, unknown>
}
```

Added in v0.0.1

# ModelAlgebraUnknown2 (interface)

**Signature**

```ts
export interface ModelAlgebraUnknown2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  unknown(config?: ConfigsForType<Env, unknown, unknown>): Kind2<F, Env, unknown, unknown>
}
```

Added in v0.0.1

# Keys (type alias)

**Signature**

```ts
export type Keys = Record<string, null>
```

Added in v0.0.1

# UnknownURI (type alias)

**Signature**

```ts
export type UnknownURI = typeof UnknownURI
```

Added in v0.0.1

# UnknownURI (constant)

**Signature**

```ts
export const UnknownURI: "UnknownURI" = ...
```

Added in v0.0.1
