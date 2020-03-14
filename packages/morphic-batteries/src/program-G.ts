import { GetAlgebra } from '@morphic-ts/algebras/lib/core'
import { ObjectURI } from '@morphic-ts/model-algebras/lib/object'
import { PrimitiveURI } from '@morphic-ts/model-algebras/lib/primitives'
import { InferredAlgebra, InferredProgram } from './usage/programs-infer'

/**
 *  @since 0.0.1
 */
export const ProgramGURI = 'ProgramGURI' as const
/**
 *  @since 0.0.1
 */
export type ProgramGURI = typeof ProgramGURI

/**
 *  @since 0.0.1
 */
export interface AlgebraT<F> extends InferredAlgebra<F, ProgramGURI> {}
/**
 *  @since 0.0.1
 */
export interface P<E, A> extends InferredProgram<E, A, ProgramGURI> {}

declare module './usage/ProgramType' {
  interface ProgramAlgebraURI {
    [ProgramGURI]: GetAlgebra<PrimitiveURI | ObjectURI>
  }

  interface ProgramAlgebra<F> {
    [ProgramGURI]: AlgebraT<F>
  }

  interface ProgramType<E, A> {
    [ProgramGURI]: P<E, A>
  }

  interface ProgramGypes extends Record<ProgramURI, any> {
    [ProgramGURI]: ProgramGInterpreters
  }

  interface ProgramGInterpreters {}
}
