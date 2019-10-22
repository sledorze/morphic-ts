import { OfType, OfType2, M } from '../core'
import { URIS, Kind, URIS2, Kind2 } from '../HKT'

export interface ModelAlgebraUnions {
  union<A, B, LA, LB>(types: [M<LA, A>, M<LB, B>]): M<LA | LB, A | B>
  union<A, B, C, LA, LB, LC>(types: [M<LA, A>, M<LB, B>, M<LC, C>]): M<LA | LB | LC, A | B | C>
  union<A, B, C, D, LA, LB, LC, LD>(
    types: [M<LA, A>, M<LB, B>, M<LC, C>, M<LD, D>]
  ): M<LA | LB | LC | LD, A | B | C | D>
  union<A, B, C, D, E, LA, LB, LC, LD, LE>(
    types: [M<LA, A>, M<LB, B>, M<LC, C>, M<LD, D>, M<LE, E>]
  ): M<LA | LB | LC | LD | LE, A | B | C | D | E>
  union<L, A>(types: Array<M<L, A>>): M<Array<L>, Array<A>>
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
