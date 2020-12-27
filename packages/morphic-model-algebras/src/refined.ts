import type { AnyEnv, ConfigsForType } from '@morphic-ts/common/lib/config'
import type { Kind, URIS } from '@morphic-ts/common/lib/HKT'
import type { Refinement } from 'fp-ts/function'

/**
 *  @since 0.0.1
 */
export const RefinedURI = 'RefinedURI' as const
/**
 *  @since 0.0.1
 */
export type RefinedURI = typeof RefinedURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [RefinedURI]: ModelAlgebraRefined<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRefined<F extends URIS, Env extends AnyEnv> {
  _F: F
  refined<E, A, B extends A>(
    a: Kind<F, Env, E, A>,
    refinement: Refinement<A, B>,
    name: string,
    config?: ConfigsForType<Env, E, B>
  ): Kind<F, Env, E, B>
}
