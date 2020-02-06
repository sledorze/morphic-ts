import { ModelAlgebraRefined1 } from '@morphic/model-algebras/lib/refined'
import { OrdURI } from '..'
import { identity } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export const ordRefinedInterpreter: ModelAlgebraRefined1<OrdURI> = {
  _F: OrdURI,
  refined: identity as any
}
