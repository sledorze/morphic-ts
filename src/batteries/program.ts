import { GetAlgebra } from '../algebras/core'
import { InferredProgram, InferredAlgebra } from '../usage/programs-infer'
import { IntersectionURI } from '../model-algebras/intersections'
import { ObjectURI } from '../model-algebras/object'
import { PrimitiveURI } from '../model-algebras/primitives'
import { RecursiveURI } from '../model-algebras/recursive'
import { SetURI } from '../model-algebras/set'
import { StrMapURI } from '../model-algebras/str-map'
import { TaggedUnionsURI } from '../model-algebras/tagged-unions'
import { UnionsURI } from '../model-algebras/unions'
import { UnknownURI } from '../model-algebras/unknown'
import { NewtypeURI } from '../model-algebras/newtype'

export const ProgramUnionURI = Symbol()
export type ProgramUnionURI = typeof ProgramUnionURI

export interface AlgebraUnion<F> extends InferredAlgebra<F, ProgramUnionURI> {}
export interface P<E, A> extends InferredProgram<E, A, ProgramUnionURI> {}

declare module '../usage/ProgramType' {
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
    >
  }
  interface ProgramAlgebra<F> {
    [ProgramUnionURI]: AlgebraUnion<F>
  }
  interface ProgramType<E, A> {
    [ProgramUnionURI]: P<E, A>
  }
  interface ProgramTypes extends Record<ProgramURI, any> {
    [ProgramUnionURI]: ProgramUnionInterpreters
  }
  interface ProgramUnionInterpreters {}
}
