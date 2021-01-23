---
title: interpreters.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [modelEqInterpreter (constant)](#modeleqinterpreter-constant)

---

# modelEqInterpreter (constant)

**Signature**

```ts
export const modelEqInterpreter: <Env extends Partial<Readonly<Record<"EqURI", any>>>>() => ModelAlgebraUnions<"EqURI", Env> & ModelAlgebraRefined<"EqURI", Env> & ModelAlgebraNewtype<"EqURI", Env> & ModelAlgebraUnknown<"EqURI", Env> & ModelAlgebraPrimitive<"EqURI", Env> & ModelAlgebraIntersection<"EqURI", Env> & ModelAlgebraObject<"EqURI", Env> & ModelAlgebraTaggedUnions<"EqURI", Env> & ModelAlgebraRecursive<"EqURI", Env> & ModelAlgebraStrMap<"EqURI", Env> & ModelAlgebraSet<"EqURI", Env> = ...
```

Added in v0.0.1
