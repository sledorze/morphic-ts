import * as chai from 'chai'
import { modelOrdInterpreter, OrdURI } from '../src/interpreters'
import type { Ord } from 'fp-ts/lib/Ord'
import type { Materialized } from '@morphic-ts/summoners'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'
import { makeSummoner } from '@morphic-ts/summoners'
import type { Summoners } from '@morphic-ts/summoners'
import type { ProgramType } from '@morphic-ts/summoners'

import type { InferredAlgebra, InferredProgram } from '@morphic-ts/summoners'
import type { GetAlgebra } from '@morphic-ts/algebras/lib/core'

import type { IntersectionURI } from '@morphic-ts/model-algebras/lib/intersections'
import type { PrimitiveURI } from '@morphic-ts/model-algebras/lib/primitives'
import type { SetURI } from '@morphic-ts/model-algebras/lib/set'
import type { StrMapURI } from '@morphic-ts/model-algebras/lib/str-map'
import type { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'
import type { NewtypeURI } from '@morphic-ts/model-algebras/lib/newtype'
import type { RefinedURI } from '@morphic-ts/model-algebras/lib/refined'
import type { AnyConfigEnv, ExtractEnv } from '@morphic-ts/summoners'

/**
 *  @since 0.0.1
 */
export const ProgramOrderableURI = 'ProgramOrderableURI' as const
/**
 *  @since 0.0.1
 */
export type ProgramOrderableURI = typeof ProgramOrderableURI

/**
 *  @since 0.0.1
 */
export interface AlgebraNoUnion<F, Env> extends InferredAlgebra<F, ProgramOrderableURI, Env> {}
/**
 *  @since 0.0.1
 */
export interface P<R extends AnyConfigEnv, E, A> extends InferredProgram<R, E, A, ProgramOrderableURI> {}

declare module '@morphic-ts/summoners/lib/ProgramType' {
  interface ProgramAlgebraURI {
    [ProgramOrderableURI]: GetAlgebra<
      PrimitiveURI | IntersectionURI | SetURI | StrMapURI | TaggedUnionsURI | NewtypeURI | RefinedURI
    >
  }

  interface ProgramAlgebra<F, Env> {
    [ProgramOrderableURI]: AlgebraNoUnion<F, Env>
  }

  interface ProgramType<R extends AnyConfigEnv, E, A> {
    [ProgramOrderableURI]: P<R, E, A>
  }
}

interface OrdInterpreter<A> {
  ord: Ord<A>
}

const OrdInterpreterURI = 'OrdInterpreterURI' as const
export type OrdInterpreterURI = typeof OrdInterpreterURI

declare module '@morphic-ts/summoners/lib/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [OrdInterpreterURI]: OrdInterpreter<A>
  }
}

/** Type level override to keep Morph type name short */
export interface M<R, L, A> extends Materialized<R, L, A, ProgramOrderableURI, OrdInterpreterURI> {}
export interface UM<R, A> extends Materialized<R, {}, A, ProgramOrderableURI, OrdInterpreterURI> {}

export interface Summoner<R> extends Summoners<ProgramOrderableURI, OrdInterpreterURI, R> {
  <L, A>(F: ProgramType<R, L, A>[ProgramOrderableURI]): M<R, L, A>
}

export const summonFor = <R extends AnyConfigEnv = {}>(env: ExtractEnv<R, OrdURI>) =>
  makeSummoner<Summoner<R>>(cacheUnaryFunction, program => ({
    build: <A>(a: A) => a,
    ord: program(modelOrdInterpreter<NonNullable<R>>())(env).ord
  }))

describe('Ord', () => {
  it('dummy', () => chai.assert.equal(1, 1))
})
