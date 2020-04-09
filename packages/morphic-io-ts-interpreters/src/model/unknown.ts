import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraUnknown2 } from '@morphic-ts/model-algebras/lib/unknown'
import { Customize, applyCustomize } from './common'

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface UnknownConfig<RC> {
    [IoTsURI]: Customize<RC, unknown, unknown> | undefined
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsUnknownInterpreter: ModelAlgebraUnknown2<IoTsURI> = {
  _F: IoTsURI,
  unknown: () => _env => new IOTSType(t.unknown),
  unknownCfg: config => env => new IOTSType(applyCustomize(config)(t.unknown, env))
}
