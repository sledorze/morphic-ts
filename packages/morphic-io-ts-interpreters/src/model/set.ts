import { setFromArray } from 'io-ts-types/lib/setFromArray'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraSet2 } from '@morphic-ts/model-algebras/lib/set'

/**
 *  @since 0.0.1
 */
export const ioTsSetInterpreter: ModelAlgebraSet2<IoTsURI> = {
  _F: IoTsURI,
  set: (a, ord) => env => new IOTSType(setFromArray(a(env).type, ord))
}
