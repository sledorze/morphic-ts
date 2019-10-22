---
title: json-schema/json-schema.ts
nav_order: 88
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ArraySchema (interface)](#arrayschema-interface)
- [BooleanSchema (interface)](#booleanschema-interface)
- [DescriptionSchema (interface)](#descriptionschema-interface)
- [EnumSchema (interface)](#enumschema-interface)
- [NumberSchema (interface)](#numberschema-interface)
- [ObjectSchema (interface)](#objectschema-interface)
- [Ref (interface)](#ref-interface)
- [StringSchema (interface)](#stringschema-interface)
- [JSONSchema (type alias)](#jsonschema-type-alias)
- [SubSchema (type alias)](#subschema-type-alias)
- [itemsOfArrayLense (constant)](#itemsofarraylense-constant)
- [jsonToObjectSchemaPrism (constant)](#jsontoobjectschemaprism-constant)
- [objectSchemaOnRequired (constant)](#objectschemaonrequired-constant)
- [ArraySchema (function)](#arrayschema-function)
- [BooleanSchema (function)](#booleanschema-function)
- [EnumSchema (function)](#enumschema-function)
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
- [refOf (function)](#refof-function)

---

# ArraySchema (interface)

**Signature**

```ts
export interface ArraySchema extends DescriptionSchema {
  type: 'array'
  items: SubSchema | SubSchema[]
}
```

# BooleanSchema (interface)

**Signature**

```ts
export interface BooleanSchema extends DescriptionSchema {
  type: 'boolean'
}
```

# DescriptionSchema (interface)

**Signature**

```ts
export interface DescriptionSchema {
  description?: string
}
```

# EnumSchema (interface)

**Signature**

```ts
export interface EnumSchema extends DescriptionSchema {
  type: 'string'
  enum: string[]
}
```

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

# Ref (interface)

**Signature**

```ts
export interface Ref {
  $ref: string
}
```

# StringSchema (interface)

**Signature**

```ts
export interface StringSchema extends DescriptionSchema {
  type: 'string'
  minLength?: number
  maxLength?: number
  format?: 'date-time' | 'date' | 'password' | 'byte' | 'binary'
}
```

# JSONSchema (type alias)

**Signature**

```ts
export type JSONSchema =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | ArraySchema
  | ObjectSchema
  | (EnumSchema & { $schema?: string })
```

# SubSchema (type alias)

**Signature**

```ts
export type SubSchema = StringSchema | NumberSchema | BooleanSchema | ArraySchema | ObjectSchema | EnumSchema | Ref
```

# itemsOfArrayLense (constant)

**Signature**

```ts
export const itemsOfArrayLense = ...
```

# jsonToObjectSchemaPrism (constant)

**Signature**

```ts
export const jsonToObjectSchemaPrism = ...
```

# objectSchemaOnRequired (constant)

**Signature**

```ts
export const objectSchemaOnRequired = ...
```

# ArraySchema (function)

**Signature**

```ts
export const ArraySchema = (p: { items: SubSchema; description?: string }) => ...
```

# BooleanSchema (function)

**Signature**

```ts
export const BooleanSchema = (p: { description?: string }) => ...
```

# EnumSchema (function)

**Signature**

```ts
export const EnumSchema = (p: { enum: string[]; description?: string }): EnumSchema => ...
```

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

# Ref (function)

**Signature**

```ts
export const Ref = ($ref: string) => ...
```

# StringSchema (function)

**Signature**

```ts
export const StringSchema = (x?: {
  minLength?: number
  maxLength?: number
  format?: 'date-time' | 'date' | 'password' | 'byte' | 'binary'
  description?: string
}): StringSchema => ...
```

# SubSchema (function)

**Signature**

```ts
export const SubSchema = (x: SubSchema) => ...
```

# definitionPath (function)

**Signature**

```ts
export const definitionPath = (prefix: string) => (schema: JSONSchema | SubSchema) => ...
```

# getOneOf (function)

**Signature**

```ts
export const getOneOf = (obj: ObjectSchema): Option<(ObjectSchema | Ref)[]> => ...
```

# isBooleanSchema (function)

**Signature**

```ts
export const isBooleanSchema = (schema: JSONSchema): schema is BooleanSchema => ...
```

# isEnumSchema (function)

**Signature**

```ts
export const isEnumSchema = (x: JSONSchema): x is EnumSchema => ...
```

# isNamed (function)

**Signature**

```ts
export const isNamed = (schema: JSONSchema | SubSchema) => ...
```

# isNotPrimitive (function)

**Signature**

```ts
export const isNotPrimitive = (schema: JSONSchema | SubSchema) => ...
```

# isNumberSchema (function)

**Signature**

```ts
export const isNumberSchema = (schema: JSONSchema): schema is NumberSchema => ...
```

# isObjectOrRef (function)

**Signature**

```ts
export const isObjectOrRef = (schema: JSONSchema | SubSchema): schema is Ref | ObjectSchema => ...
```

# isObjectSchema (function)

**Signature**

```ts
export const isObjectSchema = (x: JSONSchema): x is ObjectSchema => ...
```

# isPrimitive (function)

**Signature**

```ts
export const isPrimitive = (schema: JSONSchema | SubSchema): schema is StringSchema | NumberSchema | BooleanSchema => ...
```

# isStringSchema (function)

**Signature**

```ts
export const isStringSchema = (schema: JSONSchema): schema is StringSchema => ...
```

# isTypeArray (function)

**Signature**

```ts
export const isTypeArray = (schema: JSONSchema | SubSchema): schema is ArraySchema => ...
```

# isTypeObject (function)

**Signature**

```ts
export const isTypeObject = (schema: JSONSchema | SubSchema): schema is ObjectSchema => ...
```

# isTypeRef (function)

**Signature**

```ts
export const isTypeRef = (schema: JSONSchema | SubSchema): schema is Ref => ...
```

# refOf (function)

**Signature**

```ts
export const refOf = (prefix: string) => ...
```
