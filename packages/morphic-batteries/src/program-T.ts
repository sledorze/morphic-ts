import { GetAlgebra } from '@morphic-ts/algebras/lib/core'
import { IntersectionURI } from '@morphic-ts/model-algebras/lib/intersections'
import { ObjectURI } from '@morphic-ts/model-algebras/lib/object'
import { PrimitiveURI } from '@morphic-ts/model-algebras/lib/primitives'
import { RecursiveURI } from '@morphic-ts/model-algebras/lib/recursive'
import { SetURI } from '@morphic-ts/model-algebras/lib/set'
import { StrMapURI } from '@morphic-ts/model-algebras/lib/str-map'
import { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { UnknownURI } from '@morphic-ts/model-algebras/lib/unknown'
import { NewtypeURI } from '@morphic-ts/model-algebras/lib/newtype'
import { RefinedURI } from '@morphic-ts/model-algebras/lib/refined'
import { InferredAlgebra, InferredProgram } from './usage/programs-infer'
import { TermURI } from '@morphic-ts/model-algebras/lib/term'

/**
 *  @since 0.0.1
 */
export const ProgramTURI = 'ProgramTURI' as const
/**
 *  @since 0.0.1
 */
export type ProgramTURI = typeof ProgramTURI

/**
 *  @since 0.0.1
 */
export interface AlgebraT<F> extends InferredAlgebra<F, ProgramTURI> {}
/**
 *  @since 0.0.1
 */
export interface P<E, A> extends InferredProgram<E, A, ProgramTURI> {}

declare module './usage/ProgramType' {
  interface ProgramAlgebraURI {
    [ProgramTURI]: GetAlgebra<
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
      | TermURI
    >
  }

  interface ProgramAlgebra<F> {
    [ProgramTURI]: AlgebraT<F>
  }

  interface ProgramType<E, A> {
    [ProgramTURI]: P<E, A>
  }

  interface ProgramTypes extends Record<ProgramURI, any> {
    [ProgramTURI]: ProgramTInterpreters
  }

  interface ProgramTInterpreters {}
}
