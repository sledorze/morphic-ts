import { ModelAlgebraRefined1 } from '@sledorze/morphic-model-algebras/lib/refined'
import { OrdURI } from '..'
import { identity } from 'fp-ts/lib/function'

export const ordRefinedInterpreter: ModelAlgebraRefined1<OrdURI> = {
  _F: OrdURI,
  refined: identity as any
}
