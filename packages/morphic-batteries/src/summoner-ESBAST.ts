import { identity } from 'fp-ts/lib/function'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'

import { modelEqInterpreter } from '@morphic-ts/eq-interpreters/lib/interpreters'
import { modelShowInterpreter } from '@morphic-ts/show-interpreters/lib/interpreters'
import { modelFastCheckInterpreter } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import { modelIoTsNonStrictInterpreter } from '@morphic-ts/io-ts-interpreters/lib/interpreters'

import * as U from './usage'

import { ProgramNoUnionURI } from './program-no-union'
import { ESBASTInterpreterURI } from './interpreters-ESBAST'

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<L, A> extends U.Materialized<L, A, ProgramNoUnionURI, ESBASTInterpreterURI> {}
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
export interface Summoner extends U.Summoners<ProgramNoUnionURI, ESBASTInterpreterURI> {
  <L, A>(F: U.ProgramType<L, A>[ProgramNoUnionURI]): M<L, A>
}

export const { summon, tagged } = U.defineSummoner<Summoner>(cacheUnaryFunction, program => ({
  build: identity,
  eq: program(modelEqInterpreter).eq,
  show: program(modelShowInterpreter).show,
  arb: program(modelFastCheckInterpreter).arb,
  strictType: program(modelIoTsNonStrictInterpreter).type,
  type: program(modelIoTsNonStrictInterpreter).type
}))
