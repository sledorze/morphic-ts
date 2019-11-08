import { Eq } from 'fp-ts/lib/Eq'
import { eqInterpreter } from '../../src/interpreters/eq/interpreters'

import { Show } from 'fp-ts/lib/Show'
import { showInterpreter } from '../../src/interpreters/show/interpreters'

import { builderInterpreter } from '../../src/interpreters/builder/interpreters'

import { Arbitrary } from 'fast-check/*'
import { fastCheckInterpreter } from '../../src/interpreters/fast-check/interpreters'

import { Type } from 'io-ts'
import { ioTsNonStrict } from '../../src/interpreters/io-ts/interpreters'
import { ioTsStringNonStrict } from '../../src/interpreters/io-ts-string/interpreters'

import { JSONSchema } from '../../src/json-schema/json-schema'
import { jsonSchemaInterpreter } from '../../src/interpreters/json-schema/interpreters'

import { ProgramInterpreter } from '../../src/usage/materializer'
import { ProgramNoUnionURI } from './program-no-union'

interface ESBASTJInterpreter<E, A> {
  eq: Eq<A>
  show: Show<A>
  arb: Arbitrary<A>
  strictType: Type<A, unknown, unknown>
  type: Type<A, E, unknown>
  jsonSchema: JSONSchema
}

export type ESBASTJInterpreterURI = 'ESBASTJInterpreter'

declare module '../../src/usage/interpreters-hkt' {
  interface Interpreters<E, A> {
    ESBASTJInterpreter: ESBASTJInterpreter<E, A>
  }
}
export const ESBASTJInterpreter: ProgramInterpreter<ProgramNoUnionURI, ESBASTJInterpreterURI> = program => ({
  eq: program(eqInterpreter).eq,
  show: program(showInterpreter).show,
  build: program(builderInterpreter).build,
  arb: program(fastCheckInterpreter).arb,
  strictType: program(ioTsNonStrict).type(),
  type: program(ioTsStringNonStrict).type(),
  jsonSchema: program(jsonSchemaInterpreter).schema().json
})
