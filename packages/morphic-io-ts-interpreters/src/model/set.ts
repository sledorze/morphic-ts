import { setFromArray } from 'io-ts-types/lib/setFromArray'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraSet2 } from '@sledorze/morphic-model-algebras/lib/set'

export const ioTsSetInterpreter: ModelAlgebraSet2<IoTsURI> = {
  _F: IoTsURI,
  set: (a, ord) => new IOTSType(setFromArray(a.type, ord))
}
