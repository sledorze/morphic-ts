import { URIS, Kind, URIS2, Kind2, HKT2 } from '../../src/HKT'
import { GetAlgebra, Algebra, Algebra1, Algebra2 } from '../core'
import { Program } from '../../src/usage/programs-hkt'

type AllAlgebra = GetAlgebra<'Primitive' | 'Intersection' | 'Set' | 'StrMap' | 'TaggedUnions'>

export interface ModelAlgebra<F> extends Algebra<AllAlgebra, F> {}
export interface ModelAlgebra1<F extends URIS> extends Algebra1<AllAlgebra, F> {}
export interface ModelAlgebra2<F extends URIS2> extends Algebra2<AllAlgebra, F> {}

export interface AlgebraNoUnion<F> extends Algebra<AllAlgebra, F> {}
export interface AlgebraNoUnion1<F extends URIS> extends Algebra1<AllAlgebra, F> {}
export interface AlgebraNoUnion2<F extends URIS2> extends Algebra2<AllAlgebra, F> {}

export type ProgramOrderableURI = 'ProgramOrderable'

declare module '../../src/usage/programs-hkt' {
  interface Program<E, A> {
    ProgramOrderable: <G>(a: AlgebraNoUnion<G>) => HKT2<G, E, A>
  }
  interface Program1<E, A> {
    ProgramOrderable: <G extends URIS>(a: AlgebraNoUnion1<G>) => Kind<G, A>
  }
  interface Program2<E, A> {
    ProgramOrderable: <G extends URIS2>(a: AlgebraNoUnion2<G>) => Kind2<G, E, A>
  }
}

export type ProgramOrderable<E, A> = Program<E, A>[ProgramOrderableURI]
