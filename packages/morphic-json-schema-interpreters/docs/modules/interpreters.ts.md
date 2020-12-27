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
export const modelJsonSchemaInterpreter: <Env extends Partial<Readonly<Record<"JsonSchemaURI", any>>>>() => ModelAlgebraRefined<"JsonSchemaURI", Env> & ModelAlgebraNewtype<"JsonSchemaURI", Env> & ModelAlgebraUnknown<"JsonSchemaURI", Env> & ModelAlgebraPrimitive<"JsonSchemaURI", Env> & ModelAlgebraIntersection<"JsonSchemaURI", Env> & ModelAlgebraObject<"JsonSchemaURI", Env> & ModelAlgebraTaggedUnions<"JsonSchemaURI", Env> & ModelAlgebraRecursive<"JsonSchemaURI", Env> & ModelAlgebraStrMap<"JsonSchemaURI", Env> & ModelAlgebraSet<"JsonSchemaURI", Env> & ModelAlgebraUnions<"JsonSchemaURI", Env> = ...
```

Added in v0.0.1
