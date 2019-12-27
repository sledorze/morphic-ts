import { record, string } from 'io-ts'
import { IOTSStringType, IoTsStringURI } from '.'
import { ModelAlgebraStrMap2 } from '../../algebras/str-map'

export const ioTsStringStrMapInterpreter: ModelAlgebraStrMap2<IoTsStringURI> = {
  strMap: codomain => new IOTSStringType(record(string, codomain.type))
}
