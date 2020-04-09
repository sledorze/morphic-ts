import { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqRefinedInterpreter: ModelAlgebraRefined1<EqURI> = {
  _F: EqURI,
  refined: getEq => getEq,
  refinedCfg: getEq => _config => getEq // TODO: add customize
}
