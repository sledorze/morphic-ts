import * as m from 'monocle-ts'
import { fromNullable, Option } from 'fp-ts/lib/Option'
/**
 *  @since 0.0.1
 */
export interface DescriptionSchema {
  description?: string
}
/**
 *  @since 0.0.1
 */
export interface StringSchema extends DescriptionSchema {
  type: 'string'
  minLength?: number
  maxLength?: number
  format?: 'date-time' | 'date' | 'password' | 'byte' | 'binary' | 'bigint' | 'uuid'
}
/**
 *  @since 0.0.1
 */
export const StringSchema = (x?: {
  minLength?: number
  maxLength?: number
  format?: 'date-time' | 'date' | 'password' | 'byte' | 'binary' | 'bigint' | 'uuid'
  description?: string
}): StringSchema => ({ type: 'string', ...(x === undefined ? {} : x) })

/**
 *  @since 0.0.1
 */
export interface EnumSchema extends DescriptionSchema {
  type: 'string'
  enum: string[]
}
/**
 *  @since 0.0.1
 */
export const EnumSchema = (p: { enum: string[]; description?: string }): EnumSchema => ({
  type: 'string',
  ...p
})

/**
 *  @since 0.0.1
 */
export const isEnumSchema = (x: JSONSchema): x is EnumSchema =>
  x.type === 'string' && Array.isArray((x as EnumSchema).enum)

/**
 *  @since 0.0.1
 */
export interface NumberSchema extends DescriptionSchema {
  type: 'number'
  multipleOf?: number
  minimum?: number
  exclusiveMinimum?: boolean
  maximum?: number
  exclusiveMaximum?: boolean
}
/**
 *  @since 0.0.1
 */
export const NumberSchema = (x?: {
  multipleOf?: number
  minimum?: number
  exclusiveMinimum?: boolean
  maximum?: number
  exclusiveMaximum?: boolean
  description?: string
}): NumberSchema => ({ type: 'number', ...(x === undefined ? {} : x) })

/**
 *  @since 0.0.1
 */
export interface BooleanSchema extends DescriptionSchema {
  type: 'boolean'
}
/**
 *  @since 0.0.1
 */
export const BooleanSchema = (p: { description?: string }) => ({ type: 'boolean', ...p })

/**
 *  @since 0.0.1
 */
export interface ArraySchema extends DescriptionSchema {
  type: 'array'
  items: SubSchema | SubSchema[]
}
/**
 *  @since 0.0.1
 */
export const ArraySchema = (p: {
  items: SubSchema | SubSchema[]
  description?: string
  minItems?: number
  maxItems?: number
}) => ({
  type: 'array' as 'array',
  ...p
})
/**
 *  @since 0.0.1
 */
export const itemsOfArrayLense = m.Lens.fromProp<ArraySchema>()('items')

/**
 *  @since 0.0.1
 */
export interface Ref {
  $ref: string
}
/**
 *  @since 0.0.1
 */
export const Ref = ($ref: string): Ref => ({ $ref })

/**
 *  @since 0.0.1
 */
export interface ObjectSchema extends DescriptionSchema {
  type?: 'object'
  description?: string
  required?: string[]
  properties?: Record<string, SubSchema>
  additionalProperties?: SubSchema
  oneOf?: (ObjectSchema | Ref)[]
}
/**
 *  @since 0.0.1
 */
export const objectSchemaOnRequired = m.Lens.fromProp<ObjectSchema>()('required')
/**
 *  @since 0.0.1
 */
export const ObjectSchema = (x: {
  description?: string
  required?: string[]
  properties?: Record<string, SubSchema>
  oneOf?: (ObjectSchema | Ref)[]
}): ObjectSchema => ({ type: 'object' as 'object', ...x })

/**
 *  @since 0.0.1
 */
export const isObjectSchema = (x: SubSchema): x is ObjectSchema => 'type' in x && x.type === 'object'
/**
 *  @since 0.0.1
 */
export const jsonToObjectSchemaPrism = m.Prism.fromPredicate(isObjectSchema)

/**
 *  @since 0.0.1
 */
export type SubSchema = JSONSchema | Ref
/**
 *  @since 0.0.1
 */
export const SubSchema = (x: SubSchema) => x

/**
 *  @since 0.0.1
 */
export interface Anything {}
/**
 *  @since 0.0.1
 */
export const Anything: Anything = {}

/**
 *  @since 0.0.1
 */
export type JSONSchema =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | ArraySchema
  | ObjectSchema
  | (EnumSchema & { $schema?: string })

/**
 *  @since 0.0.1
 */
export const isTypeObject = (schema: JSONSchema | SubSchema): schema is ObjectSchema =>
  !isTypeRef(schema) && (schema.type === 'object' || schema.hasOwnProperty('properties'))

/**
 *  @since 0.0.1
 */
export const getOneOf = (obj: ObjectSchema): Option<(ObjectSchema | Ref)[]> => fromNullable(obj.oneOf)

/**
 *  @since 0.0.1
 */
export const isTypeArray = (schema: JSONSchema | SubSchema): schema is ArraySchema =>
  !isTypeRef(schema) && schema.type !== undefined && schema.type === 'array'
/**
 *  @since 0.0.1
 */
export const isTypeRef = (schema: JSONSchema | SubSchema): schema is Ref => schema.hasOwnProperty('$ref')
/**
 *  @since 0.0.1
 */
export const isnotTypeRef = (schema: JSONSchema | SubSchema): schema is JSONSchema => !schema.hasOwnProperty('$ref')

/**
 *  @since 0.0.1
 */
export const isNotPrimitive = (schema: JSONSchema | SubSchema) =>
  isTypeObject(schema) || isTypeArray(schema) || isTypeRef(schema)

/**
 *  @since 0.0.1
 */
export const isStringSchema = (schema: JSONSchema): schema is StringSchema => schema.type === 'string'
/**
 *  @since 0.0.1
 */
export const isNumberSchema = (schema: JSONSchema): schema is NumberSchema => schema.type === 'number'
/**
 *  @since 0.0.1
 */
export const isBooleanSchema = (schema: JSONSchema): schema is BooleanSchema => schema.type === 'boolean'

/**
 *  @since 0.0.1
 */
export const isPrimitive = (schema: JSONSchema | SubSchema): schema is StringSchema | NumberSchema | BooleanSchema =>
  !isTypeRef(schema) && (isStringSchema(schema) || isNumberSchema(schema) || isBooleanSchema(schema))

/**
 *  @since 0.0.1
 */
export const isObjectOrRef = (schema: JSONSchema | SubSchema): schema is Ref | ObjectSchema =>
  isTypeRef(schema) || isObjectSchema(schema)

/**
 *  @since 0.0.1
 */
export const isNamed = (schema: JSONSchema | SubSchema) => !isTypeRef(schema) && schema.description !== undefined

/**
 *  @since 0.0.1
 */
export const definitionPath = (prefix: string) => (schema: JSONSchema | SubSchema) =>
  isTypeRef(schema) ? schema.$ref : `${prefix}/${schema.description}`

/**
 *  @since 0.0.1
 */
export const refOf = (prefix: string) => {
  const prefixed = definitionPath(prefix)
  return (schema: JSONSchema | SubSchema): Ref => ({
    $ref: prefixed(schema)
  })
}
