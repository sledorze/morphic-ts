---
title: usage/materializer.ts
nav_order: 16
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [InhabitedInterpreterAndAlbegra (interface)](#inhabitedinterpreterandalbegra-interface)
- [MorphExtra (interface)](#morphextra-interface)
- [ProgramInterpreter (interface)](#programinterpreter-interface)
- [Materialized (type alias)](#materialized-type-alias)
- [Morph (type alias)](#morph-type-alias)
- [materialize (function)](#materialize-function)

---

# InhabitedInterpreterAndAlbegra (interface)

**Signature**

```ts
export interface InhabitedInterpreterAndAlbegra<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  _P: ProgURI
  _I: InterpURI
}
```

Added in v0.0.1

# MorphExtra (interface)

**Signature**

```ts
export interface MorphExtra<R, E, A, InterpURI extends InterpreterURI, ProgURI extends ProgramURI>
  extends InhabitedTypes<R, E, A>,
    InhabitedInterpreterAndAlbegra<ProgURI, InterpURI>,
    Interpretable<R, E, A, ProgURI> {}
```

Added in v0.0.1

# ProgramInterpreter (interface)

**Signature**

```ts
export interface ProgramInterpreter<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  <R, E, A>(program: ProgramType<R, E, A>[ProgURI]): InterpreterResult<E, A>[InterpURI]
}
```

Added in v0.0.1

# Materialized (type alias)

**Signature**

```ts
export type Materialized<R, E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = Morph<
  R,
  E,
  A,
  InterpURI,
  ProgURI
> &
  MonocleFor<A>
```

Added in v0.0.1

# Morph (type alias)

**Signature**

```ts
export type Morph<R, E, A, InterpURI extends InterpreterURI, ProgURI extends ProgramURI> = InterpreterResult<
  E,
  A
>[InterpURI] &
  ProgramType<R, E, A>[ProgURI] &
  MorphExtra<R, E, A, InterpURI, ProgURI>
```

Added in v0.0.1

# materialize (function)

**Signature**

```ts
export function materialize<R, E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  program: ProgramType<R, E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Materialized<R, E, A, ProgURI, InterpURI> { ... }
```

Added in v0.0.1
