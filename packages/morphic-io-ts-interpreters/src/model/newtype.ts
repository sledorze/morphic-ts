import { ModelAlgebraNewtype2 } from '@morphic-ts/model-algebras/lib/newtype'
import { IOTSType, IoTsURI } from '../hkt'
import { iotsApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ioTsNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype2<IoTsURI, Env> => ({
    _F: IoTsURI,
    newtype: () => a => env => new IOTSType(a(env).type),
    newtypeCfg: () => a => config => env => new IOTSType(iotsApplyConfig(config)(a(env).type, env))
  })
)
