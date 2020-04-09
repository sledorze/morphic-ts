import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'
import { ByInterp, isOptionalConfig, NoEnv } from '@morphic-ts/common/lib/core'
import { UnknownConfig } from '@morphic-ts/algebras/lib/hkt'

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

  /**
   *  @since 0.0.1
   */
  export interface UnknownConfig<RC> {}
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown<F> {
  _F: F
  unknown: {
    (): isOptionalConfig<UnknownConfig<NoEnv>, HKT2<F, NoEnv, unknown, unknown>>
  }
  unknownCfg: {
    <RC>(config: ByInterp<UnknownConfig<RC>, URIS | URIS2>): HKT2<F, RC, unknown, unknown>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown1<F extends URIS> {
  _F: F
  unknown(): Kind<F, NoEnv, unknown>
  unknownCfg<RC>(config: ByInterp<UnknownConfig<RC>, F>): Kind<F, RC, unknown>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown2<F extends URIS2> {
  _F: F
  unknown(): Kind2<F, NoEnv, unknown, unknown>
  unknownCfg<RC>(config: ByInterp<UnknownConfig<RC>, F>): Kind2<F, RC, unknown, unknown>
}
