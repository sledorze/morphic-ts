import { GetAlgebra } from '../algebras/core'
import { InferredAlgebra, InferredProgram } from '../usage/programs-hkt'
import { IntersectionURI } from '../algebras/intersections'
import { PrimitiveURI } from '../algebras/primitives'
import { SetURI } from '../algebras/set'
import { StrMapURI } from '../algebras/str-map'
import { TaggedUnionsURI } from '../algebras/tagged-unions'

export const ProgramOrderableURI = Symbol()
export type ProgramOrderableURI = typeof ProgramOrderableURI

export interface AlgebraNoUnion<F> extends InferredAlgebra<F, ProgramOrderableURI> {}
export interface P<E, A> extends InferredProgram<E, A, ProgramOrderableURI> {}

declare module '../../src/usage/programs-hkt' {
  interface ProgramAlgebraURI {
    [ProgramOrderableURI]: GetAlgebra<PrimitiveURI | IntersectionURI | SetURI | StrMapURI | TaggedUnionsURI>
  }

  interface ProgramAlgebra<F> {
    [ProgramOrderableURI]: AlgebraNoUnion<F>
  }

  interface ProgramType<E, A> {
    [ProgramOrderableURI]: P<E, A>
  }

  interface ProgramTypes extends Record<ProgramURI, any> {
    [ProgramOrderableURI]: ProgramOrderableInterpreters
  }
  interface ProgramOrderableInterpreters {}
}
