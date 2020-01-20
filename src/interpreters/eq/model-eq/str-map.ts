import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '../../../model-algebras/str-map'
import { EqType, EqURI } from '..'

export const eqStrMapInterpreter: ModelAlgebraStrMap1<EqURI> = {
  strMap: codomain => new EqType(record.getEq(codomain.eq))
}
