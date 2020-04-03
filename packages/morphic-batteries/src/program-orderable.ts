import { InferredAlgebra, InferredProgram } from './usage/programs-infer'
import { GetAlgebra } from '@morphic-ts/algebras/lib/core'

import { IntersectionURI } from '@morphic-ts/model-algebras/lib/intersections'
import { PrimitiveURI } from '@morphic-ts/model-algebras/lib/primitives'
import { SetURI } from '@morphic-ts/model-algebras/lib/set'
import { StrMapURI } from '@morphic-ts/model-algebras/lib/str-map'
import { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { NewtypeURI } from '@morphic-ts/model-algebras/lib/newtype'
import { RefinedURI } from '@morphic-ts/model-algebras/lib/refined'

/**
 *  @since 0.0.1
 */
export const ProgramOrderableURI = 'ProgramOrderableURI' as const
/**
 *  @since 0.0.1
 */
export type ProgramOrderableURI = typeof ProgramOrderableURI

/**
 *  @since 0.0.1
 */
export interface AlgebraNoUnion<F> extends InferredAlgebra<F, ProgramOrderableURI> {}
/**
 *  @since 0.0.1
 */
export interface P<R, E, A> extends InferredProgram<R, E, A, ProgramOrderableURI> {}

declare module './usage/ProgramType' {
  interface ProgramAlgebraURI {
    [ProgramOrderableURI]: GetAlgebra<
      PrimitiveURI | IntersectionURI | SetURI | StrMapURI | TaggedUnionsURI | NewtypeURI | RefinedURI
    >
  }

  interface ProgramAlgebra<F> {
    [ProgramOrderableURI]: AlgebraNoUnion<F>
  }

  interface ProgramType<R, E, A> {
    [ProgramOrderableURI]: P<R, E, A>
  }

  interface ProgramOrderableInterpreters {}
}
