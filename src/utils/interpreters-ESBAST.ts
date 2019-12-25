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

import { ProgramInterpreter1, Materialized1 } from '../usage/materializer'
import { ProgramNoUnionURI } from './program-no-union'

import { either, Either } from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { JsonSchemaError } from '../interpreters/json-schema'
import { Builder } from '../interpreters/builder'
import { Program } from '../usage/programs-hkt'
import { Summoners } from '../usage/summoner'

interface ESBASTJInterpreter<E, A> {
  build: Builder<A>
  eq: Eq<A>
  show: Show<A>
  arb: Arbitrary<A>
  strictType: Type<A, unknown, unknown>
  type: Type<A, unknown, unknown>
  jsonSchema: Either<NonEmptyArray<JsonSchemaError>, JSONSchema>
}

export type ESBASTJInterpreterURI = 'ESBASTJInterpreter'

export const ESBASTJInterpreter: ProgramInterpreter1<ProgramNoUnionURI, ESBASTJInterpreterURI> = program => ({
  build: program(builderInterpreter).build,
  eq: program(eqInterpreter).eq,
  show: program(showInterpreter).show,
  arb: program(fastCheckInterpreter).arb,
  strictType: program(ioTsStrict).type,
  type: program(ioTsNonStrict).type,
  jsonSchema: either.map(program(jsonSchemaInterpreter).schema, s => s.json)
})

declare module '../usage/interpreters-hkt' {
  interface Interpreter1<E, A> {
    ESBASTJInterpreter: ESBASTJInterpreter<E, A>
  }
}
declare module '../usage/programs-hkt' {
  interface ProgramNoUnionInterpreters {
    ESBASTJInterpreter: Summoner
  }
}

/** Type level override to keep Morph type name short */
export interface M<L, A> extends Materialized1<L, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}
export interface UM<A> extends Materialized1<unknown, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}

export interface MorphAs {
  <L, A>(F: Program<L, A>[ProgramNoUnionURI]): M<L, A>
}
export interface MorphAsA {
  <A>(): <L>(F: Program<L, A>[ProgramNoUnionURI]) => M<L, A>
}
export interface MorphAsL {
  <L>(): <A>(F: Program<L, A>[ProgramNoUnionURI]) => M<L, A>
}
export interface Morph {
  <A>(F: Program<unknown, A>[ProgramNoUnionURI]): UM<A>
}

export interface Summoner extends Summoners<ProgramNoUnionURI, ESBASTJInterpreterURI> {
  summonAs: MorphAs
  summonAsA: MorphAsA
  summonAsL: MorphAsL
  summon: Morph
}
