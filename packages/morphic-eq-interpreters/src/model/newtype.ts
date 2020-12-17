import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'

import { eqApplyConfig } from '../config'
import { EqType, EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype1<EqURI, Env> => ({
    _F: EqURI,
    newtype: () => (getEq, config) => env => new EqType(eqApplyConfig(config)(getEq(env).eq, env))
  })
)
