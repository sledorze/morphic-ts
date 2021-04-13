---
title: unknown.ts
nav_order: 13
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraUnknown (interface)](#modelalgebraunknown-interface)
- [UnknownConfig (interface)](#unknownconfig-interface)
- [Keys (type alias)](#keys-type-alias)
- [UnknownURI (type alias)](#unknownuri-type-alias)
- [UnknownURI (constant)](#unknownuri-constant)

---

# ModelAlgebraUnknown (interface)

**Signature**

```ts
export interface ModelAlgebraUnknown<F extends URIS, Env extends AnyEnv> {
  _F: F
  unknown(config?: Named<ConfigsForType<Env, unknown, unknown, UnknownConfig>>): Kind<F, Env, unknown, unknown>
}
```

Added in v0.0.1

# UnknownConfig (interface)

**Signature**

```ts
export interface UnknownConfig {}
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
