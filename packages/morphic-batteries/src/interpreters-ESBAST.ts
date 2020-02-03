import { Eq } from 'fp-ts/lib/Eq'
import { modelEqInterpreter } from '@sledorze/morphic-eq-interpreters/lib/interpreters'

import { Show } from 'fp-ts/lib/Show'
import { modelShowInterpreter } from '@sledorze/morphic-show-interpreters/lib/interpreters'

import { Arbitrary } from 'fast-check/*'
import { modelFastCheckInterpreter } from '@sledorze/morphic-fastcheck-interpreters/lib/interpreters'

import { Type } from 'io-ts'

import { JSONSchema } from '@sledorze/morphic-json-schema-interpreters/lib/json-schema/json-schema'
import { modelJsonSchemaInterpreter } from '@sledorze/morphic-json-schema-interpreters/lib/interpreters'

import { ProgramNoUnionURI } from './program-no-union'

import * as E from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { NamedSchemas } from '@sledorze/morphic-json-schema-interpreters/lib/index'
import { pipe } from 'fp-ts/lib/pipeable'
import { JsonSchemaError } from '@sledorze/morphic-json-schema-interpreters/lib/json-schema/json-schema-ctors'
import { identity } from 'fp-ts/lib/function'
import { resolveSchema } from '@sledorze/morphic-json-schema-interpreters/lib/utils'
import { modelIoTsNonStrictInterpreter } from '@sledorze/morphic-io-ts-interpreters/lib/interpreters'
import { ProgramInterpreter, Materialized } from './usage/materializer'
import { interpretable } from './usage/programs-infer'
import { ProgramType } from './usage/ProgramType'
import { Summoners } from './usage/summoner'

interface ESBASTJInterpreter<E, A> {
  build: (a: A) => A
  eq: Eq<A>
  show: Show<A>
  arb: Arbitrary<A>
  strictType: Type<A, E, unknown>
  type: Type<A, E, unknown>
  jsonSchema: E.Either<NonEmptyArray<JsonSchemaError>, [JSONSchema, NamedSchemas]>
}

export const ESBASTJInterpreterURI = Symbol()
export type ESBASTJInterpreterURI = typeof ESBASTJInterpreterURI

export const ESBASTJInterpreter: ProgramInterpreter<ProgramNoUnionURI, ESBASTJInterpreterURI> = _program => {
  const program = interpretable(_program)
  return {
    build: identity,
    eq: program(modelEqInterpreter).eq,
    show: program(modelShowInterpreter).show,
    arb: program(modelFastCheckInterpreter).arb,
    strictType: program(modelIoTsNonStrictInterpreter).type,
    type: program(modelIoTsNonStrictInterpreter).type,
    jsonSchema: pipe(program(modelJsonSchemaInterpreter).schema({}), E.chain(resolveSchema))
  }
}

declare module './usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [ESBASTJInterpreterURI]: ESBASTJInterpreter<E, A>
  }
}
declare module './usage/ProgramType' {
  interface ProgramNoUnionInterpreters {
    [ESBASTJInterpreterURI]: Summoner
  }
}

/** Type level override to keep Morph type name short */
export interface M<L, A> extends Materialized<L, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}
export interface UM<A> extends Materialized<unknown, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}

export const AsOpaque = <E, A>(x: M<E, A>): M<E, A> => x
export const AsUOpaque = <A>(x: UM<A>): UM<A> => x

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
