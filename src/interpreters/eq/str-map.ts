import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '../../algebras/str-map'
import { EqType, URI } from '.'

export const eqStrMapInterpreter: ModelAlgebraStrMap1<URI> = {
  strMap: codomain => new EqType(record.getEq(codomain.eq))
}
