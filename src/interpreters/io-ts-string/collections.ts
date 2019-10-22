import { setFromArray } from 'io-ts-types/lib/setFromArray'
import { record, string } from 'io-ts'
import { IOTSStringType, URI } from '.'
import { ModelAlgebraCollection2 } from '../../algebras/collections'

export const ioTsStringSetInterpreter: ModelAlgebraCollection2<URI> = {
  set: (a, ord) => new IOTSStringType(setFromArray(a.type, ord)),
  strMap: codomain => new IOTSStringType(record(string, codomain.type))
}
