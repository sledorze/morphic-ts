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
export const modelFastCheckInterpreter: <Env extends Partial<Record<"FastCheckURI", any>>>() => ModelAlgebraRefined1<"FastCheckURI", Env> & ModelAlgebraNewtype1<"FastCheckURI", Env> & ModelAlgebraUnknown1<"FastCheckURI", Env> & ModelAlgebraPrimitive1<"FastCheckURI", Env> & ModelAlgebraIntersection1<"FastCheckURI", Env> & ModelAlgebraObject1<"FastCheckURI", Env> & ModelAlgebraUnions1<"FastCheckURI", Env> & ModelAlgebraTaggedUnions1<"FastCheckURI", Env> & ModelAlgebraRecursive1<"FastCheckURI", Env> & ModelAlgebraStrMap1<"FastCheckURI", Env> & ModelAlgebraSet1<"FastCheckURI", Env> = ...
```

Added in v0.0.1
