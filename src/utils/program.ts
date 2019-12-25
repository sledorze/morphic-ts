import { Kind, URIS, URIS2, Kind2, HKT2 } from '../../src/HKT'
import { GetAlgebra, Algebra, Algebra1, Algebra2 } from '../core'
import { Program1, Program2 } from '../../src/usage/programs-hkt'

type AllAlgebra = GetAlgebra<
  'Primitive' | 'Intersection' | 'Object' | 'Recursive' | 'Set' | 'StrMap' | 'TaggedUnions' | 'Unions'
>

export interface ModelAlgebra<F> extends Algebra<AllAlgebra, F> {}
export interface ModelAlgebra1<F extends URIS> extends Algebra1<AllAlgebra, F> {}
export interface ModelAlgebra2<F extends URIS2> extends Algebra2<AllAlgebra, F> {}

export interface AlgebraUnion<F> extends Algebra<AllAlgebra, F> {}
export interface AlgebraUnion1<F extends URIS> extends Algebra1<AllAlgebra, F> {}
export interface AlgebraUnion2<F extends URIS2> extends Algebra2<AllAlgebra, F> {}

export type ProgramUnionURI = 'ProgramUnion'

export interface ProgramUnion<E, A> {
  <G extends URIS>(a: AlgebraUnion1<G>): Kind<G, A>
  <G extends URIS2>(a: AlgebraUnion2<G>): Kind2<G, E, A>
}
export interface P<E, A> {
  <G>(a: AlgebraUnion<G>): HKT2<G, E, A>
}

declare module '../../src/usage/programs-hkt' {
  interface Program<E, A> {
    ProgramUnion: P<E, A>
  }

  export interface ProgramTypes extends Record<Program1URI, any> {
    ProgramUnion: ProgramUnionInterpreters
  }
  interface ProgramUnionInterpreters {}

  interface AllProgram<E, A> {
    ProgramUnion: ProgramUnion<E, A>
  }

  interface Program1<E, A> {
    ProgramUnion: <G extends URIS>(a: AlgebraUnion1<G>) => Kind<G, A>
  }
  interface Program2<E, A> {
    ProgramUnion: <G extends URIS2>(a: AlgebraUnion2<G>) => Kind2<G, E, A>
  }
}

export type ProgramUnion1<E, A> = Program1<E, A>[ProgramUnionURI]
export type ProgramUnion2<E, A> = Program2<E, A>[ProgramUnionURI]
