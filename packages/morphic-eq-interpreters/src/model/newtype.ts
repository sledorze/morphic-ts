import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { EqURI, EqType } from '../hkt'
import { eqApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const eqNewtypeInterpreter: ModelAlgebraNewtype1<EqURI> = {
  _F: EqURI,
  newtype: () => getEq => getEq,
  newtypeCfg: () => getEq => config => env => new EqType(eqApplyConfig(config)(getEq(env).eq, env))
}
