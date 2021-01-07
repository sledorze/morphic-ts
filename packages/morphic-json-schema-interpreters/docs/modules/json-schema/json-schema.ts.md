---
title: json-schema/json-schema.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Anything (interface)](#anything-interface)
- [ArraySchema (interface)](#arrayschema-interface)
- [BooleanSchema (interface)](#booleanschema-interface)
- [DescriptionSchema (interface)](#descriptionschema-interface)
- [EnumNumberSchema (interface)](#enumnumberschema-interface)
- [EnumStringSchema (interface)](#enumstringschema-interface)
- [NumberSchema (interface)](#numberschema-interface)
- [ObjectSchema (interface)](#objectschema-interface)
- [Ref (interface)](#ref-interface)
- [StringSchema (interface)](#stringschema-interface)
- [JSONSchema (type alias)](#jsonschema-type-alias)
- [SubSchema (type alias)](#subschema-type-alias)
- [Anything (constant)](#anything-constant)
- [jsonToObjectSchemaPrism (constant)](#jsontoobjectschemaprism-constant)
- [objectSchemaOnRequired (constant)](#objectschemaonrequired-constant)
- [ArraySchema (function)](#arrayschema-function)
- [BooleanSchema (function)](#booleanschema-function)
- [EnumNumberSchema (function)](#enumnumberschema-function)
- [EnumStringSchema (function)](#enumstringschema-function)
- [NumberSchema (function)](#numberschema-function)
- [ObjectSchema (function)](#objectschema-function)
- [Ref (function)](#ref-function)
- [StringSchema (function)](#stringschema-function)
- [SubSchema (function)](#subschema-function)
- [definitionPath (function)](#definitionpath-function)
- [getOneOf (function)](#getoneof-function)
- [isBooleanSchema (function)](#isbooleanschema-function)
- [isEnumSchema (function)](#isenumschema-function)
- [isNamed (function)](#isnamed-function)
- [isNotPrimitive (function)](#isnotprimitive-function)
- [isNumberSchema (function)](#isnumberschema-function)
- [isObjectOrRef (function)](#isobjectorref-function)
- [isObjectSchema (function)](#isobjectschema-function)
- [isPrimitive (function)](#isprimitive-function)
- [isStringSchema (function)](#isstringschema-function)
- [isTypeArray (function)](#istypearray-function)
- [isTypeObject (function)](#istypeobject-function)
- [isTypeRef (function)](#istyperef-function)
- [isnotTypeRef (function)](#isnottyperef-function)
- [refOf (function)](#refof-function)

---

# Anything (interface)

**Signature**

```ts
export interface Anything {}
```

Added in v0.0.1

# ArraySchema (interface)

**Signature**

```ts
export interface ArraySchema extends DescriptionSchema {
  type: 'array'
  items: SubSchema | SubSchema[]
}
```

Added in v0.0.1

# BooleanSchema (interface)

**Signature**

```ts
export interface BooleanSchema extends DescriptionSchema {
  type: 'boolean'
}
```

Added in v0.0.1

# DescriptionSchema (interface)

**Signature**

```ts
export interface DescriptionSchema {
  description?: string
}
```

Added in v0.0.1

# EnumNumberSchema (interface)

**Signature**

```ts
export interface EnumNumberSchema extends DescriptionSchema {
  type: 'number'
  enum: number[]
}
```

Added in v0.0.1

# EnumStringSchema (interface)

**Signature**

```ts
export interface EnumStringSchema extends DescriptionSchema {
  type: 'string'
  enum: string[]
}
```

Added in v0.0.1

# NumberSchema (interface)

**Signature**

```ts
export interface NumberSchema extends DescriptionSchema {
  type: 'number'
  multipleOf?: number
  minimum?: number
  exclusiveMinimum?: boolean
  maximum?: number
  exclusiveMaximum?: boolean
}
```

Added in v0.0.1

# ObjectSchema (interface)

**Signature**

```ts
export interface ObjectSchema extends DescriptionSchema {
  type?: 'object'
  description?: string
  required?: string[]
  properties?: Record<string, SubSchema>
  additionalProperties?: SubSchema
  oneOf?: (ObjectSchema | Ref)[]
}
```

Added in v0.0.1

# Ref (interface)

**Signature**

```ts
export interface Ref {
  $ref: string
}
```

Added in v0.0.1

# StringSchema (interface)

**Signature**

```ts
export interface StringSchema extends DescriptionSchema {
  type: 'string'
  minLength?: number
  maxLength?: number
  format?: 'date-time' | 'date' | 'password' | 'byte' | 'binary' | 'bigint' | 'uuid'
}
```

Added in v0.0.1

# JSONSchema (type alias)

**Signature**

```ts
export type JSONSchema =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | ArraySchema
  | ObjectSchema
  | ((EnumStringSchema | EnumNumberSchema) & { $schema?: string })
```

Added in v0.0.1

# SubSchema (type alias)

**Signature**

```ts
export type SubSchema = JSONSchema | Ref
```

Added in v0.0.1

# Anything (constant)

**Signature**

```ts
export const Anything: Anything = ...
```

Added in v0.0.1

# jsonToObjectSchemaPrism (constant)

**Signature**

```ts
export const jsonToObjectSchemaPrism: Prism<SubSchema, ObjectSchema> = ...
```

Added in v0.0.1

# objectSchemaOnRequired (constant)

**Signature**

```ts
export const objectSchemaOnRequired: Lens<ObjectSchema, string[]> = ...
```

Added in v0.0.1

# ArraySchema (function)

**Signature**

```ts
export const ArraySchema = (p: {
  items: SubSchema | SubSchema[]
  description?: string
  minItems?: number
  maxItems?: number
}) => ...
```

Added in v0.0.1

# BooleanSchema (function)

**Signature**

```ts
export const BooleanSchema = (p: { description?: string }) => ...
```

Added in v0.0.1

# EnumNumberSchema (function)

**Signature**

```ts
export const EnumNumberSchema = (p: { enum: number[]; description?: string }): EnumNumberSchema => ...
```

Added in v0.0.1

# EnumStringSchema (function)

**Signature**

```ts
export const EnumStringSchema = (p: { enum: string[]; description?: string }): EnumStringSchema => ...
```

Added in v0.0.1

# NumberSchema (function)

**Signature**

```ts
export const NumberSchema = (x?: {
  multipleOf?: number
  minimum?: number
  exclusiveMinimum?: boolean
  maximum?: number
  exclusiveMaximum?: boolean
  description?: string
}): NumberSchema => ...
```

Added in v0.0.1

# ObjectSchema (function)

**Signature**

```ts
export const ObjectSchema = (x: {
  description?: string
  required?: string[]
  properties?: Record<string, SubSchema>
  oneOf?: (ObjectSchema | Ref)[]
}): ObjectSchema => ...
```

Added in v0.0.1

# Ref (function)

**Signature**

```ts
export const Ref = ($ref: string): Ref => ...
```

Added in v0.0.1

# StringSchema (function)

**Signature**

```ts
export const StringSchema = (x?: {
  minLength?: number
  maxLength?: number
  format?: 'date-time' | 'date' | 'password' | 'byte' | 'binary' | 'bigint' | 'uuid'
  description?: string
}): StringSchema => ...
```

Added in v0.0.1

# SubSchema (function)

**Signature**

```ts
export const SubSchema = (x: SubSchema) => ...
```

Added in v0.0.1

# definitionPath (function)

**Signature**

```ts
export const definitionPath = (prefix: string) => (schema: JSONSchema | SubSchema) => ...
```

Added in v0.0.1

# getOneOf (function)

**Signature**

```ts
export const getOneOf = (obj: ObjectSchema): Option<(ObjectSchema | Ref)[]> => ...
```

Added in v0.0.1

# isBooleanSchema (function)

**Signature**

```ts
export const isBooleanSchema = (schema: JSONSchema): schema is BooleanSchema => ...
```

Added in v0.0.1

# isEnumSchema (function)

**Signature**

```ts
export const isEnumSchema = (x: JSONSchema): x is EnumStringSchema | EnumNumberSchema => ...
```

Added in v0.0.1

# isNamed (function)

**Signature**

```ts
export const isNamed = (schema: JSONSchema | SubSchema) => ...
```

Added in v0.0.1

# isNotPrimitive (function)

**Signature**

```ts
export const isNotPrimitive = (schema: JSONSchema | SubSchema) => ...
```

Added in v0.0.1

# isNumberSchema (function)

**Signature**

```ts
export const isNumberSchema = (schema: JSONSchema): schema is NumberSchema => ...
```

Added in v0.0.1

# isObjectOrRef (function)

**Signature**

```ts
export const isObjectOrRef = (schema: JSONSchema | SubSchema): schema is Ref | ObjectSchema => ...
```

Added in v0.0.1

# isObjectSchema (function)

**Signature**

```ts
export const isObjectSchema = (x: SubSchema): x is ObjectSchema => ...
```

Added in v0.0.1

# isPrimitive (function)

**Signature**

```ts
export const isPrimitive = (schema: JSONSchema | SubSchema): schema is StringSchema | NumberSchema | BooleanSchema => ...
```

Added in v0.0.1

# isStringSchema (function)

**Signature**

```ts
export const isStringSchema = (schema: JSONSchema): schema is StringSchema => ...
```

Added in v0.0.1

# isTypeArray (function)

**Signature**

```ts
export const isTypeArray = (schema: JSONSchema | SubSchema): schema is ArraySchema => ...
```

Added in v0.0.1

# isTypeObject (function)

**Signature**

```ts
export const isTypeObject = (schema: JSONSchema | SubSchema): schema is ObjectSchema => ...
```

Added in v0.0.1

# isTypeRef (function)

**Signature**

```ts
export const isTypeRef = (schema: JSONSchema | SubSchema): schema is Ref => ...
```

Added in v0.0.1

# isnotTypeRef (function)

**Signature**

```ts
export const isnotTypeRef = (schema: JSONSchema | SubSchema): schema is JSONSchema => ...
```

Added in v0.0.1

# refOf (function)

**Signature**

```ts
export const refOf = (prefix: string) => ...
```

Added in v0.0.1
