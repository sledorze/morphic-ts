import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'

import type * as U from '@morphic-ts/summoners'
import type { ExtractEnv, SummonerOps } from '@morphic-ts/summoners/lib/summoner'
import { makeSummoner } from '@morphic-ts/summoners/lib/summoner'
import type { AnyEnv } from '@morphic-ts/common/lib/config'

import type { InferredAlgebra, InferredProgram } from '@morphic-ts/summoners/lib/programs-infer'
import type { GetAlgebra } from '@morphic-ts/algebras/lib/core'

import type { IntersectionURI } from '@morphic-ts/model-algebras/lib/intersections'
import type { ObjectURI } from '@morphic-ts/model-algebras/lib/object'
import type { PrimitiveURI } from '@morphic-ts/model-algebras/lib/primitives'
import type { RecursiveURI } from '@morphic-ts/model-algebras/lib/recursive'
import type { SetURI } from '@morphic-ts/model-algebras/lib/set'
import type { StrMapURI } from '@morphic-ts/model-algebras/lib/str-map'
import type { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'
import type { UnknownURI } from '@morphic-ts/model-algebras/lib/unknown'
import type { NewtypeURI } from '@morphic-ts/model-algebras/lib/newtype'
import type { RefinedURI } from '@morphic-ts/model-algebras/lib/refined'
import type { AnyConfigEnv } from '@morphic-ts/summoners/lib/summoner'
import { Eq } from 'fp-ts/lib/Eq'
import { modelEqInterpreter, EqURI } from '../src'

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
export interface AlgebraUnion<F, Env> extends InferredAlgebra<F, ProgramUnionURI, Env> {}
/**
 *  @since 0.0.1
 */
export interface P<R extends AnyConfigEnv, E, A> extends InferredProgram<R, E, A, ProgramUnionURI> {}

declare module '@morphic-ts/summoners/lib/ProgramType' {
  interface ProgramAlgebraURI {
    [ProgramUnionURI]: GetAlgebra<
      | PrimitiveURI
      | IntersectionURI
      | ObjectURI
      | RecursiveURI
      | SetURI
      | StrMapURI
      | TaggedUnionsURI
      | UnknownURI
      | NewtypeURI
      | RefinedURI
    >
  }
  interface ProgramAlgebra<F, Env> {
    [ProgramUnionURI]: AlgebraUnion<F, Env>
  }
  interface ProgramType<R extends AnyConfigEnv, E, A> {
    [ProgramUnionURI]: P<R, E, A>
  }
  interface ProgramUnionInterpreters {}
}

/**
 *  @since 0.0.1
 */
export const EqTestURI = 'EqTestURI' as const
/**
 *  @since 0.0.1
 */
export type EqTestURI = typeof EqTestURI

interface EqTestInterpreter<_E, A> {
  build: (a: A) => A
  eq: Eq<A>
}

declare module '@morphic-ts/summoners/lib/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [EqTestURI]: EqTestInterpreter<E, A>
  }
}

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramUnionURI, EqTestURI> {}
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
export interface Summoner<R extends AnyConfigEnv> extends U.Summoners<ProgramUnionURI, EqTestURI, R> {
  <L, A>(F: U.ProgramType<R, L, A>[ProgramUnionURI]): M<R, L, A>
}

/**
 *  @since 0.0.1
 */
export const summonFor: <R extends AnyEnv = {}>(env: ExtractEnv<R, EqURI>) => SummonerOps<Summoner<R>> = <
  R extends AnyConfigEnv = {}
>(
  env: ExtractEnv<R, EqURI>
) =>
  makeSummoner<Summoner<R>>(cacheUnaryFunction, program => ({
    build: a => a,
    eq: program(modelEqInterpreter<NonNullable<R>>())(env).eq
  }))

describe('Test summoner', () => {
  it('exists', () => {
    1 === 1
  })
})
