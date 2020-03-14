---
title: usage/programs-infer.ts
nav_order: 13
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [InferredProgram (interface)](#inferredprogram-interface)
- [InferredAlgebra (type alias)](#inferredalgebra-type-alias)
- [Overloads (type alias)](#overloads-type-alias)
- [overloadsSymb (constant)](#overloadssymb-constant)
- [interpretable (function)](#interpretable-function)
- [makeDefine (function)](#makedefine-function)

---

# InferredProgram (interface)

**Signature**

```ts
export interface InferredProgram<E, A, PURI extends ProgramURI> {
  <G>(a: ProgramAlgebra<G>[PURI]): HKT2<G, E, A>
  [overloadsSymb]?: {
    <G extends URIS>(a: Algebra1<ProgramAlgebraURI[PURI], G>): Kind<G, A>
    <G extends URIS2>(a: Algebra2<ProgramAlgebraURI[PURI], G>): Kind2<G, E, A>
  }
}
```

Added in v0.0.1

# InferredAlgebra (type alias)

**Signature**

```ts
export type InferredAlgebra<F, PURI extends ProgramURI> = Algebra<ProgramAlgebraURI[PURI], F>
```

Added in v0.0.1

# Overloads (type alias)

**Signature**

```ts
export type Overloads<I extends InferredProgram<any, any, any>> = NonNullable<I[typeof overloadsSymb]>
```

Added in v0.0.1

# overloadsSymb (constant)

**Signature**

```ts
export const overloadsSymb: typeof overloadsSymb = ...
```

Added in v0.0.1

# interpretable (function)

**Signature**

```ts
export const interpretable = <T extends { [overloadsSymb]?: any }>(program: T): NonNullable<T[typeof overloadsSymb]> => ...
```

Added in v0.0.1

# makeDefine (function)

Provides Program builder for the given Program type (Exposing a specific Algebra)
/
/\*\*

**Signature**

```ts
export const makeDefine = <PURI extends ProgramURI>(_prog: PURI) => <E, A>(
  program: ProgramType<E, A>[PURI]
): Overloads<ProgramType<E, A>[PURI]> => ...
```

Added in v0.0.1
