import { GetAlgebra } from 'morphic-algebras/lib/core'
import { IntersectionURI } from 'morphic-model-algebras/lib/intersections'
import { ObjectURI } from 'morphic-model-algebras/lib/object'
import { PrimitiveURI } from 'morphic-model-algebras/lib/primitives'
import { RecursiveURI } from 'morphic-model-algebras/lib/recursive'
import { SetURI } from 'morphic-model-algebras/lib/set'
import { StrMapURI } from 'morphic-model-algebras/lib/str-map'
import { TaggedUnionsURI } from 'morphic-model-algebras/lib/tagged-unions'
import { UnknownURI } from 'morphic-model-algebras/lib/unknown'
import { NewtypeURI } from 'morphic-model-algebras/lib/newtype'
import { RefinedURI } from 'morphic-model-algebras/lib/refined'
import { InferredAlgebra, InferredProgram } from './usage/programs-infer'

/**
 *  @since 0.0.1
 */
export const ProgramNoUnionURI = Symbol()
/**
 *  @since 0.0.1
 */
export type ProgramNoUnionURI = typeof ProgramNoUnionURI

/**
 *  @since 0.0.1
 */
export interface AlgebraNoUnion<F> extends InferredAlgebra<F, ProgramNoUnionURI> {}
/**
 *  @since 0.0.1
 */
export interface P<E, A> extends InferredProgram<E, A, ProgramNoUnionURI> {}

declare module './usage/ProgramType' {
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
