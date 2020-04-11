import { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'
import { EqType, EqURI } from '../hkt'
import { Eq } from 'fp-ts/lib/Eq'
import { circularDeepEqual } from 'fast-equals'
import {} from '@morphic-ts/algebras/lib/hkt'
import {} from '@morphic-ts/common/lib/HKT'

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface UnknownConfig<RC> {
    [EqURI]: CustomizeUnknown<RC> | undefined
  }
}

export interface CustomizeUnknown<RC> {
  compare: 'default-circular' | 'default-non-circular' | ((env: RC) => Eq<unknown>)
}

/**
 *  @since 0.0.1
 */
export const eqUnknownInterpreter: ModelAlgebraUnknown1<EqURI> = {
  _F: EqURI,
  unknown: () => _env => {
    const equals = circularDeepEqual
    return new EqType({ equals })
  },
  unknownCfg: _cfg => _env => {
    // getApplyConfig(EqType)
    // const config = applyCustomize2(cfg)
    // config()
    // const equals =
    //   config === undefined
    //     ? circularDeepEqual
    //     : config.compare === 'default-circular'
    //     ? circularDeepEqual
    //     : config.compare === 'default-non-circular'
    //     ? deepEqual
    //     : config.compare(env).equals

    const equals = circularDeepEqual

    return new EqType({ equals })
  }
}
