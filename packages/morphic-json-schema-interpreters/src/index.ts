import { OptionalJSONSchema, JsonSchemaError } from './json-schema/json-schema-ctors'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { JSONSchema } from './json-schema/json-schema'
import { genConfig } from '@morphic-ts/common/lib/core'

/**
 *  @since 0.0.1
 */
export const JsonSchemaURI = Symbol()
/**
 *  @since 0.0.1
 */
export type JsonSchemaURI = typeof JsonSchemaURI

/**
 *  @since 0.0.1
 */
export interface NamedSchemas {
  [k: string]: JSONSchema
}
/**
 *  @since 0.0.1
 */
export type JsonSchemaResult<T> = SE.StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, T>

/**
 *  @since 0.0.1
 */
export class JsonSchema<A> {
  _A!: A
  _URI!: JsonSchemaURI
  constructor(public schema: JsonSchemaResult<OptionalJSONSchema>) {}
}

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<A> {
    [JsonSchemaURI]: JsonSchema<A>
  }
}

/**
 *  @since 0.0.1
 */
export const jsonSchemaConfig = genConfig(JsonSchemaURI)
