import type { OptionalJSONSchema, JsonSchemaError } from './json-schema/json-schema-ctors'
import type { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import type { StateEither } from 'fp-ts-contrib/lib/StateEither'
import type { JSONSchema } from './json-schema/json-schema'

/**
 *  @since 0.0.1
 */
export const JsonSchemaURI = 'JsonSchemaURI' as const
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
export type JsonSchemaResult<T> = StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, T>

declare module '@morphic-ts/common/lib/config' {
  export interface ConfigType<E, A> {
    [JsonSchemaURI]: JsonSchemaResult<OptionalJSONSchema>
  }
}

/**
 *  @since 0.0.1
 */
export class JsonSchema<A> {
  _A!: A
  _URI!: JsonSchemaURI
  constructor(public schema: JsonSchemaResult<OptionalJSONSchema>) {}
}

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<R, A> {
    [JsonSchemaURI]: (r: R) => JsonSchema<A>
  }
}
