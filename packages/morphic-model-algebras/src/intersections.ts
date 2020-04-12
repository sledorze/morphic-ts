import { OfType, OfType2 } from '@morphic-ts/common/lib/core'
import { URIS, Kind, URIS2, Kind2, HKT2 } from '@morphic-ts/common/lib//HKT'
/**
 *  @since 0.0.1
 */
export const IntersectionURI = 'IntersectionURI' as const
/**
 *  @since 0.0.1
 */
export type IntersectionURI = typeof IntersectionURI

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraIntersection<F> {
  _F: F
  intersection: {
    <A, B, LA, LB, RCA, RCB>(types: [HKT2<F, RCA, LA, A>, HKT2<F, RCB, LB, B>], name: string): HKT2<
      F,
      RCA & RCB,
      LA & LB,
      A & B
    >
    <A, B, C, LA, LB, LC, RCA, RCB, RCC>(
      types: [HKT2<F, RCA, LA, A>, HKT2<F, RCB, LB, B>, HKT2<F, RCC, LC, C>],
      name: string
    ): HKT2<F, RCA & RCB & RCC, LA & LB & LC, A & B & C>
    <A, B, C, D, LA, LB, LC, LD, RCA, RCB, RCC, RCD>(
      types: [HKT2<F, RCA, LA, A>, HKT2<F, RCB, LB, B>, HKT2<F, RCC, LC, C>, HKT2<F, RCD, LD, D>],
      name: string
    ): HKT2<F, RCA & RCB & RCC & RCD, LA & LB & LC & LD, A & B & C & D>
    <A, B, C, D, E, LA, LB, LC, LD, LE, RCA, RCB, RCC, RCD, RCE>(
      types: [HKT2<F, RCA, LA, A>, HKT2<F, RCB, LB, B>, HKT2<F, RCC, LC, C>, HKT2<F, RCD, LD, D>, HKT2<F, RCE, LE, E>],
      name: string
    ): HKT2<F, RCA & RCB & RCC & RCD & RCE, LA & LB & LC & LD & LE, A & B & C & D & E>
    <L, A, RC>(types: Array<HKT2<F, RC, L, A>>): HKT2<F, RC, Array<L>, Array<A>>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraIntersection1<F extends URIS> {
  _F: F
  intersection: {
    <A, B, RCA, RCB>(types: [OfType<F, A, RCA>, OfType<F, B, RCB>], name: string): Kind<F, RCA & RCB, A & B>
    <A, B, C, RCA, RCB, RCC>(types: [OfType<F, A, RCA>, OfType<F, B, RCB>, OfType<F, C, RCC>], name: string): Kind<
      F,
      RCA & RCB & RCC,
      A & B & C
    >
    <A, B, C, D, RCA, RCB, RCC, RCD>(
      types: [OfType<F, A, RCA>, OfType<F, B, RCB>, OfType<F, C, RCC>, OfType<F, D, RCD>],
      name: string
    ): Kind<F, RCA & RCB & RCC & RCD, A & B & C & D>
    <A, B, C, D, E, RCA, RCB, RCC, RCD, RCE>(
      types: [OfType<F, A, RCA>, OfType<F, B, RCB>, OfType<F, C, RCC>, OfType<F, D, RCD>, OfType<F, E, RCE>],
      name: string
    ): Kind<F, RCA & RCB & RCC & RCD & RCE, A & B & C & D & E>
    <A, RC>(types: Array<OfType<F, A, RC>>, name: string): Kind<F, RC, Array<A>>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraIntersection2<F extends URIS2> {
  _F: F
  intersection: {
    <A, B, LA, LB, RCA, RCB>(types: [OfType2<F, LA, A, RCA>, OfType2<F, LB, B, RCB>], name: string): Kind2<
      F,
      RCA & RCB,
      LA & LB,
      A & B
    >
    <A, B, C, LA, LB, LC, RCA, RCB, RCC>(
      types: [OfType2<F, LA, A, RCA>, OfType2<F, LB, B, RCB>, OfType2<F, LC, C, RCC>],
      name: string
    ): Kind2<F, RCA & RCB & RCC, LA & LB & LC, A & B & C>
    <A, B, C, D, LA, LB, LC, LD, RCA, RCB, RCC, RCD>(
      types: [OfType2<F, LA, A, RCA>, OfType2<F, LB, B, RCB>, OfType2<F, LC, C, RCC>, OfType2<F, LD, D, RCD>],
      name: string
    ): Kind2<F, RCA & RCB & RCC & RCD, LA & LB & LC & LD, A & B & C & D>
    <A, B, C, D, E, LA, LB, LC, LD, LE, RCA, RCB, RCC, RCD, RCE>(
      types: [
        OfType2<F, LA, A, RCA>,
        OfType2<F, LB, B, RCB>,
        OfType2<F, LC, C, RCC>,
        OfType2<F, LD, D, RCD>,
        OfType2<F, LE, E, RCE>
      ],
      name: string
    ): Kind2<F, RCA & RCB & RCC & RCD & RCE, LA & LB & LC & LD & LE, A & B & C & D & E>
    <L, A, RC>(types: Array<OfType2<F, L, A, RC>>, name: string): Kind2<F, RC, Array<L>, Array<A>>
  }
}
