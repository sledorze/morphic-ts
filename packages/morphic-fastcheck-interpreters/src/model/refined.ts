import { FastCheckURI } from '../hkt'
import { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'

/**
 *  @since 0.0.1
 */
export const fastCheckRefinedInterpreter: ModelAlgebraRefined1<FastCheckURI> = {
  _F: FastCheckURI,
  refined: getArb => getArb,
  refinedCfg: getArb => _config => getArb // TODO: add customize
}
