import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '@sledorze/morphic-model-algebras/lib/str-map'
import { EqType, EqURI } from '..'

/**
 *  @since 0.0.1
 */
export const eqStrMapInterpreter: ModelAlgebraStrMap1<EqURI> = {
  _F: EqURI,
  strMap: codomain => new EqType(record.getEq(codomain.eq))
}
