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
  export interface RefinedConfig<RC, E, A> {}
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRefined<F> {
  _F: F
  refined: {
    <E, A, N extends string, B extends { readonly [K in N]: symbol }, R>(
      a: HKT2<F, R, E, A>,
      refinement: Refinement<A, Branded<A, B>>,
      name: N
    ): isOptionalConfig<RefinedConfig<R, E, A>, HKT2<F, R, E, Branded<A, B>>>
  }
  refinedCfg: {
    <E, A, N extends string, B extends { readonly [K in N]: symbol }, R>(
      a: HKT2<F, R, E, A>,
      refinement: Refinement<A, Branded<A, B>>,
      name: N
    ): <RC>(config: ByInterp<RefinedConfig<RC, E, A>, URIS | URIS2>) => HKT2<F, R & RC, E, Branded<A, B>>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRefined1<F extends URIS> {
  _F: F
  refined<A, N extends string, B extends { readonly [K in N]: symbol }, R>(
    a: Kind<F, R, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N
  ): Kind<F, R, A> // not Branded<A, B>, on purpose,
  refinedCfg<A, N extends string, B extends { readonly [K in N]: symbol }, R>(
    a: Kind<F, R, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N
  ): <RC>(config: ByInterp<RefinedConfig<RC, unknown, A>, F>) => Kind<F, R & RC, A> // not Branded<A, B>, on purpose
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRefined2<F extends URIS2> {
  _F: F
  refined<E, A, N extends string, B extends { readonly [K in N]: symbol }, R>(
    a: Kind2<F, R, E, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N
  ): Kind2<F, R, E, A> // not Branded<A, B>, on purpose
  refinedCfg<E, A, N extends string, B extends { readonly [K in N]: symbol }, R>(
    a: Kind2<F, R, E, A>,
    refinement: Refinement<A, Branded<A, B>>,
    name: N
  ): <RC>(config: ByInterp<RefinedConfig<RC, E, A>, F>) => Kind2<F, R & RC, E, A> // not Branded<A, B>, on purpose
}
