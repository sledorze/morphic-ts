---
title: model/refined.ts
nav_order: 12
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ioTsRefinedInterpreter (constant)](#iotsrefinedinterpreter-constant)
- [predicate (function)](#predicate-function)
- [refinement (function)](#refinement-function)

---

# ioTsRefinedInterpreter (constant)

**Signature**

```ts
export const ioTsRefinedInterpreter: <Env extends Partial<Readonly<Record<"IoTsURI", any>>>>() => ModelAlgebraRefined<"IoTsURI", Env> = ...
```

Added in v0.0.1

# predicate (function)

**Signature**

```ts
export const predicate = <A, O>(T: Type<A, O>, predicate: Predicate<A>, name: string): Type<A, O> =>
  new Type<A, O>(
    name,
    (x): x is A => T.is(x) && predicate(x),
    (i, c) => ...
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
