import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'
import { ConfigsForType, AnyEnv } from '@morphic-ts/common/lib/config'
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
  export interface Algebra<F, Env> {
    [NewtypeURI]: ModelAlgebraNewtype<F, Env>
  }
  export interface Algebra1<F extends URIS, Env extends AnyEnv> {
    [NewtypeURI]: ModelAlgebraNewtype1<F, Env>
  }
  export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
    [NewtypeURI]: ModelAlgebraNewtype2<F, Env>
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
export interface ModelAlgebraNewtype<F, Env> {
  _F: F
  newtype: <N extends AnyNewtype = never>(
    name: string
  ) => {
    <E>(a: HKT2<F, Env, E, NewtypeA<N>>): HKT2<F, Env, E, N>
  }
  newtypeCfg: <N extends AnyNewtype = never>(
    name: string
  ) => {
    <E>(a: HKT2<F, Env, E, NewtypeA<N>>): (config: ConfigsForType<Env, E, N>) => HKT2<F, Env, E, N>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraNewtype1<F extends URIS, Env> {
  _F: F
  newtype<N extends AnyNewtype = never>(
    name: string // on purpose type relaxation `Kind<F, R, N>` instead of `Kind<F, R, NewtypeA<N>>`
  ): (a: Kind<F, Env, N>) => Kind<F, Env, N>
  newtypeCfg<N extends AnyNewtype = never>(
    name: string // on purpose type relaxation `Kind<F, R, N>` instead of `Kind<F, R, NewtypeA<N>>`
  ): (a: Kind<F, Env, N>) => (config: ConfigsForType<Env, unknown, N>) => Kind<F, Env, N>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraNewtype2<F extends URIS2, Env> {
  _F: F
  newtype<N extends AnyNewtype = never>(
    name: string // on purpose type relaxation `Kind<F, R, N>` instead of `Kind<F, R, NewtypeA<N>>`
  ): <E>(a: Kind2<F, Env, E, N>) => Kind2<F, Env, E, N>
  newtypeCfg<N extends AnyNewtype = never>(
    name: string // on purpose type relaxation `Kind<F, R, N>` instead of `Kind<F, R, NewtypeA<N>>`
  ): <E>(a: Kind2<F, Env, E, N>) => (config: ConfigsForType<Env, E, N>) => Kind2<F, Env, E, N>
}
