import type { Kind, URIS } from '@morphic-ts/common/lib//HKT'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { OfType } from '@morphic-ts/common/lib/core'
/**
 *  @since 0.0.1
 */
export const IntersectionURI = 'IntersectionURI' as const
/**
 *  @since 0.0.1
 */
export type IntersectionURI = typeof IntersectionURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [IntersectionURI]: ModelAlgebraIntersection<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraIntersection<F extends URIS, Env extends AnyEnv> {
  _F: F
  intersection: {
    <A, B, LA, LB>(types: [OfType<F, LA, A, Env>, OfType<F, LB, B, Env>], name: string): Kind<F, Env, LA & LB, A & B>
    <A, B, C, LA, LB, LC, Env>(
      types: [OfType<F, LA, A, Env>, OfType<F, LB, B, Env>, OfType<F, LC, C, Env>],
      name: string
    ): Kind<F, Env, LA & LB & LC, A & B & C>
    <A, B, C, D, LA, LB, LC, LD>(
      types: [OfType<F, LA, A, Env>, OfType<F, LB, B, Env>, OfType<F, LC, C, Env>, OfType<F, LD, D, Env>],
      name: string
    ): Kind<F, Env, LA & LB & LC & LD, A & B & C & D>
    <A, B, C, D, E, LA, LB, LC, LD, LE, Env>(
      types: [
        OfType<F, LA, A, Env>,
        OfType<F, LB, B, Env>,
        OfType<F, LC, C, Env>,
        OfType<F, LD, D, Env>,
        OfType<F, LE, E, Env>
      ],
      name: string
    ): Kind<F, Env, LA & LB & LC & LD & LE, A & B & C & D & E>
    <L, A, Env>(types: Array<OfType<F, L, A, Env>>, name: string): Kind<F, Env, Array<L>, Array<A>>
  }
}
