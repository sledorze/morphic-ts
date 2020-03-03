---
title: hkt.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [NamedSchemas (interface)](#namedschemas-interface)
- [JsonSchemaResult (type alias)](#jsonschemaresult-type-alias)
- [JsonSchemaURI (type alias)](#jsonschemauri-type-alias)
- [JsonSchema (class)](#jsonschema-class)
- [JsonSchemaURI (constant)](#jsonschemauri-constant)

---

# NamedSchemas (interface)

**Signature**

```ts
export interface NamedSchemas {
  [k: string]: JSONSchema
}
```

Added in v0.0.1

# JsonSchemaResult (type alias)

**Signature**

```ts
export type JsonSchemaResult<T> = SE.StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, T>
```

Added in v0.0.1

# JsonSchemaURI (type alias)

**Signature**

```ts
export type JsonSchemaURI = typeof JsonSchemaURI
```

Added in v0.0.1

# JsonSchema (class)

**Signature**

```ts
export class JsonSchema<A> {
  constructor(public schema: JsonSchemaResult<OptionalJSONSchema>) { ... }
  ...
}
```

Added in v0.0.1

# JsonSchemaURI (constant)

**Signature**

```ts
export const JsonSchemaURI: "JsonSchemaURI" = ...
```

Added in v0.0.1
