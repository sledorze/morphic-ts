import { FastCheckURI } from '..'
import { ModelAlgebraRefined1 } from '../../model-algebras/refined'
import { identity } from 'fp-ts/lib/function'

export const fastCheckRefinedInterpreter: ModelAlgebraRefined1<FastCheckURI> = {
  refined: identity as any
}
