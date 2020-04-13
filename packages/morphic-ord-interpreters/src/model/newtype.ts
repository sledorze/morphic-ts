import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { OrdURI, OrdType } from '../hkt'
import { identity } from 'fp-ts/lib/function'
import { ordApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const ordNewtypeInterpreter: ModelAlgebraNewtype1<OrdURI> = {
  _F: OrdURI,
  newtype: () => identity,
  newtypeCfg: () => getOrd => config => env => new OrdType(ordApplyConfig(config)(getOrd(env).ord, env))
}
