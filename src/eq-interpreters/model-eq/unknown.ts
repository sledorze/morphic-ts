import { strictEqual } from 'fp-ts/lib/Eq'
import { ModelAlgebraUnknown1 } from '../../model-algebras/unknown'
import { EqType, EqURI } from '..'
import {} from 'fp-ts/lib/Eq'

export const eqUnknownInterpreter: ModelAlgebraUnknown1<EqURI> = {
  unknown: _ => new EqType({ equals: strictEqual })
}
