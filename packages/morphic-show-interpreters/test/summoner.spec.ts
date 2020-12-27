import type { GetAlgebra } from '@morphic-ts/algebras/lib/core'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'
import type { URIS } from '@morphic-ts/common/lib/HKT'
import type { IntersectionURI } from '@morphic-ts/model-algebras/lib/intersections'
import type { NewtypeURI } from '@morphic-ts/model-algebras/lib/newtype'
import type { ObjectURI } from '@morphic-ts/model-algebras/lib/object'
import type { PrimitiveURI } from '@morphic-ts/model-algebras/lib/primitives'
import type { RecursiveURI } from '@morphic-ts/model-algebras/lib/recursive'
import type { RefinedURI } from '@morphic-ts/model-algebras/lib/refined'
import type { SetURI } from '@morphic-ts/model-algebras/lib/set'
import type { StrMapURI } from '@morphic-ts/model-algebras/lib/str-map'
import type { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'
import type { UnknownURI } from '@morphic-ts/model-algebras/lib/unknown'
import type {
  AnyConfigEnv,
  ExtractEnv,
  InferredAlgebra,
  InferredProgram,
  Materialized,
  ProgramType,
  SummonerOps,
  Summoners
} from '@morphic-ts/summoners'
import { makeSummoner } from '@morphic-ts/summoners'
import type { Show } from 'fp-ts/Show'

import type { ShowURI } from '../src/interpreters'
import { modelShowInterpreter } from '../src/interpreters'
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
export const JsonSchemaTestURI = 'JsonSchemaTestURI' as const
/**
 *  @since 0.0.1
 */
export type JsonSchemaTestURI = typeof JsonSchemaTestURI

interface JsonSchemaTestInterpreter<_E, A> {
  build: (a: A) => A
  show: Show<A>
}

declare module '@morphic-ts/summoners/lib/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [JsonSchemaTestURI]: JsonSchemaTestInterpreter<E, A>
  }
}

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends Materialized<R, L, A, ProgramUnionURI, JsonSchemaTestURI> {}
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
export interface Summoner<R extends AnyConfigEnv> extends Summoners<ProgramUnionURI, JsonSchemaTestURI, R> {
  <L, A>(F: ProgramType<R, L, A>[ProgramUnionURI]): M<R, L, A>
}

/**
 *  @since 0.0.1
 */
export const summonFor: <R extends AnyEnv = {}>(env: ExtractEnv<R, ShowURI>) => SummonerOps<Summoner<R>> = <
  R extends AnyConfigEnv = {}
>(
  env: ExtractEnv<R, ShowURI>
) =>
  makeSummoner<Summoner<R>>(cacheUnaryFunction, program => ({
    build: a => a,
    show: program(modelShowInterpreter<NonNullable<R>>())(env).show
  }))

describe('Test summoner', () => {
  it('exists', () => {
    1 === 1
  })
})
