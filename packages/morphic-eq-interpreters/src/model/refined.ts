import { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { EqURI } from '../hkt'
import { identity } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export const eqRefinedInterpreter: ModelAlgebraRefined1<EqURI> = {
  _F: EqURI,
  refined: identity as any
}
