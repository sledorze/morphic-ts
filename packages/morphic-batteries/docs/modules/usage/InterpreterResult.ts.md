---
title: usage/InterpreterResult.ts
nav_order: 11
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [InterpreterResult (interface)](#interpreterresult-interface)
- [InterpreterURI (type alias)](#interpreteruri-type-alias)
- [SelectInterpURIs (type alias)](#selectinterpuris-type-alias)

---

# InterpreterResult (interface)

**Signature**

```ts
export interface InterpreterResult<E, A> extends Record<keyof InterpreterResult<any, any>, { build: (x: A) => A }> {}
```

Added in v0.0.1

# InterpreterURI (type alias)

**Signature**

```ts
export type InterpreterURI = keyof InterpreterResult<any, any>
```

Added in v0.0.1

# SelectInterpURIs (type alias)

**Signature**

```ts
export type SelectInterpURIs<E, A, ShapeConstraint> = SelectKeyOfMatchingValues<
  InterpreterResult<E, A>,
  ShapeConstraint
>
```

Added in v0.0.1
