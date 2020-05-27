---
title: interpreters.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [modelJsonSchemaInterpreter (constant)](#modeljsonschemainterpreter-constant)

---

# modelJsonSchemaInterpreter (constant)

**Signature**

```ts
export const modelJsonSchemaInterpreter: <Env extends Partial<Record<"JsonSchemaURI", any>>>() => ModelAlgebraRefined1<"JsonSchemaURI", Env> & ModelAlgebraNewtype1<"JsonSchemaURI", Env> & ModelAlgebraUnknown1<"JsonSchemaURI", Env> & ModelAlgebraPrimitive1<"JsonSchemaURI", Env> & ModelAlgebraIntersection1<"JsonSchemaURI", Env> & ModelAlgebraObject1<"JsonSchemaURI", Env> & ModelAlgebraTaggedUnions1<"JsonSchemaURI", Env> & ModelAlgebraRecursive1<"JsonSchemaURI", Env> & ModelAlgebraStrMap1<"JsonSchemaURI", Env> & ModelAlgebraSet1<"JsonSchemaURI", Env> & ModelAlgebraUnions1<"JsonSchemaURI", Env> = ...
```

Added in v0.0.1
