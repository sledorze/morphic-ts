import { setFromArray } from 'io-ts-types/lib/setFromArray'
import { IOTSType, IoTsURI } from '.'
import { ModelAlgebraSet1 } from '../../algebras/set'

export const ioTsSetInterpreter: ModelAlgebraSet1<IoTsURI> = {
  set: (a, ord) => new IOTSType(setFromArray(a.type, ord))
}
