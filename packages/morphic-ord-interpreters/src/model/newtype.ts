import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { OrdURI } from '../hkt'
import { identity } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export const ordNewtypeInterpreter: ModelAlgebraNewtype1<OrdURI> = {
  _F: OrdURI,
  newtype: () => identity,
  // TODO: add customize
  newtypeCfg: () => getOrd => _config => getOrd
}
