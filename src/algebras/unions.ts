import { OfType, OfType2 } from '../core'
import { URIS, Kind, URIS2, Kind2, HKT2 } from '../HKT'

export const URI = 'Unions'
export type URI = typeof URI

declare module './hkt' {
  interface Algebra<F> {
    Unions: ModelAlgebraUnions<F>
  }
  interface Algebra1<F extends URIS> {
    Unions: ModelAlgebraUnions1<F>
  }
  interface Algebra2<F extends URIS2> {
    Unions: ModelAlgebraUnions2<F>
  }
}

export interface ModelAlgebraUnions<F> {
  union<A, B, LA, LB>(types: [HKT2<F, LA, A>, HKT2<F, LB, B>]): HKT2<F, LA | LB, A | B>
  union<A, B, C, LA, LB, LC>(types: [HKT2<F, LA, A>, HKT2<F, LB, B>, HKT2<F, LC, C>]): HKT2<F, LA | LB | LC, A | B | C>
  union<A, B, C, D, LA, LB, LC, LD>(
    types: [HKT2<F, LA, A>, HKT2<F, LB, B>, HKT2<F, LC, C>, HKT2<F, LD, D>]
  ): HKT2<F, LA | LB | LC | LD, A | B | C | D>
  union<A, B, C, D, E, LA, LB, LC, LD, LE>(
    types: [HKT2<F, LA, A>, HKT2<F, LB, B>, HKT2<F, LC, C>, HKT2<F, LD, D>, HKT2<F, LE, E>]
  ): HKT2<F, LA | LB | LC | LD | LE, A | B | C | D | E>
  union<L, A>(types: Array<HKT2<F, L, A>>): HKT2<F, Array<L>, Array<A>>
}

export interface ModelAlgebraUnions1<F extends URIS> {
  union<A, B>(types: [OfType<F, A>, OfType<F, B>]): Kind<F, A | B>
  union<A, B, C>(types: [OfType<F, A>, OfType<F, B>, OfType<F, C>]): Kind<F, A | B | C>
  union<A, B, C, D>(types: [OfType<F, A>, OfType<F, B>, OfType<F, C>, OfType<F, D>]): Kind<F, A | B | C | D>
  union<A, B, C, D, E>(
    types: [OfType<F, A>, OfType<F, B>, OfType<F, C>, OfType<F, D>, OfType<F, E>]
  ): Kind<F, A | B | C | D | E>
  union<A>(types: Array<OfType<F, A>>): Kind<F, Array<A>>
}

export interface ModelAlgebraUnions2<F extends URIS2> {
  union<A, B, LA, LB>(types: [OfType2<F, LA, A>, OfType2<F, LB, B>]): Kind2<F, LA | LB, A | B>
  union<A, B, C, LA, LB, LC>(
    types: [OfType2<F, LA, A>, OfType2<F, LB, B>, OfType2<F, LC, C>]
  ): Kind2<F, LA | LB | LC, A | B | C>
  union<A, B, C, D, LA, LB, LC, LD>(
    types: [OfType2<F, LA, A>, OfType2<F, LB, B>, OfType2<F, LC, C>, OfType2<F, LD, D>]
  ): Kind2<F, LA | LB | LC | LD, A | B | C | D>
  union<A, B, C, D, E, LA, LB, LC, LD, LE>(
    types: [OfType2<F, LA, A>, OfType2<F, LB, B>, OfType2<F, LC, C>, OfType2<F, LD, D>, OfType2<F, LE, E>]
  ): Kind2<F, LA | LB | LC | LD | LE, A | B | C | D | E>
  union<L, A>(types: Array<OfType2<F, L, A>>): Kind2<F, Array<L>, Array<A>>
}

export type ArrayType<X> = X extends Array<infer A> ? A : never
