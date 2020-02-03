import { URIS2, Kind2, URIS, Kind, HKT2 } from '@sledorze/morphic-common/lib/HKT'
import { ByInterp, isOptionalConfig } from '@sledorze/morphic-common/lib/core'
import { UnknownConfig } from '@sledorze/morphic-algebras/lib/hkt'

/**
 *  @since 0.0.1
 */
export type Keys = Record<string, null>

/**
 *  @since 0.0.1
 */
export const UnknownURI = Symbol()
/**
 *  @since 0.0.1
 */
export type UnknownURI = typeof UnknownURI

declare module '@sledorze/morphic-algebras/lib/hkt' {
  interface Algebra<F> {
    [UnknownURI]: ModelAlgebraUnknown<F>
  }
  interface Algebra1<F extends URIS> {
    [UnknownURI]: ModelAlgebraUnknown1<F>
  }
  interface Algebra2<F extends URIS2> {
    [UnknownURI]: ModelAlgebraUnknown2<F>
  }

  /**
   *  @since 0.0.1
   */
  export interface UnknownConfig {}
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown<F> {
  _F: F
  unknown: {
    (): isOptionalConfig<UnknownConfig, HKT2<F, unknown, unknown>>
    (config?: ByInterp<UnknownConfig, URIS | URIS2>): HKT2<F, unknown, unknown>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown1<F extends URIS> {
  _F: F
  unknown(config?: ByInterp<UnknownConfig, F>): Kind<F, unknown>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnknown2<F extends URIS2> {
  _F: F
  unknown(config?: ByInterp<UnknownConfig, F>): Kind2<F, unknown, unknown>
}
