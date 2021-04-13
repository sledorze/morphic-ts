import type { AnyEnv, ConfigsForType, Named } from '@morphic-ts/common/lib/config'
import type { Kind, URIS } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export const StrMapURI = 'StrMapURI' as const
/**
 *  @since 0.0.1
 */
export type StrMapURI = typeof StrMapURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [StrMapURI]: ModelAlgebraStrMap<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface StrMapConfig<L, A> {}

/**
 *  @since 0.0.1
 */
export interface RecordConfig<LA, A, LB, B> {}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraStrMap<F extends URIS, Env extends AnyEnv> {
  _F: F
  strMap: <L, A>(
    codomain: Kind<F, Env, L, A>,
    config?: Named<ConfigsForType<Env, Readonly<Record<string, L>>, Readonly<Record<string, A>>, StrMapConfig<L, A>>>
  ) => Kind<F, Env, Readonly<Record<string, L>>, Readonly<Record<string, A>>>
  record: <LA extends string, LB, A extends string, B>(
    domain: Kind<F, Env, LA, A>,
    codomain: Kind<F, Env, LB, B>,
    config?: Named<ConfigsForType<Env, Readonly<Record<LA, LB>>, Readonly<Record<A, B>>, RecordConfig<LA, A, LB, B>>>
  ) => Kind<F, Env, Readonly<Record<LA, LB>>, Readonly<Record<A, B>>>
}
