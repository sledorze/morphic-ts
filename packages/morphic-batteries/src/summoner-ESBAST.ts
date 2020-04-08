import { identity } from 'fp-ts/lib/function'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'

import { modelEqInterpreter } from '@morphic-ts/eq-interpreters/lib/interpreters'
import { modelShowInterpreter } from '@morphic-ts/show-interpreters/lib/interpreters'
import { modelFastCheckInterpreter } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import { modelIoTsNonStrictInterpreter } from '@morphic-ts/io-ts-interpreters/lib/interpreters'

import * as U from './usage'

import { ProgramNoUnionURI } from './program-no-union'
import { ESBASTInterpreterURI } from './interpreters-ESBAST'
import { Includes } from '@morphic-ts/common/lib/utils'

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramNoUnionURI, ESBASTInterpreterURI> {}
/**
 *  @since 0.0.1
 */
export interface UM<R, A> extends M<R, unknown, A> {}

/**
 *  @since 0.0.1
 */
export const AsOpaque = <R, E, A>(x: M<R, E, A>): M<R, E, A> => x
/**
 *  @since 0.0.1
 */
export const AsUOpaque = <R, A>(x: UM<R, A>): UM<R, A> => x

/**
 *  @since 0.0.1
 */
export interface Summoner<R> extends U.Summoners<ProgramNoUnionURI, ESBASTInterpreterURI, R> {
  <L, A, R2 extends R>(F: U.ProgramType<R2, L, A>[ProgramNoUnionURI]): Includes<R, R2, M<R, L, A>, 'deps error'>
}

export const summonFor = <R>(env: NonNullable<R>) =>
  U.makeSummoner<Summoner<R>>(cacheUnaryFunction, program => ({
    build: identity,
    eq: program(modelEqInterpreter)(env).eq,
    show: program(modelShowInterpreter)(env).show,
    arb: program(modelFastCheckInterpreter)(env).arb,
    strictType: program(modelIoTsNonStrictInterpreter)(env).type,
    type: program(modelIoTsNonStrictInterpreter)(env).type
  }))
