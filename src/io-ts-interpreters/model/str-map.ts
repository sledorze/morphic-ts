import { record, string } from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraStrMap2 } from '../../model-algebras/str-map'

export const ioTsStrMapInterpreter: ModelAlgebraStrMap2<IoTsURI> = {
  strMap: codomain => new IOTSType(record(string, codomain.type))
}
