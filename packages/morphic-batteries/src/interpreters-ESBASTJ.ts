import type { Create } from '@morphic-ts/io-ts-interpreters/lib/create'
import type { NamedSchemas } from '@morphic-ts/json-schema-interpreters/lib/index'
import type { JSONSchema } from '@morphic-ts/json-schema-interpreters/lib/json-schema/json-schema'
import type { JsonSchemaError } from '@morphic-ts/json-schema-interpreters/lib/json-schema/json-schema-ctors'
import type { Arbitrary } from 'fast-check'
import type { Either } from 'fp-ts/Either'
import type { Eq } from 'fp-ts/Eq'
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import type { Show } from 'fp-ts/Show'
import type { Type } from 'io-ts'

/**
 *  @since 0.0.1
 */
export const ESBASTJInterpreterURI = 'ESBASTJInterpreterURI' as const
/**
 *  @since 0.0.1
 */
export type ESBASTJInterpreterURI = typeof ESBASTJInterpreterURI

interface ESBASTJInterpreter<E, A> {
  build: (a: A) => A
  eq: Eq<A>
  show: Show<A>
  arb: Arbitrary<A>
  strictType: Type<A, E, unknown>
  type: Type<A, E, unknown>
  jsonSchema: Either<NonEmptyArray<JsonSchemaError>, [JSONSchema, NamedSchemas]>
  create: Create<A>
}

declare module '@morphic-ts/summoners/lib/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [ESBASTJInterpreterURI]: ESBASTJInterpreter<E, A>
  }
}
