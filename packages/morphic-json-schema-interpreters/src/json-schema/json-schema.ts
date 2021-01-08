import type { Array } from '@morphic-ts/model-algebras/lib/types'
import type { Option } from 'fp-ts/Option'
import { fromNullable } from 'fp-ts/Option'
import { Lens, Prism } from 'monocle-ts'
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
export interface EnumStringSchema extends DescriptionSchema {
  type: 'string'
  enum: Array<string>
}
/**
 *  @since 0.0.1
 */
export const EnumStringSchema = (p: { enum: Array<string>; description?: string }): EnumStringSchema => ({
  type: 'string',
  ...p
})

/**
 *  @since 0.0.1
 */
export interface EnumNumberSchema extends DescriptionSchema {
  type: 'number'
  enum: Array<number>
}
/**
 *  @since 0.0.1
 */
export const EnumNumberSchema = (p: { enum: Array<number>; description?: string }): EnumNumberSchema => ({
  type: 'number',
  ...p
})

/**
 *  @since 0.0.1
 */
export const isEnumSchema = (x: JSONSchema): x is EnumStringSchema | EnumNumberSchema =>
  (x.type === 'string' || x.type === 'number') && Array.isArray((x as EnumStringSchema | EnumNumberSchema).enum)

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
  items: SubSchema | Array<SubSchema>
}
/**
 *  @since 0.0.1
 */
export const ArraySchema = (p: {
  items: SubSchema | Array<SubSchema>
  description?: string
  minItems?: number
  maxItems?: number
}) => ({
  type: 'array' as const,
  ...p
})

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
  required?: Array<string>
  properties?: Record<string, SubSchema>
  additionalProperties?: SubSchema
  oneOf?: Array<ObjectSchema | Ref>
}
/**
 *  @since 0.0.1
 */
export const objectSchemaOnRequired = Lens.fromProp<ObjectSchema>()('required')
/**
 *  @since 0.0.1
 */
export const ObjectSchema = (x: {
  description?: string
  required?: Array<string>
  properties?: Record<string, SubSchema>
  oneOf?: Array<ObjectSchema | Ref>
}): ObjectSchema => ({ type: 'object' as const, ...x })

/**
 *  @since 0.0.1
 */
export const isObjectSchema = (x: SubSchema): x is ObjectSchema => 'type' in x && x.type === 'object'
/**
 *  @since 0.0.1
 */
export const jsonToObjectSchemaPrism = Prism.fromPredicate(isObjectSchema)

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
  | ((EnumStringSchema | EnumNumberSchema) & { $schema?: string })

/**
 *  @since 0.0.1
 */
export const isTypeObject = (schema: JSONSchema | SubSchema): schema is ObjectSchema =>
  // eslint-disable-next-line no-prototype-builtins
  !isTypeRef(schema) && (schema.type === 'object' || schema.hasOwnProperty('properties'))

/**
 *  @since 0.0.1
 */
export const getOneOf = (obj: ObjectSchema): Option<Array<ObjectSchema | Ref>> => fromNullable(obj.oneOf)

/**
 *  @since 0.0.1
 */
export const isTypeArray = (schema: JSONSchema | SubSchema): schema is ArraySchema =>
  !isTypeRef(schema) && schema.type !== undefined && schema.type === 'array'
/**
 *  @since 0.0.1
 */
// eslint-disable-next-line no-prototype-builtins
export const isTypeRef = (schema: JSONSchema | SubSchema): schema is Ref => schema.hasOwnProperty('$ref')
/**
 *  @since 0.0.1
 */
// eslint-disable-next-line no-prototype-builtins
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
