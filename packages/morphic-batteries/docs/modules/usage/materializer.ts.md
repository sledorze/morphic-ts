---
title: usage/materializer.ts
nav_order: 10
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ProgramInterpreter (interface)](#programinterpreter-interface)
- [InterpreterURIOfProgramInterpreter (type alias)](#interpreteruriofprograminterpreter-type-alias)
- [Materialized (type alias)](#materialized-type-alias)
- [Morph (type alias)](#morph-type-alias)
- [ProgramURIOfProgramInterpreter (type alias)](#programuriofprograminterpreter-type-alias)
- [materialize (function)](#materialize-function)

---

# ProgramInterpreter (interface)

**Signature**

```ts
export interface ProgramInterpreter<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  <E, A>(program: ProgramType<E, A>[ProgURI]): InterpreterResult<E, A>[InterpURI]
}
```

Added in v0.0.1

# InterpreterURIOfProgramInterpreter (type alias)

**Signature**

```ts
export type InterpreterURIOfProgramInterpreter<X extends ProgramInterpreter<any, any>> = X extends ProgramInterpreter<
  any,
  infer R
>
  ? R
  : never
```

Added in v0.0.1

# Materialized (type alias)

**Signature**

```ts
export type Materialized<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = Morph<
  E,
  A,
  InterpURI,
  ProgURI
> &
  MonocleFor<A> &
  InhabitedTypes<E, A>
```

Added in v0.0.1

# Morph (type alias)

**Signature**

```ts
export type Morph<E, A, InterpURI extends InterpreterURI, ProgURI extends ProgramURI> = InterpreterResult<
  E,
  A
>[InterpURI] &
  ProgramType<E, A>[ProgURI]
```

Added in v0.0.1

# ProgramURIOfProgramInterpreter (type alias)

**Signature**

```ts
export type ProgramURIOfProgramInterpreter<X extends ProgramInterpreter<any, any>> = X extends ProgramInterpreter<
  infer P,
  any
>
  ? P
  : never
```

Added in v0.0.1

# materialize (function)

**Signature**

```ts
export function materialize<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  program: ProgramType<E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Materialized<E, A, ProgURI, InterpURI> { ... }
```

Added in v0.0.1
