import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { EqType, EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqStrMapInterpreter: ModelAlgebraStrMap1<EqURI> = {
  _F: EqURI,
  strMap: getCodomain => env => new EqType(record.getEq(getCodomain(env).eq)),
  strMapCfg: getCodomain => _config => env => new EqType(record.getEq(getCodomain(env).eq)) // TODO: add customize
}
