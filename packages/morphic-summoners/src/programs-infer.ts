import type { Algebra } from '@morphic-ts/algebras/lib/core'
import type { HKT, Kind, URIS, URIS_ } from '@morphic-ts/common/lib/HKT'

import type { ProgramAlgebra, ProgramAlgebraURI, ProgramType, ProgramURI } from './ProgramType'
import type { AnyConfigEnv } from './summoner'
import {} from './tagged-union'

/**
 *  @since 0.0.1
 */
export const overloadsSymb = Symbol()
/**
 *  @since 0.0.1
 */
export const interpretable = <T extends { [overloadsSymb]?: any }>(program: T): Overloads<T> => program as Overloads<T>

/**
 *  @since 0.0.1
 */
export type InferredAlgebra<F extends URIS, PURI extends ProgramURI, R> = Algebra<ProgramAlgebraURI[PURI], F, R>

/**
 *  @since 0.0.1
 */
export type Overloads<I extends { [overloadsSymb]?: any }> = NonNullable<I[typeof overloadsSymb]>

/**
 *  @since 0.0.1
 */
export interface InferredProgram<R extends AnyConfigEnv, E, A, PURI extends ProgramURI> {
  _PURI?: PURI
  <Env extends R>(a: ProgramAlgebra<'HKT', Env>[PURI]): HKT<Env, E, A>
  [overloadsSymb]?: {
    <G extends URIS_>(a: Algebra<ProgramAlgebraURI[PURI], G, R>): Kind<G, { [k in G & keyof R]: R[k] }, E, A>
  }
}

/**
 *  @since 0.0.1
 */
export interface Define<PURI extends ProgramURI, R extends AnyConfigEnv = {}> {
  <E, A>(program: ProgramType<R, E, A>[PURI]): ProgramType<R, E, A>[PURI]
}

/***
 * Provides Program builder for the given Program type (Exposing a specific Algebra)
 */
/**
 *  @since 0.0.1
 */
export const defineFor: <PURI extends ProgramURI>(
  _prog: PURI
) => <R extends AnyConfigEnv = {}>() => Define<PURI, R> = _ => () => a => a
