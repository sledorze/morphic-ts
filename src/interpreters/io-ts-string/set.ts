import { setFromArray } from 'io-ts-types/lib/setFromArray'
import { IOTSStringType, URI } from '.'
import { ModelAlgebraSet2 } from '../../algebras/set'

export const ioTsStringSetInterpreter: ModelAlgebraSet2<URI> = {
  set: (a, ord) => new IOTSStringType(setFromArray(a.type, ord))
}
