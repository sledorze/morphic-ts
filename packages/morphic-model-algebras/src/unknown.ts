import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'
import { NoEnv, ConfigsForType, ConfigsEnvs } from '@morphic-ts/common/lib/config'

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
  export interface Algebra<F> {
    [UnknownURI]: ModelAlgebraUnknown<F>
  }
  export interface Algebra1<F extends URIS> {
    [UnknownURI]: ModelAlgebraUnknown1<F>
  }
  export interface Algebra2<F extends URIS2> {
    [UnknownURI]: ModelAlgebraUnknown2<F>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown<F> {
  _F: F
  unknown: HKT2<F, NoEnv, unknown, unknown>
  unknownCfg: {
    <C extends ConfigsForType<unknown, unknown>>(config: C): HKT2<F, ConfigsEnvs<C>, unknown, unknown>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown1<F extends URIS> {
  _F: F
  unknown: Kind<F, NoEnv, unknown>
  unknownCfg<C extends ConfigsForType<unknown, unknown>>(config: C): Kind<F, ConfigsEnvs<C>, unknown>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown2<F extends URIS2> {
  _F: F
  unknown: Kind2<F, NoEnv, unknown, unknown>
  unknownCfg<C extends ConfigsForType<unknown, unknown>>(config: C): Kind2<F, ConfigsEnvs<C>, unknown, unknown>
}
