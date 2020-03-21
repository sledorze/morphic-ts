import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraUnknown2 } from '@morphic-ts/model-algebras/lib/unknown'
import { Customize, applyCustomize } from './common'

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface UnknownConfig {
    [IoTsURI]: Customize<unknown, unknown> | undefined
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsUnknownInterpreter: ModelAlgebraUnknown2<IoTsURI> = {
  _F: IoTsURI,
  unknown: config => new IOTSType(applyCustomize(config)(t.unknown))
}
