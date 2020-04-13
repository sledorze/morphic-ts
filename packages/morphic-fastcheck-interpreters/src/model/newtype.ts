import { FastCheckURI, FastCheckType } from '../hkt'
import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { fastCheckApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const fastCheckNewtypeInterpreter: ModelAlgebraNewtype1<FastCheckURI> = {
  _F: FastCheckURI,
  newtype: () => getArb => getArb,
  newtypeCfg: () => getArb => config => env => new FastCheckType(fastCheckApplyConfig(config)(getArb(env).arb, env))
}
