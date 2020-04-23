import { OfType, OfType2 } from '@morphic-ts/common/lib/core'
import { URIS, Kind, URIS2, Kind2, HKT2 } from '@morphic-ts/common/lib//HKT'
import { AnyEnv } from '@morphic-ts/common/lib/config'
/**
 *  @since 0.0.1
 */
export const IntersectionURI = 'IntersectionURI' as const
/**
 *  @since 0.0.1
 */
export type IntersectionURI = typeof IntersectionURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F, Env> {
    [IntersectionURI]: ModelAlgebraIntersection<F, Env>
  }
  export interface Algebra1<F extends URIS, Env extends AnyEnv> {
    [IntersectionURI]: ModelAlgebraIntersection1<F, Env>
  }
  export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
    [IntersectionURI]: ModelAlgebraIntersection2<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraIntersection<F, Env> {
  _F: F
  intersection: {
    <A, B, LA, LB>(types: [HKT2<F, Env, LA, A>, HKT2<F, Env, LB, B>], name: string): HKT2<F, Env, LA & LB, A & B>
    <A, B, C, LA, LB, LC>(types: [HKT2<F, Env, LA, A>, HKT2<F, Env, LB, B>, HKT2<F, Env, LC, C>], name: string): HKT2<
      F,
      Env,
      LA & LB & LC,
      A & B & C
    >
    <A, B, C, D, LA, LB, LC, LD>(
      types: [HKT2<F, Env, LA, A>, HKT2<F, Env, LB, B>, HKT2<F, Env, LC, C>, HKT2<F, Env, LD, D>],
      name: string
    ): HKT2<F, Env, LA & LB & LC & LD, A & B & C & D>
    <A, B, C, D, E, LA, LB, LC, LD, LE>(
      types: [HKT2<F, Env, LA, A>, HKT2<F, Env, LB, B>, HKT2<F, Env, LC, C>, HKT2<F, Env, LD, D>, HKT2<F, Env, LE, E>],
      name: string
    ): HKT2<F, Env, LA & LB & LC & LD & LE, A & B & C & D & E>
    <L, A, Env>(types: Array<HKT2<F, Env, L, A>>): HKT2<F, Env, Array<L>, Array<A>>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraIntersection1<F extends URIS, Env extends AnyEnv> {
  _F: F
  intersection: {
    <A, B>(types: [OfType<F, A, Env>, OfType<F, B, Env>], name: string): Kind<F, Env, A & B>
    <A, B, C, Env>(types: [OfType<F, A, Env>, OfType<F, B, Env>, OfType<F, C, Env>], name: string): Kind<
      F,
      Env,
      A & B & C
    >
    <A, B, C, D>(
      types: [OfType<F, A, Env>, OfType<F, B, Env>, OfType<F, C, Env>, OfType<F, D, Env>],
      name: string
    ): Kind<F, Env, A & B & C & D>
    <A, B, C, D, E, Env>(
      types: [OfType<F, A, Env>, OfType<F, B, Env>, OfType<F, C, Env>, OfType<F, D, Env>, OfType<F, E, Env>],
      name: string
    ): Kind<F, Env, A & B & C & D & E>
    <A, Env>(types: Array<OfType<F, A, Env>>, name: string): Kind<F, Env, Array<A>>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraIntersection2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  intersection: {
    <A, B, LA, LB>(types: [OfType2<F, LA, A, Env>, OfType2<F, LB, B, Env>], name: string): Kind2<F, Env, LA & LB, A & B>
    <A, B, C, LA, LB, LC, Env>(
      types: [OfType2<F, LA, A, Env>, OfType2<F, LB, B, Env>, OfType2<F, LC, C, Env>],
      name: string
    ): Kind2<F, Env, LA & LB & LC, A & B & C>
    <A, B, C, D, LA, LB, LC, LD>(
      types: [OfType2<F, LA, A, Env>, OfType2<F, LB, B, Env>, OfType2<F, LC, C, Env>, OfType2<F, LD, D, Env>],
      name: string
    ): Kind2<F, Env, LA & LB & LC & LD, A & B & C & D>
    <A, B, C, D, E, LA, LB, LC, LD, LE, Env>(
      types: [
        OfType2<F, LA, A, Env>,
        OfType2<F, LB, B, Env>,
        OfType2<F, LC, C, Env>,
        OfType2<F, LD, D, Env>,
        OfType2<F, LE, E, Env>
      ],
      name: string
    ): Kind2<F, Env, LA & LB & LC & LD & LE, A & B & C & D & E>
    <L, A, Env>(types: Array<OfType2<F, L, A, Env>>, name: string): Kind2<F, Env, Array<L>, Array<A>>
  }
}
