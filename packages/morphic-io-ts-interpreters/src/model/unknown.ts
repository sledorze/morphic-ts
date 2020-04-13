import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraUnknown2 } from '@morphic-ts/model-algebras/lib/unknown'
import { iotsApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const ioTsUnknownInterpreter: ModelAlgebraUnknown2<IoTsURI> = {
  _F: IoTsURI,
  unknown: () => _env => new IOTSType(t.unknown),
  unknownCfg: config => env => new IOTSType(iotsApplyConfig(config)(t.unknown, env))
}
