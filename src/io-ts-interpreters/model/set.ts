import { setFromArray } from 'io-ts-types/lib/setFromArray'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraSet2 } from '../../model-algebras/set'

export const ioTsSetInterpreter: ModelAlgebraSet2<IoTsURI> = {
  set: (a, ord) => new IOTSType(setFromArray(a.type, ord))
}
