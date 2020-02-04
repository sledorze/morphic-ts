---
title: interpreters-ESBAST.ts
nav_order: 2
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
- [ESBASTJInterpreterURI (type alias)](#esbastjinterpreteruri-type-alias)
- [ESBASTJInterpreterURI (constant)](#esbastjinterpreteruri-constant)
- [AsOpaque (function)](#asopaque-function)
- [AsUOpaque (function)](#asuopaque-function)
- [ESBASTJInterpreter (function)](#esbastjinterpreter-function)

---

# M (interface)

Type level override to keep Morph type name short \*/
/\*\*

**Signature**

```ts
export interface M<L, A> extends Materialized<L, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}
```

Added in v0.0.1

# Morph (interface)

**Signature**

```ts
export interface Morph {
  <A>(F: ProgramType<unknown, A>[ProgramNoUnionURI]): UM<A>
}
```

Added in v0.0.1

# MorphAs (interface)

**Signature**

```ts
export interface MorphAs {
  <L, A>(F: ProgramType<L, A>[ProgramNoUnionURI]): M<L, A>
}
```

Added in v0.0.1

# MorphAsA (interface)

**Signature**

```ts
export interface MorphAsA {
  <A>(): <L>(F: ProgramType<L, A>[ProgramNoUnionURI]) => M<L, A>
}
```

Added in v0.0.1

# MorphAsL (interface)

**Signature**

```ts
export interface MorphAsL {
  <L>(): <A>(F: ProgramType<L, A>[ProgramNoUnionURI]) => M<L, A>
}
```

Added in v0.0.1

# Summoner (interface)

**Signature**

```ts
export interface Summoner extends Summoners<ProgramNoUnionURI, ESBASTJInterpreterURI> {
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
export interface UM<A> extends Materialized<unknown, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}
```

Added in v0.0.1

# ESBASTJInterpreterURI (type alias)

**Signature**

```ts
export type ESBASTJInterpreterURI = typeof ESBASTJInterpreterURI
```

Added in v0.0.1

# ESBASTJInterpreterURI (constant)

**Signature**

```ts
export const ESBASTJInterpreterURI: typeof ESBASTJInterpreterURI = ...
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

# ESBASTJInterpreter (function)

**Signature**

```ts
export const ESBASTJInterpreter: ProgramInterpreter<ProgramNoUnionURI, ESBASTJInterpreterURI> = _program => ...
```

Added in v0.0.1
