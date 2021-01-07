import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet } from '@morphic-ts/model-algebras/lib/set'
import { setFromArray } from 'io-ts-types/lib/setFromArray'

import { IOTSType, IoTsURI } from '../hkt'
import { iotsApplyConfig } from './../config'

/**
 *  @since 0.0.1
 */
export const ioTsSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet<IoTsURI, Env> => ({
    _F: IoTsURI,
    set: (a, ord, config) => env => new IOTSType(iotsApplyConfig(config)(setFromArray(a(env).type, ord), env, {}))
  })
)
