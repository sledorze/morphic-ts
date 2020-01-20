import { record, string } from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraStrMap1 } from '../../../model-algebras/str-map'

export const ioTsStrMapInterpreter: ModelAlgebraStrMap1<IoTsURI> = {
  strMap: codomain => new IOTSType(record(string, codomain.type))
}
