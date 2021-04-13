import type { Kind, URIS, URIS_ } from './HKT'

export {
  /**
   * @since 0.0.1
   */
  Kind
}

/**
 *  @since 0.0.1
 */

export type URISIndexedAny = Readonly<Record<URIS_, any>>

/**
 *  @since 0.0.1
 */

export type AnyEnv = Partial<URISIndexedAny>

/**
 *  @since 0.0.1
 */
export interface GenConfig<A, R, K> {
  (a: A, r: R, k: K): A
}

/**
 *  @since 0.0.1
 */
export type NoEnv = unknown

/**
 *  @since 0.0.1
 */
export type MapToGenConfig<R extends AnyEnv, T extends URISIndexedAny, K> = {
  [k in URIS_]?: GenConfig<T[k], R[k], ThreadURI<K, k>>
}

/**
 *  @since 0.0.1
 */
export interface ConfigType<E, A> {
  _E: E
  _A: A
  readonly ['HKT']: never
}

/**
 *  @since 0.0.1
 */
export type ConfigsForType<R extends AnyEnv, E, A, K = {}> = MapToGenConfig<R, ConfigType<E, A>, K>

/**
 *  @since 0.0.1
 */
export type ThreadURI<C, URI extends URIS> = URI extends keyof C ? C[URI] : unknown

/**
 *  @since 0.0.1
 */
export const getApplyConfig: <Uri extends URIS_>(
  uri: Uri
) => <E, A, R extends Record<typeof uri, any>, K>(
  config?: { [k in Uri]?: GenConfig<ConfigType<E, A>[Uri], R, K> }
) => GenConfig<ConfigType<E, A>[Uri], R, K> = uri => config => (a, r, k) =>
  ((config && config[uri] ? config[uri] : <A>(a: A) => a) as any)(a, r[uri], k)

/**
 *  @since 0.0.1
 */
export type Named<A> = {
  name?: string
  conf?: A
}
