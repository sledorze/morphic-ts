import { URIS, Kind, URIS2, Kind2, HKT2 } from '../../src/HKT'
import { GetAlgebra, Algebra, Algebra1, Algebra2 } from '../core'
import { interpretSymb } from '../usage/programs-hkt'
import { IntersectionURI } from '../algebras/intersections'
import { PrimitiveURI } from '../algebras/primitives'
import { SetURI } from '../algebras/set'
import { StrMapURI } from '../algebras/str-map'
import { TaggedUnionsURI } from '../algebras/tagged-unions'

type AllAlgebra = GetAlgebra<PrimitiveURI | IntersectionURI | SetURI | StrMapURI | TaggedUnionsURI>

export interface AlgebraNoUnion<F> extends Algebra<AllAlgebra, F> {}

export const ProgramOrderableURI = Symbol()
export type ProgramOrderableURI = typeof ProgramOrderableURI

export interface ProgramOrderable<E, A> {
  <G extends URIS>(a: Algebra1<AllAlgebra, G>): Kind<G, A>
  <G extends URIS2>(a: Algebra2<AllAlgebra, G>): Kind2<G, E, A>
}
export interface P<E, A> {
  <G>(a: AlgebraNoUnion<G>): HKT2<G, E, A>
  [interpretSymb]?: ProgramOrderable<E, A>
}

declare module '../../src/algebras/hkt' {
  interface InterpreterAlgebra<F> {
    [ProgramOrderableURI]: AlgebraNoUnion<F>
  }
}

declare module '../../src/usage/programs-hkt' {
  interface Program<E, A> {
    [ProgramOrderableURI]: P<E, A>
  }

  interface ProgramTypes extends Record<ProgramURI, any> {
    [ProgramOrderableURI]: ProgramOrderableInterpreters
  }
  interface ProgramOrderableInterpreters {}
}
