---
title: config.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ConfigType (interface)](#configtype-interface)
- [GenConfig (interface)](#genconfig-interface)
- [AnyEnv (type alias)](#anyenv-type-alias)
- [ConfigsForType (type alias)](#configsfortype-type-alias)
- [MapToGenConfig (type alias)](#maptogenconfig-type-alias)
- [NoEnv (type alias)](#noenv-type-alias)
- [URISIndexedAny (type alias)](#urisindexedany-type-alias)
- [getApplyConfig (function)](#getapplyconfig-function)
- [Kind (export)](#kind-export)
- [Kind2 (export)](#kind2-export)

---

# ConfigType (interface)

**Signature**

```ts
export interface ConfigType<E, A> {
  _E: E
  _A: A
}
```

Added in v0.0.1

# GenConfig (interface)

**Signature**

```ts
export interface GenConfig<A, R> {
  (a: A, r: R): A
}
```

Added in v0.0.1

# AnyEnv (type alias)

**Signature**

```ts
export type AnyEnv = Partial<URISIndexedAny>
```

Added in v0.0.1

# ConfigsForType (type alias)

**Signature**

```ts
export type ConfigsForType<R extends AnyEnv, E, A> = MapToGenConfig<R, ConfigType<E, A>>
```

Added in v0.0.1

# MapToGenConfig (type alias)

**Signature**

```ts
export type MapToGenConfig<R extends AnyEnv, T extends URISIndexedAny> = {
  [k in URIS | URIS2]?: GenConfig<T[k], R[k]>
}
```

Added in v0.0.1

# NoEnv (type alias)

**Signature**

```ts
export type NoEnv = unknown
```

Added in v0.0.1

# URISIndexedAny (type alias)

**Signature**

```ts
export type URISIndexedAny = Record<URIS | URIS2, any>
```

Added in v0.0.1

# getApplyConfig (function)

**Signature**

```ts
export const getApplyConfig: <Uri extends URIS | URIS2>(
  uri: Uri
) => <E, A, R extends Record<typeof uri, any>>(
  config?: { [k in Uri]?: GenConfig<ConfigType<E, A>[Uri], R> }
) => GenConfig<ConfigType<E, A>[Uri], R> = uri => config => (a, r) =>
  ((config && config[uri] ? config[uri] : <A>(a: A) => ...
```

Added in v0.0.1

# Kind (export)

**Signature**

```ts
any
```

Added in v0.0.1

# Kind2 (export)

**Signature**

```ts
any
```

Added in v0.0.1
