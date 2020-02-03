import { GetAlgebra } from '@sledorze/morphic-algebras/lib/core'
import { InferredAlgebra, InferredProgram } from '@sledorze/morphic-usage/lib/programs-infer'
import { IntersectionURI } from '@sledorze/morphic-model-algebras/lib/intersections'
import { PrimitiveURI } from '@sledorze/morphic-model-algebras/lib/primitives'
import { SetURI } from '@sledorze/morphic-model-algebras/lib/set'
import { StrMapURI } from '@sledorze/morphic-model-algebras/lib/str-map'
import { TaggedUnionsURI } from '@sledorze/morphic-model-algebras/lib/tagged-unions'
import { NewtypeURI } from '@sledorze/morphic-model-algebras/lib/newtype'
import { RefinedURI } from '@sledorze/morphic-model-algebras/lib/refined'

export const ProgramOrderableURI = Symbol()
export type ProgramOrderableURI = typeof ProgramOrderableURI

export interface AlgebraNoUnion<F> extends InferredAlgebra<F, ProgramOrderableURI> {}
export interface P<E, A> extends InferredProgram<E, A, ProgramOrderableURI> {}

declare module '@sledorze/morphic-usage/lib/ProgramType' {
  interface ProgramAlgebraURI {
    [ProgramOrderableURI]: GetAlgebra<
      PrimitiveURI | IntersectionURI | SetURI | StrMapURI | TaggedUnionsURI | NewtypeURI | RefinedURI
    >
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
