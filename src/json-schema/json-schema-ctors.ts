import * as A from 'fp-ts/lib/Array'
import * as js from './json-schema'
import * as m from 'monocle-ts'
import { array, record } from 'fp-ts'
import { Endomorphism } from 'fp-ts/lib/function'
import { ordString } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import { left, right } from 'fp-ts/lib/Either'
import { JsonSchemaError } from '../interpreters/json-schema'

export interface OptionalJSONSchema {
  json: js.SubSchema
  optional: boolean
}

export const optionalJSONSchemaOnJson = m.Lens.fromProp<OptionalJSONSchema>()('json').asOptional()

export const notOptional = <T extends js.SubSchema>(json: T): OptionalJSONSchema => ({
  json,
  optional: false
})
export const optional = <T extends js.SubSchema>(json: T): OptionalJSONSchema => ({
  json,
  optional: true
})

export const makePartialOptionalJsonObject: Endomorphism<OptionalJSONSchema> = optionalJSONSchemaOnJson
  .composePrism(js.jsonToObjectSchemaPrism)
  .composeLens(js.objectSchemaOnRequired)
  .set([])

export const ArrayTypeCtor = (items: OptionalJSONSchema) =>
  items.optional
    ? left(A.cons(JsonSchemaErrors.ArrayConsumesNoOptional, []))
    : right(
        notOptional<js.ArraySchema>({
          type: 'array',
          items: items.json
        })
      )

// export const RecursiveTypeCtor = (items: (Ref: string) => OptionalJSONSchema) => {
//   if (items.optional === true) {
//     throw JsonSchemaError(`JSON Schema convertion cannot handle optional in Arrays.`)
//   }
//   return notOptional<js.ArraySchema>({
//     type: 'array',
//     items: items.json
//   })
// }

export const SetFromArrayTypeCtor = (items: OptionalJSONSchema) =>
  items.optional
    ? left(A.cons(JsonSchemaErrors.SetFromArrayTypeConsumesNoOptional, []))
    : right(
        notOptional<js.ArraySchema>({
          type: 'array',
          items: items.json
        })
      )

export const StrMapTypeCtor = (items: OptionalJSONSchema) =>
  items.optional
    ? left(A.cons(JsonSchemaErrors.SetFromArrayTypeConsumesNoOptional, []))
    : right(
        notOptional<js.ObjectSchema>({
          type: 'object',

          additionalProperties: items.json
        })
      )

export const NonEmptyArrayFromArrayTypeCtor = (items: OptionalJSONSchema) =>
  items.optional
    ? left(A.cons(JsonSchemaErrors.ArrayConsumesNoOptional, []))
    : right(
        notOptional<js.ArraySchema>({
          type: 'array',
          items: items.json
        })
      )

export const UnionTypeCtor = (types: OptionalJSONSchema[]) => {
  const oneOf: (js.ObjectSchema | js.Ref)[] = types.map(x => x.json).filter(js.isObjectSchema)
  return oneOf.length !== types.length
    ? left(A.cons(JsonSchemaErrors.UnionConsumesOnlyObject, []))
    : right(
        notOptional<js.ObjectSchema>({
          type: 'object',
          oneOf
        })
      )
}

export const IntersectionTypeCtor = (types: OptionalJSONSchema[]) => {
  const objects: js.ObjectSchema[] = types.map(x => x.json).filter(js.isObjectSchema)
  return objects.length !== types.length
    ? left(A.cons(JsonSchemaErrors.IntersectionConsumesOnlyObject, []))
    : right(
        notOptional<js.ObjectSchema>(
          objects.reduce(mergeObjects, {
            type: 'object' as 'object'
          })
        )
      )
}

export const KeyofTypeCtor = (p: { keys: string[] }) =>
  notOptional<js.EnumSchema>({
    type: 'string',
    enum: p.keys
  })

export const StringTypeCtor = (extras?: { format?: 'date' | 'date-time'; enum?: string[] }) =>
  notOptional<js.StringSchema>({
    type: 'string' as 'string',
    ...(extras !== undefined ? extras : {})
  })

export const NumberTypeCtor = () =>
  notOptional<js.NumberSchema>({
    type: 'number' as 'number'
  })

export const BooleanTypeCtor = () =>
  notOptional<js.BooleanSchema>({
    type: 'boolean' as 'boolean'
  })

export const LiteralTypeCtor = (value: string) =>
  notOptional<js.EnumSchema>({
    type: 'string',
    enum: [value]
  })

export const ObjectTypeCtor = (isPartial: boolean, props: [string, OptionalJSONSchema][]): OptionalJSONSchema => {
  const required = pipe(
    props,
    A.chain(([name, jsonOpt]) => (isPartial || jsonOpt.optional ? [] : [name])),
    A.sort(ordString)
  )

  const properties = pipe(
    record.fromFoldable({ concat: (fst: OptionalJSONSchema, _snd: OptionalJSONSchema) => fst }, array.array)(props),
    record.map(({ json }) => json)
  )

  const obj = { type: 'object', properties } as js.ObjectSchema
  return notOptional(required.length === 0 ? obj : { ...obj, required })
}

// Magma.. (Refactor)
export const mergeObjects = (a: js.ObjectSchema, b: js.ObjectSchema): js.ObjectSchema => {
  // tslint:disable-next-line: strict-boolean-expressions
  const oneOf = [...(a.oneOf || []), ...(b.oneOf || [])]
  const properties = {
    // tslint:disable-next-line: strict-boolean-expressions
    ...(a.properties || {}),
    // tslint:disable-next-line: strict-boolean-expressions
    ...(b.properties || {})
  }
  // tslint:disable-next-line: strict-boolean-expressions
  const required = [...(a.required || []), ...(b.required || [])]
  // tslint:disable-next-line: strict-boolean-expressions
  return Object.assign(
    {
      type: 'object',
      required
    },
    ...[
      // tslint:disable-next-line: strict-boolean-expressions
      required.length > 0 ? { required } : {},
      oneOf.length > 0 ? { oneOf } : {},
      Object.keys(properties).length > 0 ? { properties } : {}
    ]
  ) as js.ObjectSchema
}

const recordOfJsonSchemaError = <O extends Record<string, JsonSchemaError>>(o: O): O => o
export const JsonSchemaErrors = recordOfJsonSchemaError({
  IntersectionConsumesOnlyObject: JsonSchemaError(`JSON Schema Intersection conversion only support Object types`),
  UnionConsumesOnlyObject: JsonSchemaError(`JSON Schema Union conversion only support Object types`),
  SetFromArrayTypeConsumesNoOptional: JsonSchemaError(
    `JSON Schema convertion cannot handle optional in SetFromArrayType for type`
  ),
  ArrayConsumesNoOptional: JsonSchemaError(`JSON Schema convertion cannot handle optional in Non empty Arrays for type`)
})
