---
title: core.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ConfigWrapper (interface)](#configwrapper-interface)
- [ByInterp (type alias)](#byinterp-type-alias)
- [CacheType (type alias)](#cachetype-type-alias)
- [Compact (type alias)](#compact-type-alias)
- [KeepNotUndefined (type alias)](#keepnotundefined-type-alias)
- [MaybeUndefinedIfOptional (type alias)](#maybeundefinedifoptional-type-alias)
- [OfType (type alias)](#oftype-type-alias)
- [OfType2 (type alias)](#oftype2-type-alias)
- [OptionalIfUndefined (type alias)](#optionalifundefined-type-alias)
- [UnionToIntersection (type alias)](#uniontointersection-type-alias)
- [isOptionalConfig (type alias)](#isoptionalconfig-type-alias)
- [cacheUnaryFunction (function)](#cacheunaryfunction-function)
- [genConfig (function)](#genconfig-function)

---

# ConfigWrapper (interface)

**Signature**

```ts
export interface ConfigWrapper<Uri extends URIS | URIS2> {
  <T>(config: T extends { [k in Uri]?: infer Config } ? Config : never): T
}
```

Added in v0.0.1

# ByInterp (type alias)

Expose Configuration type for (a) specific interpreter(s) types

**Signature**

```ts
export type ByInterp<Config, Interp extends URIS | URIS2> = MaybeUndefinedIfOptional<
  OptionalIfUndefined<
    {
      [I in Interp]: I extends keyof Config ? Config[I] : undefined
    }
  >
>
```

Added in v0.0.1

# CacheType (type alias)

**Signature**

```ts
export type CacheType = <F extends Function1>(f: F) => F
```

Added in v0.0.1

# Compact (type alias)

**Signature**

```ts
export type Compact<A> = {
  [K in keyof A]: A[K]
}
```

Added in v0.0.1

# KeepNotUndefined (type alias)

**Signature**

```ts
export type KeepNotUndefined<O> = UnionToIntersection<
  NonNullable<{ [k in keyof O]: undefined extends O[k] ? never : { [x in k]: O[k] } }[keyof O]>
>
```

Added in v0.0.1

# MaybeUndefinedIfOptional (type alias)

**Signature**

```ts
export type MaybeUndefinedIfOptional<X> = keyof KeepNotUndefined<X> extends never ? X | undefined : X
```

Added in v0.0.1

# OfType (type alias)

**Signature**

```ts
export type OfType<F extends URIS, A> = Kind<F, A>
```

Added in v0.0.1

# OfType2 (type alias)

**Signature**

```ts
export type OfType2<F extends URIS2, L, A> = Kind2<F, L, A>
```

Added in v0.0.1

# OptionalIfUndefined (type alias)

**Signature**

```ts
export type OptionalIfUndefined<T> = Compact<KeepNotUndefined<T> & KeepOptionalIfUndefined<T>>
```

Added in v0.0.1

# UnionToIntersection (type alias)

**Signature**

```ts
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
```

Added in v0.0.1

# isOptionalConfig (type alias)

**Signature**

```ts
export type isOptionalConfig<C, Y> = keyof KeepNotUndefined<ByInterp<C, URIS | URIS2>> extends never
  ? Y
  : 'config required'
```

Added in v0.0.1

# cacheUnaryFunction (function)

**Signature**

```ts
export function cacheUnaryFunction<F extends Function1>(f: F) { ... }
```

Added in v0.0.1

# genConfig (function)

generates a config wrapper:

Example:

```typescript
const eqConfig = genConfig(EqURI)
```

Usage:

```typescript
summonAs(F => F.unknown(eqConfig({ compare: 'default-circular' })))
summonAs(F => F.unknown({ ...eqConfig({ compare: 'default-circular' }), ...iotsConfig(x => x) }))
```

**Signature**

```ts
export const genConfig: <Uri extends URIS | URIS2>(uri: Uri) => ConfigWrapper<Uri> = uri => config => ...
```

Added in v0.0.1
