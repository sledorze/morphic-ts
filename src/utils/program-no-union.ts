import { GetAlgebra } from '../core'
import { InferredAlgebra, InferredProgram } from '../usage/programs-hkt'
import { IntersectionURI } from '../algebras/intersections'
import { ObjectURI } from '../algebras/object'
import { PrimitiveURI } from '../algebras/primitives'
import { RecursiveURI } from '../algebras/recursive'
import { SetURI } from '../algebras/set'
import { StrMapURI } from '../algebras/str-map'
import { TaggedUnionsURI } from '../algebras/tagged-unions'

export const ProgramNoUnionURI = Symbol()
export type ProgramNoUnionURI = typeof ProgramNoUnionURI

export interface AlgebraNoUnion<F> extends InferredAlgebra<F, ProgramNoUnionURI> {}
export interface P<E, A> extends InferredProgram<E, A, ProgramNoUnionURI> {}

declare module '../../src/usage/programs-hkt' {
  interface ProgramAlgebraURI {
    [ProgramNoUnionURI]: GetAlgebra<
      PrimitiveURI | IntersectionURI | ObjectURI | RecursiveURI | SetURI | StrMapURI | TaggedUnionsURI
    >
  }

  interface ProgramAlgebra<F> {
    [ProgramNoUnionURI]: AlgebraNoUnion<F>
  }

  interface ProgramType<E, A> {
    [ProgramNoUnionURI]: P<E, A>
  }

  interface ProgramTypes extends Record<ProgramURI, any> {
    [ProgramNoUnionURI]: ProgramNoUnionInterpreters
  }

  interface ProgramNoUnionInterpreters {}
}
