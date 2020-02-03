import { FastCheckURI } from '..'
import { ModelAlgebraRefined1 } from '@sledorze/morphic-model-algebras/lib/refined'
import { identity } from 'fp-ts/lib/function'

export const fastCheckRefinedInterpreter: ModelAlgebraRefined1<FastCheckURI> = {
  _F: FastCheckURI,
  refined: identity as any
}
