import { OfType, OfType2 } from '../common/core'
import { URIS, Kind, URIS2, Kind2, HKT2 } from '../common/HKT'

export const UnionsURI = Symbol()
export type UnionsURI = typeof UnionsURI

declare module '../algebras/hkt' {
  interface Algebra<F> {
    [UnionsURI]: ModelAlgebraUnions<F>
  }
  interface Algebra1<F extends URIS> {
    [UnionsURI]: ModelAlgebraUnions1<F>
  }
  interface Algebra2<F extends URIS2> {
    [UnionsURI]: ModelAlgebraUnions2<F>
  }
}

export interface ModelAlgebraUnions<F> {
  union<A, B, LA, LB>(types: [HKT2<F, LA, A>, HKT2<F, LB, B>], name: string): HKT2<F, LA | LB, A | B>
  union<A, B, C, LA, LB, LC>(
    types: [HKT2<F, LA, A>, HKT2<F, LB, B>, HKT2<F, LC, C>],
    name: string
  ): HKT2<F, LA | LB | LC, A | B | C>
  union<A, B, C, D, LA, LB, LC, LD>(
    types: [HKT2<F, LA, A>, HKT2<F, LB, B>, HKT2<F, LC, C>, HKT2<F, LD, D>],
    name: string
  ): HKT2<F, LA | LB | LC | LD, A | B | C | D>
  union<A, B, C, D, E, LA, LB, LC, LD, LE>(
    types: [HKT2<F, LA, A>, HKT2<F, LB, B>, HKT2<F, LC, C>, HKT2<F, LD, D>, HKT2<F, LE, E>],
    name: string
  ): HKT2<F, LA | LB | LC | LD | LE, A | B | C | D | E>
  union<L, A>(types: Array<HKT2<F, L, A>>, name: string): HKT2<F, Array<L>, Array<A>>
}

export interface ModelAlgebraUnions1<F extends URIS> {
  union<A, B>(types: [OfType<F, A>, OfType<F, B>], name: string): Kind<F, A | B>
  union<A, B, C>(types: [OfType<F, A>, OfType<F, B>, OfType<F, C>], name: string): Kind<F, A | B | C>
  union<A, B, C, D>(
    types: [OfType<F, A>, OfType<F, B>, OfType<F, C>, OfType<F, D>],
    name: string
  ): Kind<F, A | B | C | D>
  union<A, B, C, D, E>(
    types: [OfType<F, A>, OfType<F, B>, OfType<F, C>, OfType<F, D>, OfType<F, E>],
    name: string
  ): Kind<F, A | B | C | D | E>
  union<A>(types: Array<OfType<F, A>>, name: string): Kind<F, Array<A>>
}

export interface ModelAlgebraUnions2<F extends URIS2> {
  union<A, B, LA, LB>(types: [OfType2<F, LA, A>, OfType2<F, LB, B>], name: string): Kind2<F, LA | LB, A | B>
  union<A, B, C, LA, LB, LC>(
    types: [OfType2<F, LA, A>, OfType2<F, LB, B>, OfType2<F, LC, C>],
    name: string
  ): Kind2<F, LA | LB | LC, A | B | C>
  union<A, B, C, D, LA, LB, LC, LD>(
    types: [OfType2<F, LA, A>, OfType2<F, LB, B>, OfType2<F, LC, C>, OfType2<F, LD, D>],
    name: string
  ): Kind2<F, LA | LB | LC | LD, A | B | C | D>
  union<A, B, C, D, E, LA, LB, LC, LD, LE>(
    types: [OfType2<F, LA, A>, OfType2<F, LB, B>, OfType2<F, LC, C>, OfType2<F, LD, D>, OfType2<F, LE, E>],
    name: string
  ): Kind2<F, LA | LB | LC | LD | LE, A | B | C | D | E>
  union<L, A>(types: Array<OfType2<F, L, A>>, name: string): Kind2<F, Array<L>, Array<A>>
}

export type ArrayType<X> = X extends Array<infer A> ? A : never
