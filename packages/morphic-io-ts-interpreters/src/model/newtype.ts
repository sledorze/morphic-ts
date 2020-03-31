import { ModelAlgebraNewtype2 } from '@morphic-ts/model-algebras/lib/newtype'
import { IOTSType, IoTsURI } from '../hkt'
import { Customize, applyCustomize, NoEnv } from './common'

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface NewtypeConfig<E, A> {
    [IoTsURI]: Customize<NoEnv, E, A> | undefined
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsNewtypeInterpreter: ModelAlgebraNewtype2<IoTsURI> = {
  _F: IoTsURI,
  newtype: () => (a, config) => env => new IOTSType(applyCustomize(config)(a(env).type as any, env))
}
