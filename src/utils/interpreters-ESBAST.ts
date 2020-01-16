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

import { Materialized, ProgramInterpreter } from '../usage/materializer'
import { ProgramNoUnionURI } from './program-no-union'

import { either, Either } from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { JsonSchemaError, NamedSchemas } from '../interpreters/json-schema'
import { Builder } from '../interpreters/builder'
import { ProgramType, interpretable } from '../usage/programs-hkt'
import { Summoners } from '../usage/summoner'
import { tuple } from 'fp-ts/lib/function'

interface ESBASTJInterpreter<E, A> {
  build: Builder<A>
  eq: Eq<A>
  show: Show<A>
  arb: Arbitrary<A>
  strictType: Type<A, unknown, unknown>
  type: Type<A, unknown, unknown>
  jsonSchema: Either<NonEmptyArray<JsonSchemaError>, [JSONSchema, NamedSchemas]>
}

export const ESBASTJInterpreterURI = Symbol()
export type ESBASTJInterpreterURI = typeof ESBASTJInterpreterURI

export const ESBASTJInterpreter: ProgramInterpreter<ProgramNoUnionURI, ESBASTJInterpreterURI> = _program => {
  const program = interpretable(_program)
  return {
    build: program(builderInterpreter).build,
    eq: program(eqInterpreter).eq,
    show: program(showInterpreter).show,
    arb: program(fastCheckInterpreter).arb,
    strictType: program(ioTsStrict).type,
    type: program(ioTsNonStrict).type,
    jsonSchema: either.map(program(jsonSchemaInterpreter).schema({}), ([s, dic]) => tuple(s.json, dic))
  }
}

declare module '../usage/interpreters-hkt' {
  interface InterpreterResult<E, A> {
    [ESBASTJInterpreterURI]: ESBASTJInterpreter<E, A>
  }
}
declare module '../usage/programs-hkt' {
  interface ProgramNoUnionInterpreters {
    [ESBASTJInterpreterURI]: Summoner
  }
}

/** Type level override to keep Morph type name short */
export interface M<L, A> extends Materialized<L, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}
export interface UM<A> extends Materialized<unknown, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}

export interface MorphAs {
  <L, A>(F: ProgramType<L, A>[ProgramNoUnionURI]): M<L, A>
}
export interface MorphAsA {
  <A>(): <L>(F: ProgramType<L, A>[ProgramNoUnionURI]) => M<L, A>
}
export interface MorphAsL {
  <L>(): <A>(F: ProgramType<L, A>[ProgramNoUnionURI]) => M<L, A>
}
export interface Morph {
  <A>(F: ProgramType<unknown, A>[ProgramNoUnionURI]): UM<A>
}

export interface Summoner extends Summoners<ProgramNoUnionURI, ESBASTJInterpreterURI> {
  summonAs: MorphAs
  summonAsA: MorphAsA
  summonAsL: MorphAsL
  summon: Morph
}
