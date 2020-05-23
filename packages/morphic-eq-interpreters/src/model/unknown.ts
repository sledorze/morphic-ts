import { ModelAlgebraUnknown1 } from '@morphic-ts/model-algebras/lib/unknown'
import { EqType, EqURI } from '../hkt'
import { Eq } from 'fp-ts/lib/Eq'
import { circularDeepEqual } from 'fast-equals'
import { eqApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export interface CustomizeUnknown<RC> {
  compare: 'default-circular' | 'default-non-circular' | ((env: RC) => Eq<unknown>)
}

/**
 *  @since 0.0.1
 */
export const eqUnknownInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnknown1<EqURI, Env> => ({
    _F: EqURI,
    unknown: cfg => env => {
      const config = eqApplyConfig(cfg)
      return new EqType(
        config === undefined ? { equals: circularDeepEqual } : config({ equals: circularDeepEqual }, env)
      )
    }
  })
)
