import { GetAlgebra } from '../algebras/core'
import { InferredAlgebra, InferredProgram } from '../usage/programs-hkt'
import { IntersectionURI } from '../model-algebras/intersections'
import { PrimitiveURI } from '../model-algebras/primitives'
import { SetURI } from '../model-algebras/set'
import { StrMapURI } from '../model-algebras/str-map'
import { TaggedUnionsURI } from '../model-algebras/tagged-unions'

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
