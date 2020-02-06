import { setFromArray } from 'io-ts-types/lib/setFromArray'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraSet2 } from 'morphic-model-algebras/lib/set'

/**
 *  @since 0.0.1
 */
export const ioTsSetInterpreter: ModelAlgebraSet2<IoTsURI> = {
  _F: IoTsURI,
  set: (a, ord) => new IOTSType(setFromArray(a.type, ord))
}
