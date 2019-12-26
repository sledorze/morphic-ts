import { builderInterpreter } from '../interpreters/builder/interpreters'
import { builderInterpreter as algebraInterp } from '../interpreters/algebra/interpreters'

import { Arbitrary } from 'fast-check/*'
import { fastCheckInterpreter } from '../interpreters/fast-check/interpreters'

import { Type } from 'io-ts'
import { ioTsStrict, ioTsNonStrict } from '../interpreters/io-ts/interpreters'

import { JSONSchema } from '../json-schema/json-schema'
import { jsonSchemaInterpreter } from '../interpreters/json-schema/interpreters'

import { ProgramUnionURI } from './program'
import { either, Either } from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { JsonSchemaError } from '../interpreters/json-schema'
import { Builder } from '../interpreters/builder'
import { Summoners } from '../usage/summoner'
import { Program, interpretable } from '../usage/programs-hkt'
import { ProgramInterpreter, Materialized } from '../usage/materializer'

interface BASTJInterpreter<E, A> {
  build: Builder<A>
  arb: Arbitrary<A>
  strictType: Type<A, unknown, unknown>
  type: Type<A, unknown, unknown>
  jsonSchema: Either<NonEmptyArray<JsonSchemaError>, JSONSchema>
}

export type BASTJInterpreterURI = 'BASTJInterpreter'

export const BASTJInterpreter: ProgramInterpreter<ProgramUnionURI, BASTJInterpreterURI> = _program => {
  const program = interpretable(_program)
  return {
    build: program(builderInterpreter).build,
    arb: program(fastCheckInterpreter).arb,
    strictType: program(ioTsStrict).type,
    type: program(ioTsNonStrict).type,
    jsonSchema: either.map(program(jsonSchemaInterpreter).schema, s => s.json),
    algebra: program(algebraInterp).build
  }
}

declare module '../../src/usage/interpreters-hkt' {
  interface Interpreter<E, A> {
    BASTJInterpreter: BASTJInterpreter<E, A>
  }
}
declare module '../usage/programs-hkt' {
  interface ProgramUnionInterpreters {
    BASTJInterpreter: Summoner
  }
}

/** Type level override to keep Morph type name short */
export interface M<L, A> extends Materialized<L, A, ProgramUnionURI, BASTJInterpreterURI> {}
export interface UM<A> extends Materialized<unknown, A, ProgramUnionURI, BASTJInterpreterURI> {}

export interface MorphAs {
  <L, A>(F: Program<L, A>[ProgramUnionURI]): M<L, A>
}
export interface MorphAsA {
  <A>(): <L>(F: Program<L, A>[ProgramUnionURI]) => M<L, A>
}
export interface MorphAsL {
  <L>(): <A>(F: Program<L, A>[ProgramUnionURI]) => M<L, A>
}
export interface Morph {
  <A>(F: Program<unknown, A>[ProgramUnionURI]): UM<A>
}

export interface Summoner extends Summoners<ProgramUnionURI, BASTJInterpreterURI> {
  summonAs: MorphAs
  summonAsA: MorphAsA
  summonAsL: MorphAsL
  summon: Morph
}
