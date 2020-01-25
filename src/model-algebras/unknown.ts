import { URIS2, Kind2, URIS, Kind, HKT2 } from '../common/HKT'
import { ByInterp, isOptionalConfig } from '../common/core'
import { UnknownConfig } from '../algebras/hkt'

export type Keys = Record<string, null>

export const UnknownURI = Symbol()
export type UnknownURI = typeof UnknownURI

declare module '../algebras/hkt' {
  interface Algebra<F> {
    [UnknownURI]: ModelAlgebraUnknown<F>
  }
  interface Algebra1<F extends URIS> {
    [UnknownURI]: ModelAlgebraUnknown1<F>
  }
  interface Algebra2<F extends URIS2> {
    [UnknownURI]: ModelAlgebraUnknown2<F>
  }

  export interface UnknownConfig {}
}

export interface ModelAlgebraUnknown<F> {
  unknown(): isOptionalConfig<
    UnknownConfig,
    HKT2<F, unknown, unknown>,
    'Requiring some config via unknown({ <Interp>: ...  })'
  >
  unknown(config: ByInterp<UnknownConfig, URIS | URIS2>): HKT2<F, unknown, unknown>
}

export interface ModelAlgebraUnknown1<F extends URIS> {
  unknown(config?: ByInterp<UnknownConfig, F>): Kind<F, unknown>
}

export interface ModelAlgebraUnknown2<F extends URIS2> {
  unknown(config?: ByInterp<UnknownConfig, F>): Kind2<F, unknown, unknown>
}
