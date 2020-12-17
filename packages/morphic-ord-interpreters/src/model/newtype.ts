import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'

import { ordApplyConfig } from '../config'
import { OrdType, OrdURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const ordNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype1<OrdURI, Env> => ({
    _F: OrdURI,
    newtype: () => (getOrd, config) => env => new OrdType(ordApplyConfig(config)(getOrd(env).ord, env))
  })
)
