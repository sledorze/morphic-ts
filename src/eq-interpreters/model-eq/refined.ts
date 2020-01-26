import { ModelAlgebraRefined1 } from '../../model-algebras/refined'
import { EqURI } from '..'
import {} from 'fp-ts/lib/Eq'
import { identity } from 'fp-ts/lib/function'

export const eqRefinedInterpreter: ModelAlgebraRefined1<EqURI> = {
  refined: identity as any
}
