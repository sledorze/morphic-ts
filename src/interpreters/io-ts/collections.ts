import { setFromArray } from 'io-ts-types/lib/setFromArray'
import { record, string } from 'io-ts'
import { IOTSType, URI } from '.'
import { ModelAlgebraCollection1 } from '../../algebras/collections'

export const ioTsSetInterpreter: ModelAlgebraCollection1<URI> = {
  set: (a, ord) => new IOTSType(setFromArray(a.type, ord)),
  strMap: codomain => new IOTSType(record(string, codomain.type))
}
