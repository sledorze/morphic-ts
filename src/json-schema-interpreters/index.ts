import { OptionalJSONSchema, JsonSchemaError } from '../json-schema/json-schema-ctors'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import * as SE from './StateEither'
import { JSONSchema } from '../json-schema/json-schema'

export const JsonSchemaURI = Symbol()
export type JsonSchemaURI = typeof JsonSchemaURI

export type NamedSchemas = { [k: string]: JSONSchema }
export type JsonSchemaResult<T> = SE.StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, T>

export class JsonSchema<A> {
  constructor(public schema: JsonSchemaResult<OptionalJSONSchema>) {}
}

declare module '../common/HKT' {
  interface URItoKind<A> {
    [JsonSchemaURI]: JsonSchema<A>
  }
}
