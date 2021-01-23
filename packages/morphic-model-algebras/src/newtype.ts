import type { AnyEnv, ConfigsForType } from '@morphic-ts/common/lib/config'
import type { Kind, URIS } from '@morphic-ts/common/lib/HKT'
import type { Iso, Prism } from 'monocle-ts'
import type { Newtype } from 'newtype-ts'
/**
 *  @since 0.0.1
 */
export const NewtypeURI = 'NewtypeURI' as const
/**
 *  @since 0.0.1
 */
export type NewtypeURI = typeof NewtypeURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [NewtypeURI]: ModelAlgebraNewtype<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export type AnyNewtype = Newtype<any, any>

/**
 *  @since 0.0.1
 */
export type NewtypeA<N extends AnyNewtype> = N extends Newtype<any, infer A> ? A : never

/**
 *  @since 0.0.1
 */
export type AOfIso<X> = X extends Iso<infer S, infer A> ? A : never

/**
 *  @since 0.0.1
 */
export type AOfPrism<X> = X extends Prism<infer S, infer A> ? A : never

/**
 *  @since 0.0.1
 */
export interface NewtypeConfig<L, A, N> {}

/**
 *  @since 0.0.1
 */
export interface IsoConfig<L, A, N> {}

/**
 *  @since 0.0.1
 */
export interface PrismConfig<L, A, N> {}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraNewtype<F extends URIS, Env> {
  _F: F
  newtype<N extends AnyNewtype = never>(
    name: string
  ): <E>(
    a: Kind<F, Env, E, NewtypeA<N>>,
    config?: ConfigsForType<Env, E, N, NewtypeConfig<E, NewtypeA<N>, N>>
  ) => Kind<F, Env, E, N>
  newtypeIso<E, A, N extends Newtype<any, A>>(
    iso: Iso<A, N>,
    a: Kind<F, Env, E, A>,
    name: string,
    config?: ConfigsForType<Env, E, N, IsoConfig<E, A, N>>
  ): Kind<F, Env, E, N>
  newtypePrism: {
    <E, A, N extends Newtype<any, A>>(
      prism: Prism<A, N>,
      a: Kind<F, Env, E, A>,
      name: string,
      config?: ConfigsForType<Env, E, N, PrismConfig<E, A, N>>
    ): Kind<F, Env, E, N>
  }
}
