import * as A from 'fp-ts/lib/Array'
import * as js from './json-schema'
import * as m from 'monocle-ts'
import { array, record, nonEmptyArray as NEA } from 'fp-ts'
import { Endomorphism } from 'fp-ts/lib/function'
import { ordString } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import { left, right } from 'fp-ts/lib/Either'
import { Magma } from 'fp-ts/lib/Magma'

export interface JsonSchemaError {
  msg: string
}
export const JsonSchemaError = (msg: string): JsonSchemaError => ({
  msg
})

export interface OptionalJSONSchema {
  json: js.SubSchema
  optional: boolean
}

export const optionalJSONSchemaOnJson = m.Lens.fromProp<OptionalJSONSchema>()('json').asOptional()

export const makeOptional = (optional: boolean) => <T extends js.SubSchema>(json: T): OptionalJSONSchema => ({
  optional,
  json
})

export const notOptional = makeOptional(false)
export const optional = makeOptional(true)

export const makePartialOptionalJsonObject: Endomorphism<OptionalJSONSchema> = optionalJSONSchemaOnJson
  .composePrism(js.jsonToObjectSchemaPrism)
  .composeLens(js.objectSchemaOnRequired)
  .set([])

export const ArrayTypeCtor = ({
  schemas,
  ...rest
}: {
  schemas: OptionalJSONSchema | OptionalJSONSchema[]
  minItems?: number
  maxItems?: number
}) => {
  const schemasArr = Array.isArray(schemas) ? schemas : [schemas]
  const anyOptional = A.array.reduceRight(schemasArr, false, (a, b) => a.optional && b)
  const items = schemasArr.map(_ => _.json)
  return anyOptional
    ? left(NEA.of(JsonSchemaErrors.ArrayConsumesNoOptional))
    : right(
        notOptional<js.ArraySchema>({
          type: 'array',
          items: items.length === 1 ? items[0] : items,
          ...rest
        })
      )
}

export const SetFromArrayTypeCtor = ({ optional, json }: OptionalJSONSchema) =>
  optional
    ? left(NEA.of(JsonSchemaErrors.SetFromArrayTypeConsumesNoOptional))
    : right(
        notOptional<js.ArraySchema>({
          type: 'array',
          items: json
        })
      )

export const StrMapTypeCtor = ({ optional, json }: OptionalJSONSchema) =>
  optional
    ? left(NEA.of(JsonSchemaErrors.SetFromArrayTypeConsumesNoOptional))
    : right(
        notOptional<js.ObjectSchema>({
          type: 'object',
          additionalProperties: json
        })
      )

export const NonEmptyArrayFromArrayTypeCtor = ({ optional, json }: OptionalJSONSchema) =>
  optional
    ? left(NEA.of(JsonSchemaErrors.ArrayConsumesNoOptional))
    : right(
        notOptional<js.ArraySchema>({
          type: 'array',
          items: json
        })
      )

export const UnionTypeCtor = (types: OptionalJSONSchema[]) => {
  const oneOf: (js.ObjectSchema | js.Ref)[] = types.map(x => x.json).filter(js.isObjectOrRef)
  return oneOf.length !== types.length
    ? left(NEA.of(JsonSchemaErrors.UnionConsumesOnlyObject))
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
    ? left(NEA.of(JsonSchemaErrors.IntersectionConsumesOnlyObject))
    : right(
        notOptional<js.ObjectSchema>(
          objects.reduce(magmaObjectSchema.concat, {
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

export const AnythingTypeCtor = () => notOptional<js.Anything>({})

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
export const JsonSchemaErrors = recordOfJsonSchemaError({
  IntersectionConsumesOnlyObject: JsonSchemaError(`JSON Schema Intersection conversion only support Object types`),
  UnionConsumesOnlyObject: JsonSchemaError(`JSON Schema Union conversion only support Object types`),
  SetFromArrayTypeConsumesNoOptional: JsonSchemaError(
    `JSON Schema convertion cannot handle optional in SetFromArrayType for type`
  ),
  ArrayConsumesNoOptional: JsonSchemaError(`JSON Schema convertion cannot handle optional in Non empty Arrays for type`)
})
