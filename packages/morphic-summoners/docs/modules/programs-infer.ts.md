---
title: programs-infer.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Define (interface)](#define-interface)
- [InferredProgram (interface)](#inferredprogram-interface)
- [InferredAlgebra (type alias)](#inferredalgebra-type-alias)
- [Overloads (type alias)](#overloads-type-alias)
- [overloadsSymb (constant)](#overloadssymb-constant)
- [defineFor (function)](#definefor-function)
- [interpretable (function)](#interpretable-function)

---

# Define (interface)

**Signature**

```ts
export interface Define<PURI extends ProgramURI, R extends AnyConfigEnv = {}> {
  <E, A>(program: ProgramType<R, E, A>[PURI]): ProgramType<R, E, A>[PURI]
}
```

Added in v0.0.1

# InferredProgram (interface)

**Signature**

```ts
export interface InferredProgram<R extends AnyConfigEnv, E, A, PURI extends ProgramURI> {
  _PURI?: PURI
  <G, Env extends R>(a: ProgramAlgebra<G, Env>[PURI]): HKT2<G, Env, E, A>
  [overloadsSymb]?: {
    <G extends URIS>(a: Algebra1<ProgramAlgebraURI[PURI], G, R>): Kind<G, { [k in G & keyof R]: R[k] }, A>
    <G extends URIS2>(a: Algebra2<ProgramAlgebraURI[PURI], G, R>): Kind2<G, { [k in G & keyof R]: R[k] }, E, A>
  }
}
```

Added in v0.0.1

# InferredAlgebra (type alias)

**Signature**

```ts
export type InferredAlgebra<F, PURI extends ProgramURI, R> = Algebra<ProgramAlgebraURI[PURI], F, R>
```

Added in v0.0.1

# Overloads (type alias)

**Signature**

```ts
export type Overloads<I extends { [overloadsSymb]?: any }> = NonNullable<I[typeof overloadsSymb]>
```

Added in v0.0.1

# overloadsSymb (constant)

**Signature**

```ts
export const overloadsSymb: typeof overloadsSymb = ...
```

Added in v0.0.1

# defineFor (function)

Provides Program builder for the given Program type (Exposing a specific Algebra)
/
/\*\*

**Signature**

```ts
export const defineFor: <PURI extends ProgramURI>(
  _prog: PURI
) => <R extends AnyConfigEnv = {}>() => Define<PURI, R> = _ => () => a => ...
```

Added in v0.0.1

# interpretable (function)

**Signature**

```ts
export const interpretable = <T extends { [overloadsSymb]?: any }>(program: T): Overloads<T> => ...
```

Added in v0.0.1
