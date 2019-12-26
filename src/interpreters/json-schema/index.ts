import { OptionalJSONSchema } from '../../json-schema/json-schema-ctors'
import { Either } from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

export const JsonSchemaURI = 'JsonSchema'
export type JsonSchemaURI = typeof JsonSchemaURI

export interface JsonSchemaError {
  msg: string
}
export const JsonSchemaError = (msg: string): JsonSchemaError => ({
  msg
})
export type Errors = NonEmptyArray<JsonSchemaError>
export type JsonSchemaResult<T> = Either<Errors, T>

export class JsonSchema<A> {
  constructor(public schema: JsonSchemaResult<OptionalJSONSchema>) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    [JsonSchemaURI]: JsonSchema<A>
  }
}
