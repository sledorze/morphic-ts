import { set } from 'fp-ts'
import { ModelAlgebraSet1 } from 'morphic-model-algebras/lib/set'
import { EqType, EqURI } from '..'

/**
 *  @since 0.0.1
 */
export const eqSetInterpreter: ModelAlgebraSet1<EqURI> = {
  _F: EqURI,
  set: ({ eq }) => new EqType(set.getEq(eq))
}
