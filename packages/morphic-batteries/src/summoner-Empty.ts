import { identity } from 'fp-ts/lib/function'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'

import * as U from './usage'

import { EmptyInterpreterURI } from './interpreters-Empty'
import { ProgramNoUnionURI } from './program-no-union'

import { FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import { modelIoTsNonStrictInterpreter, IoTsURI } from '@morphic-ts/io-ts-interpreters/lib/interpreters'
import { JsonSchemaURI } from '@morphic-ts/json-schema-interpreters/lib'
import { AnyConfigEnv, ExtractEnv, SummonerOps } from './usage/summoner'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { makeCreate } from './create'

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramNoUnionURI, EmptyInterpreterURI> {}
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
export interface Summoner<R extends AnyConfigEnv> extends U.Summoners<ProgramNoUnionURI, EmptyInterpreterURI, R> {
  <L, A>(F: U.ProgramType<R, L, A>[ProgramNoUnionURI]): M<R, L, A>
}

export const summonFor: <R extends AnyEnv = {}>(
  env: ExtractEnv<R, JsonSchemaURI | IoTsURI | FastCheckURI>
) => SummonerOps<Summoner<R>> = <R extends AnyConfigEnv = {}>(
  env: ExtractEnv<R, JsonSchemaURI | IoTsURI | FastCheckURI>
) =>
  U.makeSummoner<Summoner<R>>(cacheUnaryFunction, program => {
    const type = program(modelIoTsNonStrictInterpreter<NonNullable<R>>())(env).type
    return {
      build: identity,
      create: makeCreate(type)
    }
  })
