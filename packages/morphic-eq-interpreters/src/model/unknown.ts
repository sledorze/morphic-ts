import { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'
import { EqType, EqURI } from '../hkt'
import { Eq } from 'fp-ts/lib/Eq'
import { circularDeepEqual, deepEqual } from 'fast-equals'

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface UnknownConfig<RC> {
    [EqURI]: CustomizeUnknown<RC> | undefined
  }
}

export interface CustomizeUnknown<RC> {
  compare: 'default-circular' | 'default-non-circular' | ((env: RC) => Eq<unknown>)
}

const applyCustomize = <RC>(c: { [EqURI]?: CustomizeUnknown<RC> } | undefined) =>
  c !== undefined ? c[EqURI] : undefined

/**
 *  @since 0.0.1
 */
export const eqUnknownInterpreter: ModelAlgebraUnknown1<EqURI> = {
  _F: EqURI,
  unknown: cfg => env => {
    const config = applyCustomize(cfg)
    const equals =
      config === undefined
        ? circularDeepEqual
        : config.compare === 'default-circular'
        ? circularDeepEqual
        : config.compare === 'default-non-circular'
        ? deepEqual
        : config.compare(env).equals

    return new EqType({ equals })
  }
}
