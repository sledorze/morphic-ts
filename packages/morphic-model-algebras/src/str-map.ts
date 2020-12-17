import type { AnyEnv, ConfigsForType } from '@morphic-ts/common/lib/config'
import type { HKT2, Kind, Kind2, URIS, URIS2 } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export const StrMapURI = 'StrMapURI' as const
/**
 *  @since 0.0.1
 */
export type StrMapURI = typeof StrMapURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F, Env> {
    [StrMapURI]: ModelAlgebraStrMap<F, Env>
  }
  export interface Algebra1<F extends URIS, Env extends AnyEnv> {
    [StrMapURI]: ModelAlgebraStrMap1<F, Env>
  }
  export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
    [StrMapURI]: ModelAlgebraStrMap2<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraStrMap<F, Env> {
  _F: F
  strMap: {
    <L, A>(
      codomain: HKT2<F, Env, L, A>,
      config?: ConfigsForType<Env, Readonly<Record<string, L>>, Readonly<Record<string, A>>>
    ): HKT2<F, Env, Readonly<Record<string, L>>, Readonly<Record<string, A>>>
  }
  record: {
    <LA extends string, LB, A extends string, B>(
      domain: HKT2<F, Env, LA, A>,
      codomain: HKT2<F, Env, LB, B>,
      config?: ConfigsForType<Env, Readonly<Record<LA, LB>>, Readonly<Record<A, B>>>
    ): HKT2<F, Env, Readonly<Record<LA, LB>>, Readonly<Record<A, B>>>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraStrMap1<F extends URIS, Env extends AnyEnv> {
  _F: F
  strMap: <A>(
    codomain: Kind<F, Env, A>,
    config?: ConfigsForType<Env, unknown, Readonly<Record<string, A>>>
  ) => Kind<F, Env, Readonly<Record<string, A>>>
  record: <A extends string, B>(
    domain: Kind<F, Env, A>,
    codomain: Kind<F, Env, B>,
    config?: ConfigsForType<Env, unknown, Readonly<Record<A, B>>>
  ) => Kind<F, Env, Readonly<Record<A, B>>>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraStrMap2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  strMap: <L, A>(
    codomain: Kind2<F, Env, L, A>,
    config?: ConfigsForType<Env, Readonly<Record<string, L>>, Readonly<Record<string, A>>>
  ) => Kind2<F, Env, Readonly<Record<string, L>>, Readonly<Record<string, A>>>
  record: <LA extends string, LB, A extends string, B>(
    domain: Kind2<F, Env, LA, A>,
    codomain: Kind2<F, Env, LB, B>,
    config?: ConfigsForType<Env, Readonly<Record<LA, LB>>, Readonly<Record<A, B>>>
  ) => Kind2<F, Env, Readonly<Record<LA, LB>>, Readonly<Record<A, B>>>
}
