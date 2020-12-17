import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const fastCheckNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    newtype: () => (getArb, config) => env => new FastCheckType(fastCheckApplyConfig(config)(getArb(env).arb, env))
  })
)
