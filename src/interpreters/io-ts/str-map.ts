import { record, string } from 'io-ts'
import { IOTSType, URI } from '.'
import { ModelAlgebraStrMap1 } from '../../algebras/str-map'

export const ioTsStrMapInterpreter: ModelAlgebraStrMap1<URI> = {
  strMap: codomain => new IOTSType(record(string, codomain.type))
}
