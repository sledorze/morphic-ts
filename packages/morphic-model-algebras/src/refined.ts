import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'
import { ByInterp, isOptionalConfig } from '@morphic-ts/common/lib/core'
import { RefinedConfig } from '@morphic-ts/algebras/lib/hkt'
import { Branded } from 'io-ts' // TODO: question that dependency..
import { Refinement } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export const RefinedURI = 'RefinedURI' as const
/**
 *  @since 0.0.1
 */
export type RefinedURI = typeof RefinedURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F> {
    [RefinedURI]: ModelAlgebraRefined<F>
  }
  export interface Algebra1<F extends URIS> {
    [RefinedURI]: ModelAlgebraRefined1<F>
  }
  export interface Algebra2<F extends URIS2> {
    [RefinedURI]: ModelAlgebraRefined2<F>
  }

  /**
   *  @since 0.0.1
   */
  export interface RefinedConfig<E, A> {}
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRefined<F> {
  _F: F
  refined: {
    <E, A, N extends string, B extends { readonly [K in N]: symbol }>(
      a: HKT2<F, E, A>,
      refinement: Refinement<A, Branded<A, B>>,
      name: N
    ): isOptionalConfig<RefinedConfig<E, A>, HKT2<F, E, Branded<A, B>>>
    <E, A, N extends string, B extends { readonly [K in N]: symbol }>(
      a: HKT2<F, E, A>,
      refinement: Refinement<A, Branded<A, B>>,
      name: N,
      config: ByInterp<RefinedConfig<E, A>, URIS | URIS2>
    ): HKT2<F, E, Branded<A, B>>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRefined1<F extends URIS> {
  _F: F
  refined<A, N extends string, B extends { readonly [K in N]: symbol }>(
    a: Kind<F, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N,
    config: ByInterp<RefinedConfig<unknown, A>, F>
  ): Kind<F, Branded<A, B>>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRefined2<F extends URIS2> {
  _F: F
  refined<E, A, N extends string, B extends { readonly [K in N]: symbol }>(
    a: Kind2<F, E, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N,
    config: ByInterp<RefinedConfig<E, A>, F>
  ): Kind2<F, E, Branded<A, B>>
}
