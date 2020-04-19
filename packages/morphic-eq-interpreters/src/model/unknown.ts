import { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'
import { EqType, EqURI } from '../hkt'
import { Eq } from 'fp-ts/lib/Eq'
import { circularDeepEqual } from 'fast-equals'
import { eqApplyConfig } from '../config'

export interface CustomizeUnknown<RC> {
  compare: 'default-circular' | 'default-non-circular' | ((env: RC) => Eq<unknown>)
}

/**
 *  @since 0.0.1
 */
export const eqUnknownInterpreter: ModelAlgebraUnknown1<EqURI> = {
  _F: EqURI,
  unknown: _env => {
    const equals = circularDeepEqual
    return new EqType({ equals })
  },
  unknownCfg: cfg => env => {
    const config = eqApplyConfig(cfg)
    return new EqType(config === undefined ? { equals: circularDeepEqual } : config({ equals: circularDeepEqual }, env))
  }
}
