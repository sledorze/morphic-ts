import type { AnyEnv, ConfigsForType } from '@morphic-ts/common/lib/config'
import type { HKT2, Kind, Kind2, URIS, URIS2 } from '@morphic-ts/common/lib/HKT'
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
  export interface Algebra<F, Env> {
    [RefinedURI]: ModelAlgebraRefined<F, Env>
  }
  export interface Algebra1<F extends URIS, Env extends AnyEnv> {
    [RefinedURI]: ModelAlgebraRefined1<F, Env>
  }
  export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
    [RefinedURI]: ModelAlgebraRefined2<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRefined<F, Env> {
  _F: F
  refined: {
    <E, A, B extends A>(
      a: HKT2<F, Env, E, A>,
      refinement: Refinement<A, B>,
      name: string,
      config?: ConfigsForType<Env, E, B>
    ): HKT2<F, Env, E, B>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRefined1<F extends URIS, Env extends AnyEnv> {
  _F: F
  refined<A, B extends A>(
    a: Kind<F, Env, A>,
    refinement: Refinement<A, B>,
    name: string,
    config?: ConfigsForType<Env, unknown, B>
  ): Kind<F, Env, B>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRefined2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  refined<E, A, B extends A>(
    a: Kind2<F, Env, E, A>,
    refinement: Refinement<A, B>,
    name: string,
    config?: ConfigsForType<Env, E, B>
  ): Kind2<F, Env, E, B>
}
