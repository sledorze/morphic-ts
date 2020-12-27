import type { Create } from '@morphic-ts/io-ts-interpreters/lib/create'
import type { NamedSchemas } from '@morphic-ts/json-schema-interpreters/lib/index'
import type { JSONSchema } from '@morphic-ts/json-schema-interpreters/lib/json-schema/json-schema'
import type { JsonSchemaError } from '@morphic-ts/json-schema-interpreters/lib/json-schema/json-schema-ctors'
import type { Arbitrary } from 'fast-check'
import type { Either } from 'fp-ts/Either'
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import type { Type } from 'io-ts'

/**
 *  @since 0.0.1
 */
export const BASTJInterpreterURI = 'BASTJInterpreterURI' as const
/**
 *  @since 0.0.1
 */
export type BASTJInterpreterURI = typeof BASTJInterpreterURI

interface BASTJInterpreter<E, A> {
  build: (a: A) => A
  arb: Arbitrary<A>
  strictType: Type<A, E, unknown>
  type: Type<A, E, unknown>
  jsonSchema: Either<NonEmptyArray<JsonSchemaError>, [JSONSchema, NamedSchemas]>
  create: Create<A>
}

declare module '@morphic-ts/summoners/lib/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [BASTJInterpreterURI]: BASTJInterpreter<E, A>
  }
}
