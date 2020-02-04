---
title: utils.ts
nav_order: 18
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [arrayTraverseStateEither (constant)](#arraytraversestateeither-constant)
- [addSchema (function)](#addschema-function)
- [getSchema (function)](#getschema-function)
- [getSchemaStrict (function)](#getschemastrict-function)
- [registerSchema (function)](#registerschema-function)
- [resolveRef (function)](#resolveref-function)
- [resolveRefJsonSchema (function)](#resolverefjsonschema-function)
- [resolveSchema (function)](#resolveschema-function)
- [resolveSubSchema (function)](#resolvesubschema-function)

---

# arrayTraverseStateEither (constant)

**Signature**

```ts
export const arrayTraverseStateEither: <A, R, E, B>(ta: A[], f: (a: A) => SE.StateEither<R, E, B>) => SE.StateEither<R, E, B[]> = ...
```

Added in v0.0.1

# addSchema (function)

**Signature**

```ts
export const addSchema = (name: string) => (schema: JSONSchema): JsonSchemaResult<void> => ...
```

Added in v0.0.1

# getSchema (function)

**Signature**

```ts
export const getSchema = (name: string): JsonSchemaResult<O.Option<JSONSchema>> =>
  SE.gets((s: NamedSchemas) => ...
```

Added in v0.0.1

# getSchemaStrict (function)

**Signature**

```ts
export const getSchemaStrict = (name: string): JsonSchemaResult<JSONSchema> =>
  pipe(
    getSchema(name),
    SE.chain<NamedSchemas, NonEmptyArray<JsonSchemaError>, O.Option<JSONSchema>, JSONSchema>(
      SE.fromOption(() => ...
```

Added in v0.0.1

# registerSchema (function)

**Signature**

```ts
export const registerSchema = (name: string) => (
  v: OptionalJSONSchema
): SE.StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, OptionalJSONSchema> =>
  isTypeRef(v.json)
    ? SE.stateEither.of(v)
    : pipe(
        addSchema(name)(v.json),
        SE.map(_ => ...
```

Added in v0.0.1

# resolveRef (function)

**Signature**

```ts
export const resolveRef = ({
  json,
  optional
}: OptionalJSONSchema): SE.StateEither<
  NamedSchemas,
  nonEmptyArray.NonEmptyArray<JsonSchemaError>,
  OptionalJSONSchema
> => ...
```

Added in v0.0.1

# resolveRefJsonSchema (function)

**Signature**

```ts
export const resolveRefJsonSchema = (
  s: SubSchema
): SE.StateEither<NamedSchemas, nonEmptyArray.NonEmptyArray<JsonSchemaError>, JSONSchema> => ...
```

Added in v0.0.1

# resolveSchema (function)

**Signature**

```ts
export const resolveSchema = ([{ json }, dic]: [OptionalJSONSchema, NamedSchemas]) =>
  pipe(
    resolveSubSchema(dic, json),
    O.map(j => tuple(j, dic)),
    E.fromOption(() => ...
```

Added in v0.0.1

# resolveSubSchema (function)

**Signature**

```ts
export const resolveSubSchema = (ns: NamedSchemas, ref: SubSchema): O.Option<JSONSchema> => ...
```

Added in v0.0.1
