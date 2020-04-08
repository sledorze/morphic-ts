import { FastCheckURI } from '../hkt'
import { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { identity } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export const fastCheckRefinedInterpreter: ModelAlgebraRefined1<FastCheckURI> = {
  _F: FastCheckURI,
  refined: identity as any // TODO: add customize
}
