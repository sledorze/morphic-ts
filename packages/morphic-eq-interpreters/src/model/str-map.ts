import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { EqType, EqURI } from '../hkt'
import { eqApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const eqStrMapInterpreter: ModelAlgebraStrMap1<EqURI> = {
  _F: EqURI,
  strMap: getCodomain => env => new EqType(record.getEq(getCodomain(env).eq)),
  strMapCfg: getCodomain => config => env => new EqType(eqApplyConfig(config)(record.getEq(getCodomain(env).eq), env))
}
