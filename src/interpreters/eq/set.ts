import { set } from 'fp-ts'
import { ModelAlgebraSet1 } from '../../algebras/set'
import { EqType, EqURI } from '.'

export const eqSetInterpreter: ModelAlgebraSet1<EqURI> = {
  set: ({ eq }) => new EqType(set.getEq(eq))
}
