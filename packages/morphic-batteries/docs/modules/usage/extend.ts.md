---
title: usage/extend.ts
nav_order: 10
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ExtType (type alias)](#exttype-type-alias)
- [Extension (class)](#extension-class)
  - [of (static method)](#of-static-method)
  - [with (method)](#with-method)
  - [asType (method)](#astype-method)
  - [interpretedBy (method)](#interpretedby-method)

---

# ExtType (type alias)

**Signature**

```ts
export type ExtType<E extends Extension<any, any>> = E['ext']
```

Added in v0.0.1

# Extension (class)

**Signature**

```ts
export class Extension<ProgURI, Ext> {
  constructor(readonly ext: Ext) { ... }
  ...
}
```

Added in v0.0.1

## of (static method)

Defines the base program type

**Signature**

```ts
static of<ProgURI extends ProgramURI>(_p: ProgURI): Extension<ProgURI, {}> { ... }
```

Added in v0.0.1

## with (method)

Extends the current algebra with new definitions

**Signature**

```ts
with<O extends Record<string, { (...args: any[]): <G>(x: ProgramAlgebra<G>[ProgURI] & Ext) => HKT2<G, any, any> }>>(
    o: O
  ): Extension<ProgURI, Ext & O> { ... }
```

Added in v0.0.1

## asType (method)

Convenience method to opacity Extension as a nominal type in order to reduce inference noise

**Signature**

```ts
asType<OExt extends Ext>(): Extension<ProgURI, OExt> { ... }
```

Added in v0.0.1

## interpretedBy (method)

Returns an interpreter extended with this new albegra

**Signature**

```ts
interpretedBy<Interp extends <E, A>(program: ProgramType<E, A>[ProgURI]) => InterpreterResult<E, A>[InterpreterURI]>(
    int: Interp
  ): <E, A>(
    program: <G>(x: ProgramAlgebra<G>[ProgURI] & Ext) => HKT2<G, E, A>
  ) => InterpreterResult<E, A>[InterpreterURIOfProgramInterpreter<typeof int>] { ... }
```

Added in v0.0.1
