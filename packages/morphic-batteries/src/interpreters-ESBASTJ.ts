import { Eq } from 'fp-ts/lib/Eq'
import { Show } from 'fp-ts/lib/Show'
import { Arbitrary } from 'fast-check/*'
import { Type } from 'io-ts'

import { JSONSchema } from '@morphic-ts/json-schema-interpreters/lib/json-schema/json-schema'
import * as E from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { NamedSchemas } from '@morphic-ts/json-schema-interpreters/lib/index'
import { JsonSchemaError } from '@morphic-ts/json-schema-interpreters/lib/json-schema/json-schema-ctors'

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
  jsonSchema: E.Either<NonEmptyArray<JsonSchemaError>, [JSONSchema, NamedSchemas]>
}

declare module './usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [ESBASTJInterpreterURI]: ESBASTJInterpreter<E, A>
  }
}
