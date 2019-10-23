import { record, string } from 'io-ts'
import { IOTSStringType, URI } from '.'
import { ModelAlgebraStrMap2 } from '../../algebras/str-map'

export const ioTsStringStrMapInterpreter: ModelAlgebraStrMap2<URI> = {
  strMap: codomain => new IOTSStringType(record(string, codomain.type))
}
