---
title: utils.ts
nav_order: 19
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [arrayTraverseStateEither (constant)](#arraytraversestateeither-constant)
- [addNotOptionalNamedSchemaAndRef (function)](#addnotoptionalnamedschemaandref-function)
- [addSchema (function)](#addschema-function)
- [getName (function)](#getname-function)
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
export const arrayTraverseStateEither: <A, R, E, B>(ta: readonly A[], f: (a: A) => StateEither<R, E, B>) => StateEither<R, E, readonly B[]> = ...
```

Added in v0.0.1

# addNotOptionalNamedSchemaAndRef (function)

**Signature**

```ts
export const addNotOptionalNamedSchemaAndRef = (name: string, schema: JSONSchema) =>
  pipe(
    addSchema(name)(schema),
    SEmap(_ => ...
```

Added in v0.0.1

# addSchema (function)

**Signature**

```ts
export const addSchema = (name: string) => (schema: JSONSchema): JsonSchemaResult<void> => ...
```

Added in v0.0.1

# getName (function)

**Signature**

```ts
export const getName = <T>(
  config: Named<T> | undefined
): StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, string> => ...
```

Added in v0.0.1

# getSchema (function)

**Signature**

```ts
export const getSchema = (name: string): JsonSchemaResult<Option<JSONSchema>> =>
  gets((s: NamedSchemas) => ...
```

Added in v0.0.1

# getSchemaStrict (function)

**Signature**

```ts
export const getSchemaStrict = (name: string): JsonSchemaResult<JSONSchema> =>
  pipe(
    getSchema(name),
    chain<NamedSchemas, NonEmptyArray<JsonSchemaError>, Option<JSONSchema>, JSONSchema>(
      SEfromOption(() => ...
```

Added in v0.0.1

# registerSchema (function)

**Signature**

```ts
export const registerSchema = (name: string) => (
  v: OptionalJSONSchema
): StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, OptionalJSONSchema> =>
  isTypeRef(v.json)
    ? stateEither.of(v)
    : pipe(
        addSchema(name)(v.json),
        SEmap(_ => ...
```

Added in v0.0.1

# resolveRef (function)

**Signature**

```ts
export const resolveRef = ({
  json,
  optional
}: OptionalJSONSchema): StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, OptionalJSONSchema> => ...
```

Added in v0.0.1

# resolveRefJsonSchema (function)

**Signature**

```ts
export const resolveRefJsonSchema = (
  s: SubSchema
): StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, JSONSchema> => ...
```

Added in v0.0.1

# resolveSchema (function)

**Signature**

```ts
export const resolveSchema = ([{ json }, dic]: [OptionalJSONSchema, NamedSchemas]) =>
  pipe(
    resolveSubSchema(dic, json),
    map(j => tuple(j, dic)),
    fromOption(() => ...
```

Added in v0.0.1

# resolveSubSchema (function)

**Signature**

```ts
export const resolveSubSchema = (ns: NamedSchemas, ref: SubSchema): Option<JSONSchema> => ...
```

Added in v0.0.1
