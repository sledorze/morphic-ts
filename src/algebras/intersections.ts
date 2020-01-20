import { OfType, OfType2 } from '../common/core'
import { URIS, Kind, URIS2, Kind2, HKT2 } from '../common/HKT'

export const IntersectionURI = Symbol()
export type IntersectionURI = typeof IntersectionURI

declare module './hkt' {
  interface Algebra<F> {
    [IntersectionURI]: ModelAlgebraIntersection<F>
  }
  interface Algebra1<F extends URIS> {
    [IntersectionURI]: ModelAlgebraIntersection1<F>
  }
  interface Algebra2<F extends URIS2> {
    [IntersectionURI]: ModelAlgebraIntersection2<F>
  }
}

export interface ModelAlgebraIntersection<F> {
  intersection<A, B, LA, LB>(types: [HKT2<F, LA, A>, HKT2<F, LB, B>], name: string): HKT2<F, LA & LB, A & B>
  intersection<A, B, C, LA, LB, LC>(
    types: [HKT2<F, LA, A>, HKT2<F, LB, B>, HKT2<F, LC, C>],
    name: string
  ): HKT2<F, LA & LB & LC, A & B & C>
  intersection<A, B, C, D, LA, LB, LC, LD>(
    types: [HKT2<F, LA, A>, HKT2<F, LB, B>, HKT2<F, LC, C>, HKT2<F, LD, D>],
    name: string
  ): HKT2<F, LA & LB & LC & LD, A & B & C & D>
  intersection<A, B, C, D, E, LA, LB, LC, LD, LE>(
    types: [HKT2<F, LA, A>, HKT2<F, LB, B>, HKT2<F, LC, C>, HKT2<F, LD, D>, HKT2<F, LE, E>],
    name: string
  ): HKT2<F, LA & LB & LC & LD & LE, A & B & C & D & E>
  intersection<L, A>(types: Array<HKT2<F, L, A>>): HKT2<F, Array<L>, Array<A>>
}

export interface ModelAlgebraIntersection1<F extends URIS> {
  intersection<A, B>(types: [OfType<F, A>, OfType<F, B>], name: string): Kind<F, A & B>
  intersection<A, B, C>(types: [OfType<F, A>, OfType<F, B>, OfType<F, C>], name: string): Kind<F, A & B & C>
  intersection<A, B, C, D>(
    types: [OfType<F, A>, OfType<F, B>, OfType<F, C>, OfType<F, D>],
    name: string
  ): Kind<F, A & B & C & D>
  intersection<A, B, C, D, E>(
    types: [OfType<F, A>, OfType<F, B>, OfType<F, C>, OfType<F, D>, OfType<F, E>],
    name: string
  ): Kind<F, A & B & C & D & E>
  intersection<A>(types: Array<OfType<F, A>>, name: string): Kind<F, Array<A>>
}

export interface ModelAlgebraIntersection2<F extends URIS2> {
  intersection<A, B, LA, LB>(types: [OfType2<F, LA, A>, OfType2<F, LB, B>], name: string): Kind2<F, LA & LB, A & B>
  intersection<A, B, C, LA, LB, LC>(
    types: [OfType2<F, LA, A>, OfType2<F, LB, B>, OfType2<F, LC, C>],
    name: string
  ): Kind2<F, LA & LB & LC, A & B & C>
  intersection<A, B, C, D, LA, LB, LC, LD>(
    types: [OfType2<F, LA, A>, OfType2<F, LB, B>, OfType2<F, LC, C>, OfType2<F, LD, D>],
    name: string
  ): Kind2<F, LA & LB & LC & LD, A & B & C & D>
  intersection<A, B, C, D, E, LA, LB, LC, LD, LE>(
    types: [OfType2<F, LA, A>, OfType2<F, LB, B>, OfType2<F, LC, C>, OfType2<F, LD, D>, OfType2<F, LE, E>],
    name: string
  ): Kind2<F, LA & LB & LC & LD & LE, A & B & C & D & E>
  intersection<L, A>(types: Array<OfType2<F, L, A>>, name: string): Kind2<F, Array<L>, Array<A>>
}
