import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'

import * as U from '../../src'
import type { AnyEnv } from '@morphic-ts/common/lib/config'

import type { GetAlgebra } from '@morphic-ts/algebras/lib/core'

import type { IntersectionURI } from '@morphic-ts/model-algebras/lib/intersections'
import type { ObjectURI } from '@morphic-ts/model-algebras/lib/object'
import type { PrimitiveURI } from '@morphic-ts/model-algebras/lib/primitives'
import type { RecursiveURI } from '@morphic-ts/model-algebras/lib/recursive'
import type { SetURI } from '@morphic-ts/model-algebras/lib/set'
import type { StrMapURI } from '@morphic-ts/model-algebras/lib/str-map'
import type { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'
import type { UnionsURI } from '@morphic-ts/model-algebras/lib/unions'
import type { UnknownURI } from '@morphic-ts/model-algebras/lib/unknown'
import type { NewtypeURI } from '@morphic-ts/model-algebras/lib/newtype'
import type { RefinedURI } from '@morphic-ts/model-algebras/lib/refined'
import type { FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/hkt'
import { Arbitrary } from 'fast-check'
import { modelFastCheckInterpreter } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'

/**
 *  @since 0.0.1
 */
export const ProgramUnionURI = 'ProgramUnionURI' as const
/**
 *  @since 0.0.1
 */
export type ProgramUnionURI = typeof ProgramUnionURI

/**
 *  @since 0.0.1
 */
export interface AlgebraUnion<F, Env> extends U.InferredAlgebra<F, ProgramUnionURI, Env> {}
/**
 *  @since 0.0.1
 */
export interface P<R extends U.AnyConfigEnv, E, A> extends U.InferredProgram<R, E, A, ProgramUnionURI> {}

declare module '../../src/ProgramType' {
  interface ProgramAlgebraURI {
    [ProgramUnionURI]: GetAlgebra<
      | PrimitiveURI
      | IntersectionURI
      | ObjectURI
      | RecursiveURI
      | SetURI
      | StrMapURI
      | TaggedUnionsURI
      | UnionsURI
      | UnknownURI
      | NewtypeURI
      | RefinedURI
    >
  }
  interface ProgramAlgebra<F, Env> {
    [ProgramUnionURI]: AlgebraUnion<F, Env>
  }
  interface ProgramType<R extends U.AnyConfigEnv, E, A> {
    [ProgramUnionURI]: P<R, E, A>
  }
  interface ProgramUnionInterpreters {}
}

/**
 *  @since 0.0.1
 */
export const FastCheckTestURI = 'FastCheckTestURI' as const
/**
 *  @since 0.0.1
 */
export type FastCheckTestURI = typeof FastCheckTestURI

interface FastCheckTestInterpreter<E, A> {
  build: (a: A) => A
  arb: Arbitrary<A>
}

declare module '../../src/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [FastCheckTestURI]: FastCheckTestInterpreter<E, A>
  }
}

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramUnionURI, FastCheckTestURI> {}
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
export interface Summoner<R extends U.AnyConfigEnv> extends U.Summoners<ProgramUnionURI, FastCheckTestURI, R> {
  <L, A>(F: U.ProgramType<R, L, A>[ProgramUnionURI]): M<R, L, A>
}

/**
 *  @since 0.0.1
 */
export const summonFor: <R extends AnyEnv = {}>(env: U.ExtractEnv<R, FastCheckURI>) => U.SummonerOps<Summoner<R>> = <
  R extends U.AnyConfigEnv = {}
>(
  env: U.ExtractEnv<R, FastCheckURI>
) =>
  U.makeSummoner<Summoner<R>>(cacheUnaryFunction, program => ({
    build: a => a,
    arb: program(modelFastCheckInterpreter<NonNullable<R>>())(env).arb
  }))

describe('Test summoner', () => {
  it('exists', () => {
    console.log('indts')
  })
})
