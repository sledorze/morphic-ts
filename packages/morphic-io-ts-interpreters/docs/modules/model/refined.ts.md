---
title: model/refined.ts
nav_order: 12
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ioTsRefinedInterpreter (constant)](#iotsrefinedinterpreter-constant)
- [refinement (function)](#refinement-function)

---

# ioTsRefinedInterpreter (constant)

**Signature**

```ts
export const ioTsRefinedInterpreter: <Env extends Partial<Record<"IoTsURI", any>>>() => ModelAlgebraRefined2<"IoTsURI", Env> = ...
```

Added in v0.0.1

# refinement (function)

**Signature**

```ts
export const refinement = <A, O, B extends A>(T: Type<A, O>, ref: (a: A) => a is B, name: string): Type<B, O> =>
  new Type<B, O>(
    name,
    (x): x is B => T.is(x) && ref(x),
    (i, c) => ...
```

Added in v0.0.1
