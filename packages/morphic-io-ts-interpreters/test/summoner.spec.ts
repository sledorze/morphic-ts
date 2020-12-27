import type { GetAlgebra } from '@morphic-ts/algebras/lib/core'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'
import type { URIS } from '@morphic-ts/common/lib/HKT'
import type { IoTsURI } from '@morphic-ts/io-ts-interpreters/lib/interpreters'
import {
  modelIoTsNonStrictInterpreter,
  modelIoTsStrictInterpreter
} from '@morphic-ts/io-ts-interpreters/lib/interpreters'
import type { IntersectionURI } from '@morphic-ts/model-algebras/lib/intersections'
import type { NewtypeURI } from '@morphic-ts/model-algebras/lib/newtype'
import type { ObjectURI } from '@morphic-ts/model-algebras/lib/object'
import type { PrimitiveURI } from '@morphic-ts/model-algebras/lib/primitives'
import type { RecursiveURI } from '@morphic-ts/model-algebras/lib/recursive'
import type { RefinedURI } from '@morphic-ts/model-algebras/lib/refined'
import type { SetURI } from '@morphic-ts/model-algebras/lib/set'
import type { StrMapURI } from '@morphic-ts/model-algebras/lib/str-map'
import type { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'
import type { UnionsURI } from '@morphic-ts/model-algebras/lib/unions'
import type { UnknownURI } from '@morphic-ts/model-algebras/lib/unknown'
// eslint-disable-next-line import/no-duplicates
import type * as U from '@morphic-ts/summoners'
// eslint-disable-next-line import/no-duplicates
import type { AnyConfigEnv, ExtractEnv, InferredAlgebra, InferredProgram, SummonerOps } from '@morphic-ts/summoners'
import { makeSummoner } from '@morphic-ts/summoners'
import type { Type } from 'io-ts'

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
export interface AlgebraUnion<F extends URIS, Env> extends InferredAlgebra<F, ProgramUnionURI, Env> {}
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
      | UnionsURI
      | UnknownURI
      | NewtypeURI
      | RefinedURI
    >
  }
  interface ProgramAlgebra<F extends URIS, Env> {
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
export const IoTsTestURI = 'IoTsTestURI' as const
/**
 *  @since 0.0.1
 */
export type IoTsTestURI = typeof IoTsTestURI

interface IoTsTestInterpreter<E, A> {
  build: (a: A) => A
  type: Type<A, E, unknown>
  strictType: Type<A, E, unknown>
}

declare module '@morphic-ts/summoners/lib/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [IoTsTestURI]: IoTsTestInterpreter<E, A>
  }
}

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramUnionURI, IoTsTestURI> {}
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
export interface Summoner<R extends AnyConfigEnv> extends U.Summoners<ProgramUnionURI, IoTsTestURI, R> {
  <L, A>(F: U.ProgramType<R, L, A>[ProgramUnionURI]): M<R, L, A>
}

/**
 *  @since 0.0.1
 */
export const summonFor: <R extends AnyEnv = {}>(env: ExtractEnv<R, IoTsURI>) => SummonerOps<Summoner<R>> = <
  R extends AnyConfigEnv = {}
>(
  env: ExtractEnv<R, IoTsURI>
) =>
  makeSummoner<Summoner<R>>(cacheUnaryFunction, program => ({
    build: a => a,
    type: program(modelIoTsNonStrictInterpreter<NonNullable<R>>())(env).type,
    strictType: program(modelIoTsStrictInterpreter<NonNullable<R>>())(env).type
  }))

describe('Test summoner', () => {
  it('exists', () => {
    1 === 1
  })
})
