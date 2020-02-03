import { set } from 'fp-ts'
import { ModelAlgebraSet1 } from '@sledorze/morphic-ts-model-algebras/lib/set'
import { EqType, EqURI } from '..'

export const eqSetInterpreter: ModelAlgebraSet1<EqURI> = {
  _F: EqURI,
  set: ({ eq }) => new EqType(set.getEq(eq))
}
