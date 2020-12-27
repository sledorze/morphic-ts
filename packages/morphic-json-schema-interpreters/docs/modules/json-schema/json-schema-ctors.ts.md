---
title: json-schema/json-schema-ctors.ts
nav_order: 5
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [JsonSchemaError (interface)](#jsonschemaerror-interface)
- [OptionalJSONSchema (interface)](#optionaljsonschema-interface)
- [JsonSchemaErrors (constant)](#jsonschemaerrors-constant)
- [makePartialOptionalJsonObject (constant)](#makepartialoptionaljsonobject-constant)
- [notOptional (constant)](#notoptional-constant)
- [optional (constant)](#optional-constant)
- [optionalJSONSchemaOnJson (constant)](#optionaljsonschemaonjson-constant)
- [AnythingTypeCtor (function)](#anythingtypector-function)
- [ArrayTypeCtor (function)](#arraytypector-function)
- [BooleanTypeCtor (function)](#booleantypector-function)
- [IntersectionTypeCtor (function)](#intersectiontypector-function)
- [JsonSchemaError (function)](#jsonschemaerror-function)
- [KeyofTypeCtor (function)](#keyoftypector-function)
- [LiteralTypeCtor (function)](#literaltypector-function)
- [NonEmptyArrayFromArrayTypeCtor (function)](#nonemptyarrayfromarraytypector-function)
- [NumberTypeCtor (function)](#numbertypector-function)
- [ObjectTypeCtor (function)](#objecttypector-function)
- [SetFromArrayTypeCtor (function)](#setfromarraytypector-function)
- [StrMapTypeCtor (function)](#strmaptypector-function)
- [StringTypeCtor (function)](#stringtypector-function)
- [TagTypeCtor (function)](#tagtypector-function)
- [UnionTypeCtor (function)](#uniontypector-function)
- [makeOptional (function)](#makeoptional-function)

---

# JsonSchemaError (interface)

**Signature**

```ts
export interface JsonSchemaError {
  msg: string
}
```

Added in v0.0.1

# OptionalJSONSchema (interface)

**Signature**

```ts
export interface OptionalJSONSchema {
  json: js.SubSchema
  optional: boolean
}
```

Added in v0.0.1

# JsonSchemaErrors (constant)

**Signature**

```ts
export const JsonSchemaErrors: { IntersectionConsumesOnlyObject: JsonSchemaError; UnionConsumesOnlyObject: JsonSchemaError; SetFromArrayTypeConsumesNoOptional: JsonSchemaError; ArrayConsumesNoOptional: JsonSchemaError; } = ...
```

Added in v0.0.1

# makePartialOptionalJsonObject (constant)

**Signature**

```ts
export const makePartialOptionalJsonObject: Endomorphism<OptionalJSONSchema> = ...
```

Added in v0.0.1

# notOptional (constant)

**Signature**

```ts
export const notOptional: <T extends js.SubSchema>(json: T) => OptionalJSONSchema = ...
```

Added in v0.0.1

# optional (constant)

**Signature**

```ts
export const optional: <T extends js.SubSchema>(json: T) => OptionalJSONSchema = ...
```

Added in v0.0.1

# optionalJSONSchemaOnJson (constant)

**Signature**

```ts
export const optionalJSONSchemaOnJson: Optional<OptionalJSONSchema, js.SubSchema> = ...
```

Added in v0.0.1

# AnythingTypeCtor (function)

**Signature**

```ts
export const AnythingTypeCtor = () => ...
```

Added in v0.0.1

# ArrayTypeCtor (function)

**Signature**

```ts
export const ArrayTypeCtor = ({
  schemas,
  ...rest
}: {
  schemas: OptionalJSONSchema | OptionalJSONSchema[]
  minItems?: number
  maxItems?: number
}) => ...
```

Added in v0.0.1

# BooleanTypeCtor (function)

**Signature**

```ts
export const BooleanTypeCtor = () => ...
```

Added in v0.0.1

# IntersectionTypeCtor (function)

**Signature**

```ts
export const IntersectionTypeCtor = (types: OptionalJSONSchema[]) => ...
```

Added in v0.0.1

# JsonSchemaError (function)

**Signature**

```ts
export const JsonSchemaError = (msg: string): JsonSchemaError => ...
```

Added in v0.0.1

# KeyofTypeCtor (function)

**Signature**

```ts
export const KeyofTypeCtor = (p: { keys: string[] }) => ...
```

Added in v0.0.1

# LiteralTypeCtor (function)

**Signature**

```ts
export const LiteralTypeCtor = (value: string) => ...
```

Added in v0.0.1

# NonEmptyArrayFromArrayTypeCtor (function)

**Signature**

```ts
export const NonEmptyArrayFromArrayTypeCtor = ({ json, optional }: OptionalJSONSchema) => ...
```

Added in v0.0.1

# NumberTypeCtor (function)

**Signature**

```ts
export const NumberTypeCtor = () => ...
```

Added in v0.0.1

# ObjectTypeCtor (function)

**Signature**

```ts
export const ObjectTypeCtor = (props: [string, OptionalJSONSchema][]): OptionalJSONSchema => ...
```

Added in v0.0.1

# SetFromArrayTypeCtor (function)

**Signature**

```ts
export const SetFromArrayTypeCtor = ({ json, optional }: OptionalJSONSchema) => ...
```

Added in v0.0.1

# StrMapTypeCtor (function)

**Signature**

```ts
export const StrMapTypeCtor = ({ json, optional }: OptionalJSONSchema) => ...
```

Added in v0.0.1

# StringTypeCtor (function)

**Signature**

```ts
export const StringTypeCtor = (extras?: { format?: 'date' | 'date-time' | 'bigint' | 'uuid'; enum?: string[] }) => ...
```

Added in v0.0.1

# TagTypeCtor (function)

**Signature**

```ts
export const TagTypeCtor = (value: string) => ...
```

Added in v0.0.1

# UnionTypeCtor (function)

**Signature**

```ts
export const UnionTypeCtor = (types: OptionalJSONSchema[]) => ...
```

Added in v0.0.1

# makeOptional (function)

**Signature**

```ts
export const makeOptional = (optional: boolean) => <T extends js.SubSchema>(json: T): OptionalJSONSchema => ...
```

Added in v0.0.1
