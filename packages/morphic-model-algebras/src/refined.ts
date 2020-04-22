import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'
import { Branded } from 'io-ts' // TODO: question that dependency..
import { Refinement } from 'fp-ts/lib/function'
import { ConfigsForType, AnyEnv } from '@morphic-ts/common/lib/config'

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
    <E, A, N extends string, B extends { readonly [K in N]: symbol }>(
      a: HKT2<F, Env, E, A>,
      refinement: Refinement<A, Branded<A, B>>,
      name: N
    ): HKT2<F, Env, E, Branded<A, B>>
  }
  refinedCfg: {
    <E, A, N extends string, B extends { readonly [K in N]: symbol }>(
      a: HKT2<F, Env, E, A>,
      refinement: Refinement<A, Branded<A, B>>,
      name: N
    ): <C extends ConfigsForType<Env, E, Branded<A, B>>>(config: C) => HKT2<F, Env, E, Branded<A, B>>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRefined1<F extends URIS, Env extends AnyEnv> {
  _F: F
  refined<A, N extends string, B extends { readonly [K in N]: symbol }>(
    a: Kind<F, Env, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N
  ): Kind<F, Env, Branded<A, B>>
  refinedCfg<A, N extends string, B extends { readonly [K in N]: symbol }>(
    a: Kind<F, Env, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N
  ): <C extends ConfigsForType<Env, unknown, Branded<A, B>>>(config: C) => Kind<F, Env, Branded<A, B>>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRefined2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  refined<E, A, N extends string, B extends { readonly [K in N]: symbol }>(
    a: Kind2<F, Env, E, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N
  ): Kind2<F, Env, E, Branded<A, B>>
  refinedCfg<E, A, N extends string, B extends { readonly [K in N]: symbol }>(
    a: Kind2<F, Env, E, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N
  ): <C extends ConfigsForType<Env, E, Branded<A, B>>>(config: C) => Kind2<F, Env, E, Branded<A, B>>
}
