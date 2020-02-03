import { ModelAlgebraRefined1 } from '@sledorze/morphic-model-algebras/lib/refined'
import { EqURI } from '..'
import { identity } from 'fp-ts/lib/function'

export const eqRefinedInterpreter: ModelAlgebraRefined1<EqURI> = {
  _F: EqURI,
  refined: identity as any
}
