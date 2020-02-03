import { record, string } from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraStrMap2 } from '@sledorze/morphic-model-algebras/lib/str-map'

export const ioTsStrMapInterpreter: ModelAlgebraStrMap2<IoTsURI> = {
  _F: IoTsURI,
  strMap: codomain => new IOTSType(record(string, codomain.type))
}
