import { set } from 'fp-ts'
import { ModelAlgebraSet1 } from '../../algebras/set'
import { EqType, URI } from '.'

export const eqSetInterpreter: ModelAlgebraSet1<URI> = {
  set: ({ eq }) => new EqType(set.getEq(eq))
}
