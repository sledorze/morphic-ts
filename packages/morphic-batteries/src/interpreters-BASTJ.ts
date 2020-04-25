import { Arbitrary } from 'fast-check/*'
import { Type } from 'io-ts'
import { JSONSchema } from '@morphic-ts/json-schema-interpreters/lib/json-schema/json-schema'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { NamedSchemas } from '@morphic-ts/json-schema-interpreters/lib/index'
import { JsonSchemaError } from '@morphic-ts/json-schema-interpreters/lib/json-schema/json-schema-ctors'
import { Either } from 'fp-ts/lib/Either'
import { Create } from './create'

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

declare module './usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [BASTJInterpreterURI]: BASTJInterpreter<E, A>
  }
}
