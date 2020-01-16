import { OptionalJSONSchema } from '../../json-schema/json-schema-ctors'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { StateEither } from '../../StateEither'
import { JSONSchema } from '../../json-schema/json-schema'

export const JsonSchemaURI = Symbol()
export type JsonSchemaURI = typeof JsonSchemaURI

export interface JsonSchemaError {
  msg: string
}
export const JsonSchemaError = (msg: string): JsonSchemaError => ({
  msg
})
export type JsonSchemaResult<T> = StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, T>

export type NamedSchemas = { [k: string]: JSONSchema }

export class JsonSchema<A> {
  constructor(public schema: JsonSchemaResult<OptionalJSONSchema>) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    [JsonSchemaURI]: JsonSchema<A>
  }
}
