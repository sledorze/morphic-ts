import { identity } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'
import { pipe } from 'fp-ts/lib/pipeable'

import * as U from './usage'

import { BASTJInterpreterURI } from './interpreters-BASTJ'
import { ProgramUnionURI } from './program'

import { modelFastCheckInterpreter } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import {
  modelIoTsStrictInterpreter,
  modelIoTsNonStrictInterpreter
} from '@morphic-ts/io-ts-interpreters/lib/interpreters'
import { modelJsonSchemaInterpreter } from '@morphic-ts/json-schema-interpreters/lib'
import { resolveSchema } from '@morphic-ts/json-schema-interpreters/lib/utils'

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<L, A> extends U.Materialized<L, A, ProgramUnionURI, BASTJInterpreterURI> {}
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
export interface Summoner extends U.Summoners<ProgramUnionURI, BASTJInterpreterURI> {
  <L, A>(F: U.ProgramType<L, A>[ProgramUnionURI]): M<L, A>
}

export const { summon, tagged } = U.makeSummoner<Summoner>(cacheUnaryFunction, program => ({
  build: identity,
  arb: program(modelFastCheckInterpreter).arb,
  strictType: program(modelIoTsStrictInterpreter).type,
  type: program(modelIoTsNonStrictInterpreter).type,
  jsonSchema: pipe(program(modelJsonSchemaInterpreter).schema({}), E.chain(resolveSchema))
}))
