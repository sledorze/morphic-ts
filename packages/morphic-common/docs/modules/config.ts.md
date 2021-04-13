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
- [Named (type alias)](#named-type-alias)
- [NoEnv (type alias)](#noenv-type-alias)
- [ThreadURI (type alias)](#threaduri-type-alias)
- [URISIndexedAny (type alias)](#urisindexedany-type-alias)
- [getApplyConfig (function)](#getapplyconfig-function)
- [Kind (export)](#kind-export)

---

# ConfigType (interface)

**Signature**

```ts
export interface ConfigType<E, A> {
  _E: E
  _A: A
  readonly ['HKT']: never
}
```

Added in v0.0.1

# GenConfig (interface)

**Signature**

```ts
export interface GenConfig<A, R, K> {
  (a: A, r: R, k: K): A
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
export type ConfigsForType<R extends AnyEnv, E, A, K = {}> = MapToGenConfig<R, ConfigType<E, A>, K>
```

Added in v0.0.1

# MapToGenConfig (type alias)

**Signature**

```ts
export type MapToGenConfig<R extends AnyEnv, T extends URISIndexedAny, K> = {
  [k in URIS_]?: GenConfig<T[k], R[k], ThreadURI<K, k>>
}
```

Added in v0.0.1

# Named (type alias)

**Signature**

```ts
export type Named<A> = {
  name?: string
  conf?: A
}
```

Added in v0.0.1

# NoEnv (type alias)

**Signature**

```ts
export type NoEnv = unknown
```

Added in v0.0.1

# ThreadURI (type alias)

**Signature**

```ts
export type ThreadURI<C, URI extends URIS> = URI extends keyof C ? C[URI] : unknown
```

Added in v0.0.1

# URISIndexedAny (type alias)

**Signature**

```ts
export type URISIndexedAny = Readonly<Record<URIS_, any>>
```

Added in v0.0.1

# getApplyConfig (function)

**Signature**

```ts
export const getApplyConfig: <Uri extends URIS_>(
  uri: Uri
) => <E, A, R extends Record<typeof uri, any>, K>(
  config?: { [k in Uri]?: GenConfig<ConfigType<E, A>[Uri], R, K> }
) => GenConfig<ConfigType<E, A>[Uri], R, K> = uri => config => (a, r, k) =>
  ((config && config[uri] ? config[uri] : <A>(a: A) => ...
```

Added in v0.0.1

# Kind (export)

**Signature**

```ts
any
```

Added in v0.0.1
