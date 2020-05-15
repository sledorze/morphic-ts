import { identity } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'
import { pipe } from 'fp-ts/lib/pipeable'

import * as U from './usage'

import { BASTJInterpreterURI } from './interpreters-BASTJ'
import { ProgramUnionURI } from './program'

import { modelFastCheckInterpreter, FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import {
  modelIoTsStrictInterpreter,
  modelIoTsNonStrictInterpreter,
  IoTsURI
} from '@morphic-ts/io-ts-interpreters/lib/interpreters'
import { modelJsonSchemaInterpreter, JsonSchemaURI } from '@morphic-ts/json-schema-interpreters/lib'
import { resolveSchema } from '@morphic-ts/json-schema-interpreters/lib/utils'
import { AnyConfigEnv, ExtractEnv, SummonerOps } from './usage/summoner'
import { AnyEnv } from '@morphic-ts/common/lib/config'

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramUnionURI, BASTJInterpreterURI> {}
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
export interface Summoner<R extends AnyConfigEnv> extends U.Summoners<ProgramUnionURI, BASTJInterpreterURI, R> {
  <L, A>(F: U.ProgramType<R, L, A>[ProgramUnionURI]): M<R, L, A>
}

export const summonFor: <R extends AnyEnv = {}>(
  env: ExtractEnv<R, JsonSchemaURI | IoTsURI | FastCheckURI>
) => SummonerOps<Summoner<R>> = <R extends AnyConfigEnv = {}>(
  env: ExtractEnv<R, JsonSchemaURI | IoTsURI | FastCheckURI>
) =>
  U.makeSummoner<Summoner<R>>(cacheUnaryFunction, program => {
    const { type, create } = program(modelIoTsNonStrictInterpreter<NonNullable<R>>())(env)
    return {
      build: identity,
      arb: program(modelFastCheckInterpreter<NonNullable<R>>())(env).arb,
      strictType: program(modelIoTsStrictInterpreter<NonNullable<R>>())(env).type,
      type,
      jsonSchema: pipe(program(modelJsonSchemaInterpreter<NonNullable<R>>())(env).schema({}), E.chain(resolveSchema)),
      create
    }
  })
