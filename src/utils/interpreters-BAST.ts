import { builderInterpreter } from '../../src/interpreters/builder/interpreters'

import { Arbitrary } from 'fast-check/*'
import { fastCheckInterpreter } from '../../src/interpreters/fast-check/interpreters'

import { Type } from 'io-ts'
import { ioTsNonStrict } from '../../src/interpreters/io-ts/interpreters'
import { ioTsStringNonStrict } from '../../src/interpreters/io-ts-string/interpreters'

import { JSONSchema } from '../../src/json-schema/json-schema'
import { jsonSchemaInterpreter } from '../../src/interpreters/json-schema/interpreters'

import { ProgramInterpreter } from '../../src/usage/materializer'
import { ProgramUnionURI } from './program'

interface BASTJInterpreter<E, A> {
  arb: Arbitrary<A>
  strictType: Type<A, unknown, unknown>
  type: Type<A, E, unknown>
  jsonSchema: JSONSchema
}

export type BASTJInterpreterURI = 'BASTJInterpreter'

declare module '../../src/usage/interpreters-hkt' {
  interface Interpreters<E, A> {
    BASTJInterpreter: BASTJInterpreter<E, A>
  }
}
export const BASTJInterpreter: ProgramInterpreter<ProgramUnionURI, BASTJInterpreterURI> = program => ({
  build: program(builderInterpreter).build,
  arb: program(fastCheckInterpreter).arb,
  strictType: program(ioTsNonStrict).type,
  type: program(ioTsStringNonStrict).type,
  jsonSchema: program(jsonSchemaInterpreter).schema.json
})
