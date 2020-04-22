import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'
import { ConfigsForType, AnyEnv } from '@morphic-ts/common/lib/config'

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
  export interface Algebra<F, Env> {
    [UnknownURI]: ModelAlgebraUnknown<F, Env>
  }
  export interface Algebra1<F extends URIS, Env extends AnyEnv> {
    [UnknownURI]: ModelAlgebraUnknown1<F, Env>
  }
  export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
    [UnknownURI]: ModelAlgebraUnknown2<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown<F, Env> {
  _F: F
  unknown: {
    (config?: ConfigsForType<Env, unknown, unknown>): HKT2<F, Env, unknown, unknown>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown1<F extends URIS, Env extends AnyEnv> {
  _F: F
  unknown(config?: ConfigsForType<Env, unknown, unknown>): Kind<F, Env, unknown>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  unknown(config?: ConfigsForType<Env, unknown, unknown>): Kind2<F, Env, unknown, unknown>
}
