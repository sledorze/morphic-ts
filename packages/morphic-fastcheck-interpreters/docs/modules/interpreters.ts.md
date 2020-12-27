---
title: interpreters.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [modelFastCheckInterpreter (constant)](#modelfastcheckinterpreter-constant)

---

# modelFastCheckInterpreter (constant)

**Signature**

```ts
export const modelFastCheckInterpreter: <Env extends Partial<Readonly<Record<"FastCheckURI", any>>>>() => ModelAlgebraRefined<"FastCheckURI", Env> & ModelAlgebraNewtype<"FastCheckURI", Env> & ModelAlgebraUnknown<"FastCheckURI", Env> & ModelAlgebraPrimitive<"FastCheckURI", Env> & ModelAlgebraIntersection<"FastCheckURI", Env> & ModelAlgebraObject<"FastCheckURI", Env> & ModelAlgebraUnions<"FastCheckURI", Env> & ModelAlgebraTaggedUnions<"FastCheckURI", Env> & ModelAlgebraRecursive<"FastCheckURI", Env> & ModelAlgebraStrMap<"FastCheckURI", Env> & ModelAlgebraSet<"FastCheckURI", Env> = ...
```

Added in v0.0.1
