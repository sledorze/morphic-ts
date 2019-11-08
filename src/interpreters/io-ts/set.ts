import { setFromArray } from 'io-ts-types/lib/setFromArray'
import { IOTSType, URI } from '.'
import { ModelAlgebraSet1 } from '../../algebras/set'

export const ioTsSetInterpreter: ModelAlgebraSet1<URI> = {
  set: (a, ord) => new IOTSType(() => setFromArray(a.type(), ord))
}
