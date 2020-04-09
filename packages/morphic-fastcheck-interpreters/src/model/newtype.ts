import { FastCheckURI } from '../hkt'
import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'

declare module '@morphic-ts/algebras/lib/hkt' {}

/**
 *  @since 0.0.1
 */
export const fastCheckNewtypeInterpreter: ModelAlgebraNewtype1<FastCheckURI> = {
  _F: FastCheckURI,
  newtype: () => getArb => getArb,
  //  TODO: add customize
  newtypeCfg: () => getArb => _config => getArb
}
