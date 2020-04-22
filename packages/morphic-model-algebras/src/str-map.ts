import { Kind, URIS, Kind2, URIS2, HKT2 } from '@morphic-ts/common/lib/HKT'
import { ConfigsForType, AnyEnv } from '@morphic-ts/common/lib/config'

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
    <L, A>(codomain: HKT2<F, Env, L, A>): HKT2<F, Env, Record<string, L>, Record<string, A>>
  }
  strMapCfg: {
    <L, A>(codomain: HKT2<F, Env, L, A>): <C extends ConfigsForType<Env, Record<string, L>, Record<string, A>>>(
      config: C
    ) => HKT2<F, Env, Record<string, L>, Record<string, A>>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraStrMap1<F extends URIS, Env extends AnyEnv> {
  _F: F
  strMap: <A>(codomain: Kind<F, Env, A>) => Kind<F, Env, Record<string, A>>
  strMapCfg: <A>(
    codomain: Kind<F, Env, A>
  ) => <C extends ConfigsForType<Env, unknown, Record<string, A>>>(config: C) => Kind<F, Env, Record<string, A>>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraStrMap2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  strMap: <L, A>(codomain: Kind2<F, Env, L, A>) => Kind2<F, Env, Record<string, L>, Record<string, A>>
  strMapCfg: <L, A>(
    codomain: Kind2<F, Env, L, A>
  ) => <C extends ConfigsForType<Env, Record<string, L>, Record<string, A>>>(
    config: C
  ) => Kind2<F, Env, Record<string, L>, Record<string, A>>
}
