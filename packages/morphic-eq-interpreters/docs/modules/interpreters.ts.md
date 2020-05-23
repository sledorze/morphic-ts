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
export const modelEqInterpreter: <Env extends Partial<Record<"EqURI", any>>>() => ModelAlgebraRefined1<"EqURI", Env> & ModelAlgebraNewtype1<"EqURI", Env> & ModelAlgebraUnknown1<"EqURI", Env> & ModelAlgebraPrimitive1<"EqURI", Env> & ModelAlgebraIntersection1<"EqURI", Env> & ModelAlgebraObject1<"EqURI", Env> & ModelAlgebraTaggedUnions1<"EqURI", Env> & ModelAlgebraRecursive1<"EqURI", Env> & ModelAlgebraStrMap1<"EqURI", Env> & ModelAlgebraSet1<"EqURI", Env> = ...
```

Added in v0.0.1
