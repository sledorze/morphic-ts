import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqNewtypeInterpreter: ModelAlgebraNewtype1<EqURI> = {
  _F: EqURI,
  newtype: () => getEq => getEq,
  // TODO: add customize
  newtypeCfg: () => getEq => _config => getEq
}
