import { FastCheckURI, FastCheckType } from '../hkt'
import type { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { fastCheckApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const fastCheckNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    newtype: () => (getArb, config) => env => new FastCheckType(fastCheckApplyConfig(config)(getArb(env).arb, env))
  })
)
