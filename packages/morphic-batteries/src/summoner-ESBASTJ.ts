import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'

import { modelEqInterpreter } from '@morphic-ts/eq-interpreters/lib/interpreters'

import { modelShowInterpreter } from '@morphic-ts/show-interpreters/lib/interpreters'

import { modelFastCheckInterpreter } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'

import { modelJsonSchemaInterpreter } from '@morphic-ts/json-schema-interpreters/lib/interpreters'

import { ProgramNoUnionURI } from './program-no-union'

import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { identity } from 'fp-ts/lib/function'
import { resolveSchema } from '@morphic-ts/json-schema-interpreters/lib/utils'
import { modelIoTsNonStrictInterpreter } from '@morphic-ts/io-ts-interpreters/lib/interpreters'

import * as U from './usage'

import { ESBASTJInterpreterURI } from './interpreters-ESBASTJ'

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<L, A> extends U.Materialized<L, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}
/**
 *  @since 0.0.1
 */
export interface UM<A> extends M<unknown, A> {}

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
export interface Summoner extends U.Summoners<ProgramNoUnionURI, ESBASTJInterpreterURI> {
  <L, A>(F: U.ProgramType<L, A>[ProgramNoUnionURI]): M<L, A>
}

/**
 *  @since 0.0.1
 */
export const { summon, tagged } = U.makeSummoner<Summoner>(cacheUnaryFunction, program => ({
  build: identity,
  eq: program(modelEqInterpreter).eq,
  show: program(modelShowInterpreter).show,
  arb: program(modelFastCheckInterpreter).arb,
  strictType: program(modelIoTsNonStrictInterpreter).type,
  type: program(modelIoTsNonStrictInterpreter).type,
  jsonSchema: pipe(program(modelJsonSchemaInterpreter).schema({}), E.chain(resolveSchema))
}))
