import type { Kind, URIS_ } from './HKT'

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
export interface GenConfig<A, R> {
  (a: A, r: R): A
}

/**
 *  @since 0.0.1
 */
export type NoEnv = unknown

/**
 *  @since 0.0.1
 */
export type MapToGenConfig<R extends AnyEnv, T extends URISIndexedAny> = {
  [k in URIS_]?: GenConfig<T[k], R[k]>
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
export type ConfigsForType<R extends AnyEnv, E, A> = MapToGenConfig<R, ConfigType<E, A>>

/**
 *  @since 0.0.1
 */
export const getApplyConfig: <Uri extends URIS_>(
  uri: Uri
) => <E, A, R extends Record<typeof uri, any>>(
  config?: { [k in Uri]?: GenConfig<ConfigType<E, A>[Uri], R> }
) => GenConfig<ConfigType<E, A>[Uri], R> = uri => config => (a, r) =>
  ((config && config[uri] ? config[uri] : <A>(a: A) => a) as any)(a, r[uri])
