import { GetAlgebra } from '@sledorze/morphic-algebras/lib/core'
import { IntersectionURI } from '@sledorze/morphic-model-algebras/lib/intersections'
import { ObjectURI } from '@sledorze/morphic-model-algebras/lib/object'
import { PrimitiveURI } from '@sledorze/morphic-model-algebras/lib/primitives'
import { RecursiveURI } from '@sledorze/morphic-model-algebras/lib/recursive'
import { SetURI } from '@sledorze/morphic-model-algebras/lib/set'
import { StrMapURI } from '@sledorze/morphic-model-algebras/lib/str-map'
import { TaggedUnionsURI } from '@sledorze/morphic-model-algebras/lib/tagged-unions'
import { UnionsURI } from '@sledorze/morphic-model-algebras/lib/unions'
import { UnknownURI } from '@sledorze/morphic-model-algebras/lib/unknown'
import { NewtypeURI } from '@sledorze/morphic-model-algebras/lib/newtype'
import { RefinedURI } from '@sledorze/morphic-model-algebras/lib/refined'
import { InferredAlgebra, InferredProgram } from './usage/programs-infer'

/**
 *  @since 0.0.1
 */
export const ProgramUnionURI = Symbol()
/**
 *  @since 0.0.1
 */
export type ProgramUnionURI = typeof ProgramUnionURI

/**
 *  @since 0.0.1
 */
export interface AlgebraUnion<F> extends InferredAlgebra<F, ProgramUnionURI> {}
/**
 *  @since 0.0.1
 */
export interface P<E, A> extends InferredProgram<E, A, ProgramUnionURI> {}

declare module './usage/ProgramType' {
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
      | RefinedURI
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
