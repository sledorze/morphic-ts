import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import type { ModelAlgebraUnknown2 } from '@morphic-ts/model-algebras/lib/unknown'
import { iotsApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ioTsUnknownInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnknown2<IoTsURI, Env> => ({
    _F: IoTsURI,
    unknown: config => env => new IOTSType(iotsApplyConfig(config)(t.unknown, env))
  })
)
