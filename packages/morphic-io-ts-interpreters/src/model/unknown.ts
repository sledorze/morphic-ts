import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraUnknown2 } from '@morphic-ts/model-algebras/lib/unknown'
import { applyCustomize } from './common'

/**
 *  @since 0.0.1
 */
export const ioTsUnknownInterpreter: ModelAlgebraUnknown2<IoTsURI> = {
  _F: IoTsURI,
  unknown: () => _env => new IOTSType(t.unknown),
  unknownCfg: config => env => new IOTSType(applyCustomize(config)(t.unknown, env))
}
