import { record, string } from 'io-ts'
import { IOTS2Type, IoTs2URI } from '..'
import { ModelAlgebraStrMap2 } from '../../model-algebras/str-map'

export const ioTs2StrMapInterpreter: ModelAlgebraStrMap2<IoTs2URI> = {
  strMap: codomain => new IOTS2Type(record(string, codomain.type))
}
