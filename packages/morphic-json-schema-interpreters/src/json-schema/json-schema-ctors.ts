import type { Magma } from 'fp-ts/lib/Magma'
import type { Endomorphism } from 'fp-ts/lib/function'
import * as js from './json-schema'
import { Lens } from 'monocle-ts'
import { of } from 'fp-ts/lib/NonEmptyArray'
import { ordString } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import { left, right } from 'fp-ts/lib/Either'
import { array, chain, sort } from 'fp-ts/lib/Array'
import { map, fromFoldable } from 'fp-ts/lib/Record'

/**
 *  @since 0.0.1
 */
export interface JsonSchemaError {
  msg: string
}
/**
 *  @since 0.0.1
 */
export const JsonSchemaError = (msg: string): JsonSchemaError => ({
  msg
})

/**
 *  @since 0.0.1
 */
export interface OptionalJSONSchema {
  json: js.SubSchema
  optional: boolean
}

/**
 *  @since 0.0.1
 */
export const optionalJSONSchemaOnJson = Lens.fromProp<OptionalJSONSchema>()('json').asOptional()

/**
 *  @since 0.0.1
 */
export const makeOptional = (optional: boolean) => <T extends js.SubSchema>(json: T): OptionalJSONSchema => ({
  optional,
  json
})

/**
 *  @since 0.0.1
 */
export const notOptional = makeOptional(false)
/**
 *  @since 0.0.1
 */
export const optional = makeOptional(true)

/**
 *  @since 0.0.1
 */
export const makePartialOptionalJsonObject: Endomorphism<OptionalJSONSchema> = optionalJSONSchemaOnJson
  .composePrism(js.jsonToObjectSchemaPrism)
  .composeLens(js.objectSchemaOnRequired)
  .set([])

/**
 *  @since 0.0.1
 */
export const ArrayTypeCtor = ({
  schemas,
  ...rest
}: {
  schemas: OptionalJSONSchema | OptionalJSONSchema[]
  minItems?: number
  maxItems?: number
}) => {
  const schemasArr = Array.isArray(schemas) ? schemas : [schemas]
  const anyOptional = array.reduceRight(schemasArr, false, (a, b) => a.optional || b)
  const items = schemasArr.map(_ => _.json)
  return anyOptional
    ? left(of(JsonSchemaErrors.ArrayConsumesNoOptional))
    : right(
        notOptional<js.ArraySchema>({
          type: 'array',
          items: items.length === 1 ? items[0] : items,
          ...rest
        })
      )
}

/**
 *  @since 0.0.1
 */
export const SetFromArrayTypeCtor = ({ optional, json }: OptionalJSONSchema) =>
  optional
    ? left(of(JsonSchemaErrors.SetFromArrayTypeConsumesNoOptional))
    : right(
        notOptional<js.ArraySchema>({
          type: 'array',
          items: json
        })
      )

/**
 *  @since 0.0.1
 */
export const StrMapTypeCtor = ({ optional, json }: OptionalJSONSchema) =>
  optional
    ? left(of(JsonSchemaErrors.SetFromArrayTypeConsumesNoOptional))
    : right(
        notOptional<js.ObjectSchema>({
          type: 'object',
          additionalProperties: json
        })
      )

/**
 *  @since 0.0.1
 */
export const NonEmptyArrayFromArrayTypeCtor = ({ optional, json }: OptionalJSONSchema) =>
  optional
    ? left(of(JsonSchemaErrors.ArrayConsumesNoOptional))
    : right(
        notOptional<js.ArraySchema>({
          type: 'array',
          items: json
        })
      )

/**
 *  @since 0.0.1
 */
export const UnionTypeCtor = (types: OptionalJSONSchema[]) => {
  const oneOf: (js.ObjectSchema | js.Ref)[] = types.map(x => x.json).filter(js.isObjectOrRef)
  return oneOf.length !== types.length
    ? left(of(JsonSchemaErrors.UnionConsumesOnlyObject))
    : right(
        notOptional<js.ObjectSchema>({
          type: 'object',
          oneOf
        })
      )
}

/**
 *  @since 0.0.1
 */
export const IntersectionTypeCtor = (types: OptionalJSONSchema[]) => {
  const objects: js.ObjectSchema[] = types.map(x => x.json).filter(js.isObjectSchema)
  return objects.length !== types.length
    ? left(of(JsonSchemaErrors.IntersectionConsumesOnlyObject))
    : right(
        notOptional<js.ObjectSchema>(
          objects.reduce(magmaObjectSchema.concat, {
            type: 'object' as 'object'
          })
        )
      )
}

/**
 *  @since 0.0.1
 */
export const KeyofTypeCtor = (p: { keys: string[] }) =>
  notOptional<js.EnumSchema>({
    type: 'string',
    enum: p.keys
  })

/**
 *  @since 0.0.1
 */
export const AnythingTypeCtor = () => notOptional<js.Anything>({})

/**
 *  @since 0.0.1
 */
export const StringTypeCtor = (extras?: { format?: 'date' | 'date-time' | 'bigint' | 'uuid'; enum?: string[] }) =>
  notOptional<js.StringSchema>({
    type: 'string' as 'string',
    ...(extras !== undefined ? extras : {})
  })

/**
 *  @since 0.0.1
 */
export const NumberTypeCtor = () =>
  notOptional<js.NumberSchema>({
    type: 'number' as 'number'
  })

/**
 *  @since 0.0.1
 */
export const BooleanTypeCtor = () =>
  notOptional<js.BooleanSchema>({
    type: 'boolean' as 'boolean'
  })

/**
 *  @since 0.0.1
 */
export const LiteralTypeCtor = (value: string) =>
  notOptional<js.EnumSchema>({
    type: 'string',
    enum: [value]
  })

/**
 *  @since 0.0.1
 */
export const ObjectTypeCtor = (props: [string, OptionalJSONSchema][]): OptionalJSONSchema => {
  const required = pipe(
    props,
    chain(([name, jsonOpt]) => (jsonOpt.optional ? [] : [name])),
    sort(ordString)
  )

  const properties = pipe(
    fromFoldable({ concat: (fst: OptionalJSONSchema, _snd: OptionalJSONSchema) => fst }, array)(props),
    map(({ json }) => json)
  )

  const obj = { type: 'object', properties } as js.ObjectSchema
  return notOptional(required.length === 0 ? obj : { ...obj, required })
}

const magmaObjectSchema: Magma<js.ObjectSchema> = {
  concat: (a: js.ObjectSchema, b: js.ObjectSchema): js.ObjectSchema => {
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
}

const recordOfJsonSchemaError = <O extends Record<string, JsonSchemaError>>(o: O): O => o
/**
 *  @since 0.0.1
 */
export const JsonSchemaErrors = recordOfJsonSchemaError({
  IntersectionConsumesOnlyObject: JsonSchemaError(`JSON Schema Intersection conversion only support Object types`),
  UnionConsumesOnlyObject: JsonSchemaError(`JSON Schema Union conversion only support Object types`),
  SetFromArrayTypeConsumesNoOptional: JsonSchemaError(
    `JSON Schema convertion cannot handle optional in SetFromArrayType for type`
  ),
  ArrayConsumesNoOptional: JsonSchemaError(`JSON Schema convertion cannot handle optional in Non empty Arrays for type`)
})
