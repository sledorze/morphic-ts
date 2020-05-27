import type { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { OrdURI, OrdType } from '../hkt'
import { ordApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ordNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype1<OrdURI, Env> => ({
    _F: OrdURI,
    newtype: () => (getOrd, config) => env => new OrdType(ordApplyConfig(config)(getOrd(env).ord, env))
  })
)
