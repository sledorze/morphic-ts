import { HKT2, Kind, Kind2, URIS, URIS2 } from '@morphic/common/lib/HKT'
import { Algebra1, Algebra2, Algebra } from '@morphic/algebras/lib/core'
import { ProgramURI, ProgramAlgebra, ProgramAlgebraURI, ProgramType } from './ProgramType'

/**
 *  @since 0.0.1
 */
export const overloadsSymb = Symbol()
/**
 *  @since 0.0.1
 */
export const interpretable = <T extends { [overloadsSymb]?: any }>(program: T): NonNullable<T[typeof overloadsSymb]> =>
  program as NonNullable<T[typeof overloadsSymb]>

/**
 *  @since 0.0.1
 */
export type InferredAlgebra<F, PURI extends ProgramURI> = Algebra<ProgramAlgebraURI[PURI], F>
/**
 *  @since 0.0.1
 */
export type Overloads<I extends InferredProgram<any, any, any>> = NonNullable<I[typeof overloadsSymb]>

/**
 *  @since 0.0.1
 */
export interface InferredProgram<E, A, PURI extends ProgramURI> {
  <G>(a: ProgramAlgebra<G>[PURI]): HKT2<G, E, A>
  [overloadsSymb]?: {
    <G extends URIS>(a: Algebra1<ProgramAlgebraURI[PURI], G>): Kind<G, A>
    <G extends URIS2>(a: Algebra2<ProgramAlgebraURI[PURI], G>): Kind2<G, E, A>
  }
}

/***
 * Provides Program builder for the given Program type (Exposing a specific Algebra)
 */
/**
 *  @since 0.0.1
 */
export const makeDefine = <PURI extends ProgramURI>(_prog: PURI) => <E, A>(
  program: ProgramType<E, A>[PURI]
): Overloads<ProgramType<E, A>[PURI]> => program as any // White lie
