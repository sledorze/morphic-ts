---
title: json-schema/json-schema-ctors.ts
nav_order: 87
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [OptionalJSONSchema (interface)](#optionaljsonschema-interface)
- [makePartialOptionalJsonObject (constant)](#makepartialoptionaljsonobject-constant)
- [optionalJSONSchemaOnJson (constant)](#optionaljsonschemaonjson-constant)
- [ArrayTypeCtor (function)](#arraytypector-function)
- [BooleanTypeCtor (function)](#booleantypector-function)
- [IntersectionTypeCtor (function)](#intersectiontypector-function)
- [KeyofTypeCtor (function)](#keyoftypector-function)
- [LiteralTypeCtor (function)](#literaltypector-function)
- [NonEmptyArrayFromArrayTypeCtor (function)](#nonemptyarrayfromarraytypector-function)
- [NumberTypeCtor (function)](#numbertypector-function)
- [ObjectTypeCtor (function)](#objecttypector-function)
- [SetFromArrayTypeCtor (function)](#setfromarraytypector-function)
- [StrMapTypeCtor (function)](#strmaptypector-function)
- [StringTypeCtor (function)](#stringtypector-function)
- [UnionTypeCtor (function)](#uniontypector-function)
- [mergeObjects (function)](#mergeobjects-function)
- [notOptional (function)](#notoptional-function)
- [optional (function)](#optional-function)

---

# OptionalJSONSchema (interface)

**Signature**

```ts
export interface OptionalJSONSchema {
  json: js.JSONSchema
  optional: boolean
}
```

# makePartialOptionalJsonObject (constant)

**Signature**

```ts
export const makePartialOptionalJsonObject: Endomorphism<OptionalJSONSchema> = ...
```

# optionalJSONSchemaOnJson (constant)

**Signature**

```ts
export const optionalJSONSchemaOnJson = ...
```

# ArrayTypeCtor (function)

**Signature**

```ts
export const ArrayTypeCtor = (items: OptionalJSONSchema) => ...
```

# BooleanTypeCtor (function)

**Signature**

```ts
export const BooleanTypeCtor = () => ...
```

# IntersectionTypeCtor (function)

**Signature**

```ts
export const IntersectionTypeCtor = (types: OptionalJSONSchema[]) => ...
```

# KeyofTypeCtor (function)

**Signature**

```ts
export const KeyofTypeCtor = (p: { keys: string[] }) => ...
```

# LiteralTypeCtor (function)

**Signature**

```ts
export const LiteralTypeCtor = (value: string) => ...
```

# NonEmptyArrayFromArrayTypeCtor (function)

**Signature**

```ts
export const NonEmptyArrayFromArrayTypeCtor = (items: OptionalJSONSchema) => ...
```

# NumberTypeCtor (function)

**Signature**

```ts
export const NumberTypeCtor = () => ...
```

# ObjectTypeCtor (function)

**Signature**

```ts
export const ObjectTypeCtor = (isPartial: boolean, props: [string, OptionalJSONSchema][]): OptionalJSONSchema => ...
```

# SetFromArrayTypeCtor (function)

**Signature**

```ts
export const SetFromArrayTypeCtor = (items: OptionalJSONSchema) => ...
```

# StrMapTypeCtor (function)

**Signature**

```ts
export const StrMapTypeCtor = (items: OptionalJSONSchema) => ...
```

# StringTypeCtor (function)

**Signature**

```ts
export const StringTypeCtor = (extras?: { format?: 'date' | 'date-time'; enum?: string[] }) => ...
```

# UnionTypeCtor (function)

**Signature**

```ts
export const UnionTypeCtor = (types: OptionalJSONSchema[]) => ...
```

# mergeObjects (function)

**Signature**

```ts
export const mergeObjects = (a: js.ObjectSchema, b: js.ObjectSchema): js.ObjectSchema => ...
```

# notOptional (function)

**Signature**

```ts
export const notOptional = <T extends js.JSONSchema>(json: T): OptionalJSONSchema => ...
```

# optional (function)

**Signature**

```ts
export const optional = <T extends js.JSONSchema>(json: T): OptionalJSONSchema => ...
```
