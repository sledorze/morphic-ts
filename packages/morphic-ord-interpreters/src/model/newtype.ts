import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { OrdURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const ordNewtypeInterpreter: ModelAlgebraNewtype1<OrdURI> = {
  _F: OrdURI,
  // TODO: add customize
  newtype: () => getOrd => _config => getOrd
}
