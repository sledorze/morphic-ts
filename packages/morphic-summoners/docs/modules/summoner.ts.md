---
title: summoner.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [MakeSummonerResult (interface)](#makesummonerresult-interface)
- [SummonerOps (interface)](#summonerops-interface)
- [Summoners (interface)](#summoners-interface)
- [AnyConfigEnv (type alias)](#anyconfigenv-type-alias)
- [ExtractEnv (type alias)](#extractenv-type-alias)
- [SummonerEnv (type alias)](#summonerenv-type-alias)
- [SummonerInterpURI (type alias)](#summonerinterpuri-type-alias)
- [SummonerProgURI (type alias)](#summonerproguri-type-alias)
- [makeSummoner (function)](#makesummoner-function)

---

# MakeSummonerResult (interface)

- Cache application of the given interpreter
- Returns summoners giving the ability to constraint type parameters
- Returns the interpreter extended with matchers, monocle definitions, etc..
  /
  /\*\*

**Signature**

```ts
export interface MakeSummonerResult<S extends AnySummoners> {
  summon: S
  tagged: TaggedBuilder<SummonerProgURI<S>, SummonerInterpURI<S>, SummonerEnv<S>>
}
```

Added in v0.0.1

# SummonerOps (interface)

**Signature**

```ts
export interface SummonerOps<S extends AnySummoners = never> {
  summon: S
  tagged: TaggedBuilder<SummonerProgURI<S>, SummonerInterpURI<S>, SummonerEnv<S>>
  define: Define<SummonerProgURI<S>, SummonerEnv<S>>
}
```

Added in v0.0.1

# Summoners (interface)

**Signature**

```ts
export interface Summoners<ProgURI extends ProgramURI, InterpURI extends InterpreterURI, R extends AnyConfigEnv> {
  <L, A>(F: InferredProgram<R, L, A, ProgURI>): Materialized<R, L, A, ProgURI, InterpURI>
  _R: R
  _P: ProgURI
  _I: InterpURI
}
```

Added in v0.0.1

# AnyConfigEnv (type alias)

**Signature**

```ts
export type AnyConfigEnv = AnyEnv
```

Added in v0.0.1

# ExtractEnv (type alias)

**Signature**

```ts
export type ExtractEnv<Env, SummonerEnv extends URIS> = {
  [k in SummonerEnv & keyof Env]: NonNullable<Env>[k & keyof Env]
}
```

Added in v0.0.1

# SummonerEnv (type alias)

**Signature**

```ts
export type SummonerEnv<X extends AnySummoners> = NonNullable<X['_R']>
```

Added in v0.0.1

# SummonerInterpURI (type alias)

**Signature**

```ts
export type SummonerInterpURI<X extends AnySummoners> = NonNullable<X['_I']>
```

Added in v0.0.1

# SummonerProgURI (type alias)

**Signature**

```ts
export type SummonerProgURI<X extends AnySummoners> = NonNullable<X['_P']>
```

Added in v0.0.1

# makeSummoner (function)

**Signature**

```ts
export function makeSummoner<S extends AnySummoners = never>(
  cacheProgramEval: CacheType,
  programInterpreter: <E, A>(
    program: Overloads<ProgramType<SummonerEnv<S>, E, A>[SummonerProgURI<S>]>
  ) => InterpreterResult<E, A>[SummonerInterpURI<S>]
): SummonerOps<S> { ... }
```

Added in v0.0.1
