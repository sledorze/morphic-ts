---
title: model/object.ts
nav_order: 8
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [eqObjectInterpreter (constant)](#eqobjectinterpreter-constant)
- [eqOrUndefined (function)](#eqorundefined-function)

---

# eqObjectInterpreter (constant)

**Signature**

```ts
export const eqObjectInterpreter: <Env extends Partial<Record<"EqURI", any>>>() => ModelAlgebraObject1<"EqURI", Env> = ...
```

Added in v0.0.1

# eqOrUndefined (function)

**Signature**

```ts
export const eqOrUndefined = <A>(eq: Eq<A>): Eq<A | undefined> => ({
  equals: (x, y) => ...
```

Added in v0.0.1
