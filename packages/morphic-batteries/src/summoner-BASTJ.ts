import { identity } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import { cacheUnaryFunction, Compact } from '@morphic-ts/common/lib/core'
import { Includes } from '@morphic-ts/common/lib/utils'
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
import { DepsErrorMsg, AnyConfigEnv, ExtractEnv } from './usage/summoner'

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramUnionURI, BASTJInterpreterURI> {}
/**
 *  @since 0.0.1
 */
export interface UM<R, A> extends M<R, unknown, A> {}

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
  <L, A, R2 extends R>(F: U.ProgramType<R2, L, A>[ProgramUnionURI]): Includes<
    R,
    R2,
    M<R, L, A>,
    Compact<DepsErrorMsg<R, R2>>
  >
}

export const summonFor = <R extends AnyConfigEnv>(env: ExtractEnv<R, JsonSchemaURI | IoTsURI | FastCheckURI>) =>
  U.makeSummoner<Summoner<R>>(cacheUnaryFunction, program => ({
    build: identity,
    arb: program(modelFastCheckInterpreter)(env).arb,
    strictType: program(modelIoTsStrictInterpreter)(env).type,
    type: program(modelIoTsNonStrictInterpreter)(env).type,
    jsonSchema: pipe(program(modelJsonSchemaInterpreter)(env).schema({}), E.chain(resolveSchema))
  }))
