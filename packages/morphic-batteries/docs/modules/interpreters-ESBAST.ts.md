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
- [ESBASTInterpreterURI (type alias)](#esbastinterpreteruri-type-alias)
- [ESBASTInterpreterURI (constant)](#esbastinterpreteruri-constant)
- [AsOpaque (function)](#asopaque-function)
- [AsUOpaque (function)](#asuopaque-function)
- [ESBASTInterpreter (function)](#esbastinterpreter-function)

---

# M (interface)

Type level override to keep Morph type name short \*/
/\*\*

**Signature**

```ts
export interface M<L, A> extends Materialized<L, A, ProgramNoUnionURI, ESBASTInterpreterURI> {}
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
export interface Summoner extends Summoners<ProgramNoUnionURI, ESBASTInterpreterURI> {
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
export interface UM<A> extends Materialized<unknown, A, ProgramNoUnionURI, ESBASTInterpreterURI> {}
```

Added in v0.0.1

# ESBASTInterpreterURI (type alias)

**Signature**

```ts
export type ESBASTInterpreterURI = typeof ESBASTInterpreterURI
```

Added in v0.0.1

# ESBASTInterpreterURI (constant)

**Signature**

```ts
export const ESBASTInterpreterURI: "ESBASTInterpreterURI" = ...
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

# ESBASTInterpreter (function)

**Signature**

```ts
export const ESBASTInterpreter: ProgramInterpreter<ProgramNoUnionURI, ESBASTInterpreterURI> = _program => ...
```

Added in v0.0.1
