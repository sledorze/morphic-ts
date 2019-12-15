import { Eq } from 'fp-ts/lib/Eq'
import { eqInterpreter } from '../interpreters/eq/interpreters'

import { Show } from 'fp-ts/lib/Show'
import { showInterpreter } from '../interpreters/show/interpreters'

import { builderInterpreter } from '../interpreters/builder/interpreters'

import { Arbitrary } from 'fast-check/*'
import { fastCheckInterpreter } from '../interpreters/fast-check/interpreters'

import { Type } from 'io-ts'
import { ioTsStrict, ioTsNonStrict } from '../interpreters/io-ts/interpreters'

import { JSONSchema } from '../json-schema/json-schema'
import { jsonSchemaInterpreter } from '../interpreters/json-schema/interpreters'

import { ProgramInterpreterRaw1 } from '../usage/materializer'
import { ProgramNoUnionURI } from './program-no-union'

import { either, Either } from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { JsonSchemaError } from '../interpreters/json-schema'

interface ESBASTJInterpreter<E, A> {
  eq: Eq<A>
  show: Show<A>
  arb: Arbitrary<A>
  strictType: Type<A, unknown, unknown>
  type: Type<A, unknown, unknown>
  jsonSchema: Either<NonEmptyArray<JsonSchemaError>, JSONSchema>
}

export type ESBASTJInterpreterURI = 'ESBASTJInterpreter'

declare module '../../src/usage/interpreters-hkt' {
  interface Interpreter1<E, A> {
    ESBASTJInterpreter: ESBASTJInterpreter<E, A>
  }
}
export const ESBASTJInterpreter: ProgramInterpreterRaw1<ProgramNoUnionURI, ESBASTJInterpreterURI> = program => ({
  eq: program(eqInterpreter).eq,
  show: program(showInterpreter).show,
  build: program(builderInterpreter).build,
  arb: program(fastCheckInterpreter).arb,
  strictType: program(ioTsStrict).type,
  type: program(ioTsNonStrict).type,
  jsonSchema: either.map(program(jsonSchemaInterpreter).schema, s => s.json)
})
