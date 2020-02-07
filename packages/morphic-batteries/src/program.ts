import { GetAlgebra } from '@morphic-ts/algebras/lib/core'
import { IntersectionURI } from '@morphic-ts/model-algebras/lib/intersections'
import { ObjectURI } from '@morphic-ts/model-algebras/lib/object'
import { PrimitiveURI } from '@morphic-ts/model-algebras/lib/primitives'
import { RecursiveURI } from '@morphic-ts/model-algebras/lib/recursive'
import { SetURI } from '@morphic-ts/model-algebras/lib/set'
import { StrMapURI } from '@morphic-ts/model-algebras/lib/str-map'
import { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { UnionsURI } from '@morphic-ts/model-algebras/lib/unions'
import { UnknownURI } from '@morphic-ts/model-algebras/lib/unknown'
import { NewtypeURI } from '@morphic-ts/model-algebras/lib/newtype'
import { RefinedURI } from '@morphic-ts/model-algebras/lib/refined'
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
