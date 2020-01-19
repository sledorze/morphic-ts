import { OptionalJSONSchema, makeOptional, JsonSchemaError } from '../../json-schema/json-schema-ctors'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import * as SE from '../../StateEither'
import { SubSchema, JSONSchema, isTypeRef } from '../../json-schema/json-schema'
import { record, nonEmptyArray, array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import { tuple } from 'fp-ts/lib/function'

export const JsonSchemaURI = Symbol()
export type JsonSchemaURI = typeof JsonSchemaURI

export type JsonSchemaResult<T> = SE.StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, T>

export const addSchema = (name: string) => (schema: JSONSchema): JsonSchemaResult<void> =>
  SE.modify<NamedSchemas>(record.insertAt(name, schema))

export const getSchema = (name: string): JsonSchemaResult<O.Option<JSONSchema>> =>
  SE.gets((s: NamedSchemas) => record.lookup(name, s))

export const getSchemaStrict = (name: string): JsonSchemaResult<JSONSchema> =>
  pipe(
    getSchema(name),
    SE.chain<NamedSchemas, NonEmptyArray<JsonSchemaError>, O.Option<JSONSchema>, JSONSchema>(
      SE.fromOption(() => nonEmptyArray.of(JsonSchemaError('e')))
    )
  )

export const arrayTraverseStateEither = array.array.traverse(SE.stateEither)

export const resolveRefs = (
  v: OptionalJSONSchema[]
): SE.StateEither<NamedSchemas, nonEmptyArray.NonEmptyArray<JsonSchemaError>, OptionalJSONSchema[]> =>
  arrayTraverseStateEither(v, resolveRef)

export const resolveRef = (
  o: OptionalJSONSchema
): SE.StateEither<NamedSchemas, nonEmptyArray.NonEmptyArray<JsonSchemaError>, OptionalJSONSchema> =>
  isTypeRef(o.json)
    ? SE.stateEither.map(getSchemaStrict(o.json.$ref), j => makeOptional(o.optional, j))
    : SE.stateEither.of(makeOptional(o.optional, o.json))

export const resolveRefJsonSchema = (
  s: SubSchema
): SE.StateEither<NamedSchemas, nonEmptyArray.NonEmptyArray<JsonSchemaError>, JSONSchema> =>
  isTypeRef(s) ? getSchemaStrict(s.$ref) : SE.stateEither.of(s)

export const resolveSubSchema = (ns: NamedSchemas) => (ref: SubSchema): O.Option<JSONSchema> =>
  isTypeRef(ref) ? record.lookup(ref.$ref, ns) : O.some(ref)

export const resolveSchema = ([s, dic]: [OptionalJSONSchema, NamedSchemas]) =>
  pipe(
    resolveSubSchema(dic)(s.json),
    O.map(j => tuple(j, dic)),
    E.fromOption(() => nonEmptyArray.of(JsonSchemaError('cannot resolve ref ')))
  )

export type NamedSchemas = { [k: string]: JSONSchema }

export class JsonSchema<A> {
  constructor(public schema: JsonSchemaResult<OptionalJSONSchema>) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    [JsonSchemaURI]: JsonSchema<A>
  }
}
