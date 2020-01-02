import { GetAlgebra } from '../core'
import { InferredProgram, InferredAlgebra } from '../usage/programs-hkt'
import { IntersectionURI } from '../algebras/intersections'
import { ObjectURI } from '../algebras/object'
import { PrimitiveURI } from '../algebras/primitives'
import { RecursiveURI } from '../algebras/recursive'
import { SetURI } from '../algebras/set'
import { StrMapURI } from '../algebras/str-map'
import { TaggedUnionsURI } from '../algebras/tagged-unions'
import { UnionsURI } from '../algebras/unions'

export const ProgramUnionURI = Symbol()
export type ProgramUnionURI = typeof ProgramUnionURI

export interface AlgebraUnion<F> extends InferredAlgebra<F, ProgramUnionURI> {}
export interface P<E, A> extends InferredProgram<E, A, ProgramUnionURI> {}

declare module '../../src/usage/programs-hkt' {
  interface ProgramAlgebraURI {
    [ProgramUnionURI]: GetAlgebra<
      PrimitiveURI | IntersectionURI | ObjectURI | RecursiveURI | SetURI | StrMapURI | TaggedUnionsURI | UnionsURI
    >
  }
  interface ProgramAlgebra<F> {
    [ProgramUnionURI]: AlgebraUnion<F>
  }
  interface Program<E, A> {
    [ProgramUnionURI]: P<E, A>
  }
  interface ProgramTypes extends Record<ProgramURI, any> {
    [ProgramUnionURI]: ProgramUnionInterpreters
  }
  interface ProgramUnionInterpreters {}
}
