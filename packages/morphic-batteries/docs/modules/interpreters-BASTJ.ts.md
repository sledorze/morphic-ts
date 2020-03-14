---
title: interpreters-BASTJ.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [M (interface)](#m-interface)
- [Morph (interface)](#morph-interface)
- [MorphAs (interface)](#morphas-interface)
- [MorphAsA (interface)](#morphasa-interface)
- [MorphAsL (interface)](#morphasl-interface)
- [Summoner (interface)](#summoner-interface)
- [UM (interface)](#um-interface)
- [BASTJInterpreterURI (type alias)](#bastjinterpreteruri-type-alias)
- [BASTJInterpreterURI (constant)](#bastjinterpreteruri-constant)
- [AsOpaque (function)](#asopaque-function)
- [AsUOpaque (function)](#asuopaque-function)
- [BASTJInterpreter (function)](#bastjinterpreter-function)

---

# M (interface)

Type level override to keep Morph type name short \*/
/\*\*

**Signature**

```ts
export interface M<L, A> extends Materialized<L, A, ProgramUnionURI, BASTJInterpreterURI> {}
```

Added in v0.0.1

# Morph (interface)

**Signature**

```ts
export interface Morph {
  <A>(F: ProgramType<unknown, A>[ProgramUnionURI]): UM<A>
}
```

Added in v0.0.1

# MorphAs (interface)

**Signature**

```ts
export interface MorphAs {
  <L, A>(F: ProgramType<L, A>[ProgramUnionURI]): M<L, A>
}
```

Added in v0.0.1

# MorphAsA (interface)

**Signature**

```ts
export interface MorphAsA {
  <A>(): <L>(F: ProgramType<L, A>[ProgramUnionURI]) => M<L, A>
}
```

Added in v0.0.1

# MorphAsL (interface)

**Signature**

```ts
export interface MorphAsL {
  <L>(): <A>(F: ProgramType<L, A>[ProgramUnionURI]) => M<L, A>
}
```

Added in v0.0.1

# Summoner (interface)

**Signature**

```ts
export interface Summoner extends Summoners<ProgramUnionURI, BASTJInterpreterURI> {
  summonAs: MorphAs
  summonAsA: MorphAsA
  summonAsL: MorphAsL
  summon: Morph
}
```

Added in v0.0.1

# UM (interface)

**Signature**

```ts
export interface UM<A> extends Materialized<unknown, A, ProgramUnionURI, BASTJInterpreterURI> {}
```

Added in v0.0.1

# BASTJInterpreterURI (type alias)

**Signature**

```ts
export type BASTJInterpreterURI = typeof BASTJInterpreterURI
```

Added in v0.0.1

# BASTJInterpreterURI (constant)

**Signature**

```ts
export const BASTJInterpreterURI: "BASTJInterpreterURI" = ...
```

Added in v0.0.1

# AsOpaque (function)

**Signature**

```ts
export const AsOpaque = <E, A>(x: M<E, A>): M<E, A> => ...
```

Added in v0.0.1

# AsUOpaque (function)

**Signature**

```ts
export const AsUOpaque = <A>(x: UM<A>): UM<A> => ...
```

Added in v0.0.1

# BASTJInterpreter (function)

**Signature**

```ts
export const BASTJInterpreter: ProgramInterpreter<ProgramUnionURI, BASTJInterpreterURI> = _program => ...
```

Added in v0.0.1
