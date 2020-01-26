import { ModelAlgebraRefined1 } from '../../model-algebras/refined'
import { OrdURI } from '..'
import { identity } from 'fp-ts/lib/function'

export const ordRefinedInterpreter: ModelAlgebraRefined1<OrdURI> = {
  refined: identity as any
}
