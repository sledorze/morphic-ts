import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'
import type { EqURI } from '@morphic-ts/eq-interpreters/lib/interpreters'
import { modelEqInterpreter } from '@morphic-ts/eq-interpreters/lib/interpreters'
import type { FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import { modelFastCheckInterpreter } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import type { IoTsURI } from '@morphic-ts/io-ts-interpreters/lib/interpreters'
import {
  modelIoTsNonStrictInterpreter,
  modelIoTsStrictInterpreter
} from '@morphic-ts/io-ts-interpreters/lib/interpreters'
import type { ShowURI } from '@morphic-ts/show-interpreters/lib/interpreters'
import { modelShowInterpreter } from '@morphic-ts/show-interpreters/lib/interpreters'
// eslint-disable-next-line import/no-duplicates
import type * as U from '@morphic-ts/summoners'
// eslint-disable-next-line import/no-duplicates
import type { AnyConfigEnv, ExtractEnv, SummonerOps } from '@morphic-ts/summoners'
import { makeSummoner } from '@morphic-ts/summoners'

import type { ESBASTInterpreterURI } from './interpreters-ESBAST'
import type { ProgramUnionURI } from './program'

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramUnionURI, ESBASTInterpreterURI> {}
/**
 *  @since 0.0.1
 */
export interface UM<R, A> extends M<R, {}, A> {}

/**
 *  @since 0.0.1
 */
export const AsOpaque = <E, A>() => <X extends M<any, E, A>>(x: X): M<X['_R'], E, A> => x
/**
 *  @since 0.0.1
 */
export const AsUOpaque = <A>() => <X extends UM<any, A>>(x: X): UM<X['_R'], A> => x

/**
 *  @since 0.0.1
 */
export interface Summoner<R> extends U.Summoners<ProgramUnionURI, ESBASTInterpreterURI, R> {
  <L, A>(F: U.ProgramType<R, L, A>[ProgramUnionURI]): M<R, L, A>
}

/**
 *  @since 0.0.1
 */
export const summonFor: <R extends AnyEnv = {}>(
  env: ExtractEnv<R, EqURI | ShowURI | IoTsURI | FastCheckURI>
) => SummonerOps<Summoner<R>> = <R extends AnyConfigEnv = {}>(
  env: ExtractEnv<R, EqURI | ShowURI | IoTsURI | FastCheckURI>
) =>
  makeSummoner<Summoner<R>>(cacheUnaryFunction, program => {
    const { create, type } = program(modelIoTsNonStrictInterpreter<NonNullable<R>>())(env)
    return {
      build: a => a,
      eq: program(modelEqInterpreter<NonNullable<R>>())(env).eq,
      show: program(modelShowInterpreter<NonNullable<R>>())(env).show,
      arb: program(modelFastCheckInterpreter<NonNullable<R>>())(env).arb,
      strictType: program(modelIoTsStrictInterpreter<NonNullable<R>>())(env).type,
      type,
      create
    }
  })
