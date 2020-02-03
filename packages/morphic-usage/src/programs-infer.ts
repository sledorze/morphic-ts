import { HKT2, Kind, Kind2, URIS, URIS2 } from '@sledorze/morphic-common/lib/HKT'
import { Algebra1, Algebra2, Algebra } from '@sledorze/morphic-algebras/lib/core'
import { ProgramURI, ProgramAlgebra, ProgramAlgebraURI, ProgramType } from './ProgramType'

export const overloadsSymb = Symbol()
export const interpretable = <T extends { [overloadsSymb]?: any }>(program: T): NonNullable<T[typeof overloadsSymb]> =>
  program as NonNullable<T[typeof overloadsSymb]>

export type InferredAlgebra<F, PURI extends ProgramURI> = Algebra<ProgramAlgebraURI[PURI], F>
export type Overloads<I extends InferredProgram<any, any, any>> = NonNullable<I[typeof overloadsSymb]>

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
export const makeDefine = <PURI extends ProgramURI>(_prog: PURI) => <E, A>(
  program: ProgramType<E, A>[PURI]
): Overloads<ProgramType<E, A>[PURI]> => program as any // White lie
