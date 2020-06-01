import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'

import type { EqURI } from '@morphic-ts/eq-interpreters/lib/interpreters'
import { modelEqInterpreter } from '@morphic-ts/eq-interpreters/lib/interpreters'
import type { ShowURI } from '@morphic-ts/show-interpreters/lib/interpreters'
import { modelShowInterpreter } from '@morphic-ts/show-interpreters/lib/interpreters'
import type { FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import { modelFastCheckInterpreter } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import type { JsonSchemaURI } from '@morphic-ts/json-schema-interpreters/lib/interpreters'
import { modelJsonSchemaInterpreter } from '@morphic-ts/json-schema-interpreters/lib/interpreters'

import type { ProgramNoUnionURI } from './program-no-union'

import { chain as EChain } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { resolveSchema } from '@morphic-ts/json-schema-interpreters/lib/utils'
import type { IoTsURI } from '@morphic-ts/io-ts-interpreters/lib/interpreters'
import {
  modelIoTsNonStrictInterpreter,
  modelIoTsStrictInterpreter
} from '@morphic-ts/io-ts-interpreters/lib/interpreters'

import type * as U from '@morphic-ts/summoners'

import type { ESBASTJInterpreterURI } from './interpreters-ESBASTJ'
import type { AnyConfigEnv, ExtractEnv, SummonerOps } from '@morphic-ts/summoners/lib/summoner'
import { makeSummoner } from '@morphic-ts/summoners/lib/summoner'
import type { AnyEnv } from '@morphic-ts/common/lib/config'

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}
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
export interface Summoner<R> extends U.Summoners<ProgramNoUnionURI, ESBASTJInterpreterURI, R> {
  <L, A>(F: U.ProgramType<R, L, A>[ProgramNoUnionURI]): M<R, L, A>
}

/**
 *  @since 0.0.1
 */
export const summonFor: <R extends AnyEnv = {}>(
  env: ExtractEnv<R, JsonSchemaURI | IoTsURI | FastCheckURI | EqURI | ShowURI>
) => SummonerOps<Summoner<R>> = <R extends AnyConfigEnv = {}>(
  env: ExtractEnv<R, JsonSchemaURI | IoTsURI | FastCheckURI | EqURI | ShowURI>
) =>
  makeSummoner<Summoner<R>>(cacheUnaryFunction, program => {
    const { type, create } = program(modelIoTsNonStrictInterpreter<NonNullable<R>>())(env)
    return {
      build: a => a,
      eq: program(modelEqInterpreter<NonNullable<R>>())(env).eq,
      show: program(modelShowInterpreter<NonNullable<R>>())(env).show,
      arb: program(modelFastCheckInterpreter<NonNullable<R>>())(env).arb,
      strictType: program(modelIoTsStrictInterpreter<NonNullable<R>>())(env).type,
      type,
      jsonSchema: pipe(program(modelJsonSchemaInterpreter<NonNullable<R>>())(env).schema({}), EChain(resolveSchema)),
      create
    }
  })
