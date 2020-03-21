import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'
import { makeSummoner } from './usage/summoner'
import { makeTagged } from './usage/tagged-union'

import { modelEqInterpreter } from '@morphic-ts/eq-interpreters/lib/interpreters'

import { modelShowInterpreter } from '@morphic-ts/show-interpreters/lib/interpreters'
import { modelFastCheckInterpreter } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import { identity } from 'fp-ts/lib/function'
import { modelIoTsNonStrictInterpreter } from '@morphic-ts/io-ts-interpreters/lib/interpreters'
import { ProgramInterpreter, Materialized } from './usage/materializer'
import { interpretable } from './usage/programs-infer'
import { ProgramType } from './usage/ProgramType'
import { Summoners } from './usage/summoner'
import { ProgramNoUnionURI } from './program-no-union'
import { ESBASTInterpreterURI } from './interpreters-ESBAST'

declare module './usage/ProgramType' {
  interface ProgramTInterpreters {
    [ESBASTInterpreterURI]: Summoners<ProgramNoUnionURI, ESBASTInterpreterURI>
  }
}

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<L, A> extends Materialized<L, A, ProgramNoUnionURI, ESBASTInterpreterURI> {}
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
export interface Summoner {
  <L, A>(F: ProgramType<L, A>[ProgramNoUnionURI]): M<L, A>
}

export const summon = makeSummoner<ProgramInterpreter<ProgramNoUnionURI, ESBASTInterpreterURI>>(
  cacheUnaryFunction,
  _program => {
    const program = interpretable(_program)
    return {
      build: identity,
      eq: program(modelEqInterpreter).eq,
      show: program(modelShowInterpreter).show,
      arb: program(modelFastCheckInterpreter).arb,
      strictType: program(modelIoTsNonStrictInterpreter).type,
      type: program(modelIoTsNonStrictInterpreter).type
    }
  }
) as Summoner
export const tagged = makeTagged(summon)
