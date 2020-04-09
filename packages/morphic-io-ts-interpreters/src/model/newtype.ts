import { ModelAlgebraNewtype2 } from '@morphic-ts/model-algebras/lib/newtype'
import { IOTSType, IoTsURI } from '../hkt'
import { Customize, applyCustomize } from './common'

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface NewtypeConfig<RC, E, A> {
    [IoTsURI]: Customize<RC, E, A> | undefined
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsNewtypeInterpreter: ModelAlgebraNewtype2<IoTsURI> = {
  _F: IoTsURI,
  newtype: () => a => env => new IOTSType(a(env).type),
  newtypeCfg: () => a => config => env => new IOTSType(applyCustomize(config)(a(env).type, env))
}
