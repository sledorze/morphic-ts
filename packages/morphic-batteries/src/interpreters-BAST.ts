import { Arbitrary } from 'fast-check/*'
import { modelFastCheckInterpreter } from 'morphic-fastcheck-interpreters/lib/interpreters'

import { Type } from 'io-ts'

import { JSONSchema } from 'morphic-json-schema-interpreters/lib/json-schema/json-schema'
import { modelJsonSchemaInterpreter } from 'morphic-json-schema-interpreters/lib/interpreters'

import { ProgramUnionURI } from './program'
import * as E from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { NamedSchemas } from 'morphic-json-schema-interpreters/lib/index'
import { pipe } from 'fp-ts/lib/pipeable'
import { JsonSchemaError } from 'morphic-json-schema-interpreters/lib/json-schema/json-schema-ctors'
import { identity } from 'fp-ts/lib/function'
import { resolveSchema } from 'morphic-json-schema-interpreters/lib/utils'
import {
  modelIoTsStrictInterpreter,
  modelIoTsNonStrictInterpreter
} from 'morphic-io-ts-interpreters/lib/interpreters'
import { ProgramInterpreter, Materialized } from './usage/materializer'
import { interpretable } from './usage/programs-infer'
import { ProgramType } from './usage/ProgramType'
import { Summoners } from './usage/summoner'

interface BASTJInterpreter<E, A> {
  build: (a: A) => A
  arb: Arbitrary<A>
  strictType: Type<A, E, unknown>
  type: Type<A, E, unknown>
  jsonSchema: E.Either<NonEmptyArray<JsonSchemaError>, [JSONSchema, NamedSchemas]>
}

/**
 *  @since 0.0.1
 */
export const BASTJInterpreterURI = Symbol()
/**
 *  @since 0.0.1
 */
export type BASTJInterpreterURI = typeof BASTJInterpreterURI

/**
 *  @since 0.0.1
 */
export const BASTJInterpreter: ProgramInterpreter<ProgramUnionURI, BASTJInterpreterURI> = _program => {
  const program = interpretable(_program)
  return {
    build: identity,
    arb: program(modelFastCheckInterpreter).arb,
    strictType: program(modelIoTsStrictInterpreter).type,
    type: program(modelIoTsNonStrictInterpreter).type,
    jsonSchema: pipe(program(modelJsonSchemaInterpreter).schema({}), E.chain(resolveSchema))
  }
}

declare module './usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [BASTJInterpreterURI]: BASTJInterpreter<E, A>
  }
}
declare module './usage/ProgramType' {
  interface ProgramUnionInterpreters {
    [BASTJInterpreterURI]: Summoner
  }
}

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<L, A> extends Materialized<L, A, ProgramUnionURI, BASTJInterpreterURI> {}
/**
 *  @since 0.0.1
 */
export interface UM<A> extends Materialized<unknown, A, ProgramUnionURI, BASTJInterpreterURI> {}

/**
 *  @since 0.0.1
 */
export const AsOpaque = <E, A>(x: M<E, A>): M<E, A> => x
/**
 *  @since 0.0.1
 */
export const AsUOpaque = <A>(x: UM<A>): UM<A> => x

/**
 *  @since 0.0.1
 */
export interface MorphAs {
  <L, A>(F: ProgramType<L, A>[ProgramUnionURI]): M<L, A>
}
/**
 *  @since 0.0.1
 */
export interface MorphAsA {
  <A>(): <L>(F: ProgramType<L, A>[ProgramUnionURI]) => M<L, A>
}
/**
 *  @since 0.0.1
 */
export interface MorphAsL {
  <L>(): <A>(F: ProgramType<L, A>[ProgramUnionURI]) => M<L, A>
}
/**
 *  @since 0.0.1
 */
export interface Morph {
  <A>(F: ProgramType<unknown, A>[ProgramUnionURI]): UM<A>
}

/**
 *  @since 0.0.1
 */
export interface Summoner extends Summoners<ProgramUnionURI, BASTJInterpreterURI> {
  summonAs: MorphAs
  summonAsA: MorphAsA
  summonAsL: MorphAsL
  summon: Morph
}
