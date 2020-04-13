import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraStrMap2 } from '@morphic-ts/model-algebras/lib/str-map'
import { iotsApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const ioTsStrMapInterpreter: ModelAlgebraStrMap2<IoTsURI> = {
  _F: IoTsURI,
  strMap: codomain => env => new IOTSType(t.record(t.string, codomain(env).type)),
  strMapCfg: codomain => config => env =>
    new IOTSType(iotsApplyConfig(config)(t.record(t.string, codomain(env).type), env))
}
