---
title: interpreters.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [modelOrdInterpreter (constant)](#modelordinterpreter-constant)

---

# modelOrdInterpreter (constant)

**Signature**

```ts
export const modelOrdInterpreter: <Env extends Partial<Readonly<Record<"OrdURI", any>>>>() => ModelAlgebraUnions<"OrdURI", Env> & ModelAlgebraRefined<"OrdURI", Env> & ModelAlgebraNewtype<"OrdURI", Env> & ModelAlgebraPrimitive<"OrdURI", Env> & ModelAlgebraIntersection<"OrdURI", Env> & ModelAlgebraSet<"OrdURI", Env> & ModelAlgebraStrMap<"OrdURI", Env> & ModelAlgebraTaggedUnions<"OrdURI", Env> = ...
```

Added in v0.0.1
