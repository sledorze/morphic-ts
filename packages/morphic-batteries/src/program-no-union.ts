import { GetAlgebra } from '@sledorze/morphic-algebras/lib/core'
import { InferredAlgebra, InferredProgram } from '../usage/programs-infer'
import { IntersectionURI } from '@sledorze/morphic-model-algebras/lib/intersections'
import { ObjectURI } from '@sledorze/morphic-model-algebras/lib/object'
import { PrimitiveURI } from '@sledorze/morphic-model-algebras/lib/primitives'
import { RecursiveURI } from '@sledorze/morphic-model-algebras/lib/recursive'
import { SetURI } from '@sledorze/morphic-model-algebras/lib/set'
import { StrMapURI } from '@sledorze/morphic-model-algebras/lib/str-map'
import { TaggedUnionsURI } from '@sledorze/morphic-model-algebras/lib/tagged-unions'
import { UnknownURI } from '@sledorze/morphic-model-algebras/lib/unknown'
import { NewtypeURI } from '@sledorze/morphic-model-algebras/lib/newtype'
import { RefinedURI } from '@sledorze/morphic-model-algebras/lib/refined'

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
      | RefinedURI
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
