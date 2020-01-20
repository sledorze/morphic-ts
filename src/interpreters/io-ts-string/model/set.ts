import { setFromArray } from 'io-ts-types/lib/setFromArray'
import { IOTSStringType, IoTsStringURI } from '..'
import { ModelAlgebraSet2 } from '../../../model-algebras/set'

export const ioTsStringSetInterpreter: ModelAlgebraSet2<IoTsStringURI> = {
  set: (a, ord) => new IOTSStringType(setFromArray(a.type, ord))
}
