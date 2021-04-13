import type { AnyEnv, ConfigsForType, Named } from '@morphic-ts/common/lib/config'
import type { Kind, URIS } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export type Keys = Record<string, null>

/**
 *  @since 0.0.1
 */
export const UnknownURI = 'UnknownURI' as const
/**
 *  @since 0.0.1
 */
export type UnknownURI = typeof UnknownURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [UnknownURI]: ModelAlgebraUnknown<F, Env>
  }
}

/**
 *  @since 0.0.1
 */

export interface UnknownConfig {}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown<F extends URIS, Env extends AnyEnv> {
  _F: F
  unknown(config?: Named<ConfigsForType<Env, unknown, unknown, UnknownConfig>>): Kind<F, Env, unknown, unknown>
}
