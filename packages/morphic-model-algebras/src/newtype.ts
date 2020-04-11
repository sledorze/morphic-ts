import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'
import { ConfigsForType, ConfigsEnvs } from '@morphic-ts/common/lib/config'
import { Newtype } from 'newtype-ts'
/**
 *  @since 0.0.1
 */
export const NewtypeURI = 'NewtypeURI' as const
/**
 *  @since 0.0.1
 */
export type NewtypeURI = typeof NewtypeURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F> {
    [NewtypeURI]: ModelAlgebraNewtype<F>
  }
  export interface Algebra1<F extends URIS> {
    [NewtypeURI]: ModelAlgebraNewtype1<F>
  }
  export interface Algebra2<F extends URIS2> {
    [NewtypeURI]: ModelAlgebraNewtype2<F>
  }

  /**
   *  @since 0.0.1
   */
  export interface NewtypeConfig<RC, E, A> {}
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
export interface ModelAlgebraNewtype<F> {
  _F: F
  newtype: <N extends AnyNewtype = never>(
    name: string
  ) => {
    <E, R>(a: HKT2<F, R, E, NewtypeA<N>>): HKT2<F, R, E, N>
  }
  newtypeCfg: <N extends AnyNewtype = never>(
    name: string
  ) => {
    <E, R>(a: HKT2<F, R, E, NewtypeA<N>>): <C extends ConfigsForType<E, N>>(
      config: C
    ) => HKT2<F, R & ConfigsEnvs<C>, E, N>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraNewtype1<F extends URIS> {
  _F: F
  newtype<N extends AnyNewtype = never>(
    name: string // on purpose type relaxation `Kind<F, R, N>` instead of `Kind<F, R, NewtypeA<N>>`
  ): <R>(a: Kind<F, R, N>) => Kind<F, R, N>
  newtypeCfg<N extends AnyNewtype = never>(
    name: string // on purpose type relaxation `Kind<F, R, N>` instead of `Kind<F, R, NewtypeA<N>>`
  ): <R>(a: Kind<F, R, N>) => <C extends ConfigsForType<unknown, N>>(config: C) => Kind<F, R & ConfigsEnvs<C>, N>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraNewtype2<F extends URIS2> {
  _F: F
  newtype<N extends AnyNewtype = never>(
    name: string // on purpose type relaxation `Kind<F, R, N>` instead of `Kind<F, R, NewtypeA<N>>`
  ): <E, R>(a: Kind2<F, R, E, N>) => Kind2<F, R, E, N>
  newtypeCfg<N extends AnyNewtype = never>(
    name: string // on purpose type relaxation `Kind<F, R, N>` instead of `Kind<F, R, NewtypeA<N>>`
  ): <E, R>(a: Kind2<F, R, E, N>) => <C extends ConfigsForType<E, N>>(config: C) => Kind2<F, R & ConfigsEnvs<C>, E, N>
}
