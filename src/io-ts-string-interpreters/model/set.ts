import { setFromArray } from 'io-ts-types/lib/setFromArray'
import { IOTS2Type, IoTs2URI } from '..'
import { ModelAlgebraSet2 } from '../../model-algebras/set'

export const ioTs2SetInterpreter: ModelAlgebraSet2<IoTs2URI> = {
  set: (a, ord) => new IOTS2Type(setFromArray(a.type, ord))
}
