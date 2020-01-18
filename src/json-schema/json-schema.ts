import * as m from 'monocle-ts'
import { fromNullable, Option } from 'fp-ts/lib/Option'
export interface DescriptionSchema {
  description?: string
}
export interface StringSchema extends DescriptionSchema {
  type: 'string'
  minLength?: number
  maxLength?: number
  format?: 'date-time' | 'date' | 'password' | 'byte' | 'binary'
}
export const StringSchema = (x?: {
  minLength?: number
  maxLength?: number
  format?: 'date-time' | 'date' | 'password' | 'byte' | 'binary'
  description?: string
}): StringSchema => ({ type: 'string', ...(x === undefined ? {} : x) })

export interface EnumSchema extends DescriptionSchema {
  type: 'string'
  enum: string[]
}
export const EnumSchema = (p: { enum: string[]; description?: string }): EnumSchema => ({
  type: 'string',
  ...p
})

export const isEnumSchema = (x: JSONSchema): x is EnumSchema =>
  x.type === 'string' && Array.isArray((x as EnumSchema).enum)

export interface NumberSchema extends DescriptionSchema {
  type: 'number'
  multipleOf?: number
  minimum?: number
  exclusiveMinimum?: boolean
  maximum?: number
  exclusiveMaximum?: boolean
}
export const NumberSchema = (x?: {
  multipleOf?: number
  minimum?: number
  exclusiveMinimum?: boolean
  maximum?: number
  exclusiveMaximum?: boolean
  description?: string
}): NumberSchema => ({ type: 'number', ...(x === undefined ? {} : x) })

export interface BooleanSchema extends DescriptionSchema {
  type: 'boolean'
}
export const BooleanSchema = (p: { description?: string }) => ({ type: 'boolean', ...p })

export interface ArraySchema extends DescriptionSchema {
  type: 'array'
  items: SubSchema | SubSchema[]
}
export const ArraySchema = (p: { items: SubSchema; description?: string }) => ({
  type: 'array' as 'array',
  ...p
})
export const itemsOfArrayLense = m.Lens.fromProp<ArraySchema>()('items')

export interface Ref {
  $ref: string
}
export const Ref = ($ref: string) => ({ $ref })

export interface ObjectSchema extends DescriptionSchema {
  type?: 'object'
  description?: string
  required?: string[]
  properties?: Record<string, SubSchema>
  additionalProperties?: SubSchema
  oneOf?: (ObjectSchema | Ref)[]
}
export const objectSchemaOnRequired = m.Lens.fromProp<ObjectSchema>()('required')
export const ObjectSchema = (x: {
  description?: string
  required?: string[]
  properties?: Record<string, SubSchema>
  oneOf?: (ObjectSchema | Ref)[]
}): ObjectSchema => ({ type: 'object' as 'object', ...x })

export const isObjectSchema = (x: SubSchema): x is ObjectSchema => 'type' in x && x.type === 'object'
export const jsonToObjectSchemaPrism = m.Prism.fromPredicate(isObjectSchema)

export type SubSchema = JSONSchema | Ref
export const SubSchema = (x: SubSchema) => x

export type JSONSchema =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | ArraySchema
  | ObjectSchema
  | (EnumSchema & { $schema?: string })

export const isTypeObject = (schema: JSONSchema | SubSchema): schema is ObjectSchema =>
  !isTypeRef(schema) && (schema.type === 'object' || schema.hasOwnProperty('properties'))

export const getOneOf = (obj: ObjectSchema): Option<(ObjectSchema | Ref)[]> => fromNullable(obj.oneOf)

export const isTypeArray = (schema: JSONSchema | SubSchema): schema is ArraySchema =>
  !isTypeRef(schema) && schema.type !== undefined && schema.type === 'array'
export const isTypeRef = (schema: JSONSchema | SubSchema): schema is Ref => schema.hasOwnProperty('$ref')
export const isnotTypeRef = (schema: JSONSchema | SubSchema): schema is JSONSchema => !schema.hasOwnProperty('$ref')

export const isNotPrimitive = (schema: JSONSchema | SubSchema) =>
  isTypeObject(schema) || isTypeArray(schema) || isTypeRef(schema)

export const isStringSchema = (schema: JSONSchema): schema is StringSchema => schema.type === 'string'
export const isNumberSchema = (schema: JSONSchema): schema is NumberSchema => schema.type === 'number'
export const isBooleanSchema = (schema: JSONSchema): schema is BooleanSchema => schema.type === 'boolean'

export const isPrimitive = (schema: JSONSchema | SubSchema): schema is StringSchema | NumberSchema | BooleanSchema =>
  !isTypeRef(schema) && (isStringSchema(schema) || isNumberSchema(schema) || isBooleanSchema(schema))

export const isObjectOrRef = (schema: JSONSchema | SubSchema): schema is Ref | ObjectSchema =>
  isTypeRef(schema) || isObjectSchema(schema)

export const isNamed = (schema: JSONSchema | SubSchema) => !isTypeRef(schema) && schema.description !== undefined

export const definitionPath = (prefix: string) => (schema: JSONSchema | SubSchema) =>
  isTypeRef(schema) ? schema.$ref : `${prefix}/${schema.description}`

export const refOf = (prefix: string) => {
  const prefixed = definitionPath(prefix)
  return (schema: JSONSchema | SubSchema): Ref => ({
    $ref: prefixed(schema)
  })
}
