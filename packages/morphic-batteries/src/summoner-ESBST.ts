import { identity } from 'fp-ts/lib/function'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'

import { modelEqInterpreter, EqURI } from '@morphic-ts/eq-interpreters/lib/interpreters'
import { modelShowInterpreter, ShowURI } from '@morphic-ts/show-interpreters/lib/interpreters'
import {
  modelIoTsNonStrictInterpreter,
  IoTsURI,
  modelIoTsStrictInterpreter
} from '@morphic-ts/io-ts-interpreters/lib/interpreters'

import * as U from './usage'

import { ProgramNoUnionURI } from './program-no-union'
import { ESBSTInterpreterURI } from './interpreters-ESBST'
import { AnyConfigEnv, ExtractEnv, SummonerOps } from './usage/summoner'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { makeCreate } from './create'

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramNoUnionURI, ESBSTInterpreterURI> {}
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
export interface Summoner<R> extends U.Summoners<ProgramNoUnionURI, ESBSTInterpreterURI, R> {
  <L, A>(F: U.ProgramType<R, L, A>[ProgramNoUnionURI]): M<R, L, A>
}

export const summonFor: <R extends AnyEnv = {}>(
  env: ExtractEnv<R, EqURI | ShowURI | IoTsURI>
) => SummonerOps<Summoner<R>> = <R extends AnyConfigEnv = {}>(env: ExtractEnv<R, EqURI | ShowURI | IoTsURI>) =>
  U.makeSummoner<Summoner<R>>(cacheUnaryFunction, program => {
    const type = program(modelIoTsNonStrictInterpreter<NonNullable<R>>())(env).type
    return {
      build: identity,
      eq: program(modelEqInterpreter<NonNullable<R>>())(env).eq,
      show: program(modelShowInterpreter<NonNullable<R>>())(env).show,
      strictType: program(modelIoTsStrictInterpreter<NonNullable<R>>())(env).type,
      type: program(modelIoTsNonStrictInterpreter<NonNullable<R>>())(env).type,
      create: makeCreate(type)
    }
  })
