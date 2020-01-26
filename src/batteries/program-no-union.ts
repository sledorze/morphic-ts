import { GetAlgebra } from '../algebras/core'
import { InferredAlgebra, InferredProgram } from '../usage/programs-infer'
import { IntersectionURI } from '../model-algebras/intersections'
import { ObjectURI } from '../model-algebras/object'
import { PrimitiveURI } from '../model-algebras/primitives'
import { RecursiveURI } from '../model-algebras/recursive'
import { SetURI } from '../model-algebras/set'
import { StrMapURI } from '../model-algebras/str-map'
import { TaggedUnionsURI } from '../model-algebras/tagged-unions'
import { UnknownURI } from '../model-algebras/unknown'
import { NewtypeURI } from '../model-algebras/newtype'

export const ProgramNoUnionURI = Symbol()
export type ProgramNoUnionURI = typeof ProgramNoUnionURI

export interface AlgebraNoUnion<F> extends InferredAlgebra<F, ProgramNoUnionURI> {}
export interface P<E, A> extends InferredProgram<E, A, ProgramNoUnionURI> {}

declare module '../usage/ProgramType' {
  interface ProgramAlgebraURI {
    [ProgramNoUnionURI]: GetAlgebra<
      | PrimitiveURI
      | IntersectionURI
      | ObjectURI
      | RecursiveURI
      | SetURI
      | StrMapURI
      | TaggedUnionsURI
      | UnknownURI
      | NewtypeURI
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
