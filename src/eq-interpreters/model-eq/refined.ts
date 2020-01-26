import { ModelAlgebraRefined1 } from '../../model-algebras/refined'
import { EqURI } from '..'
import { identity } from 'fp-ts/lib/function'

export const eqRefinedInterpreter: ModelAlgebraRefined1<EqURI> = {
  refined: identity as any
}
