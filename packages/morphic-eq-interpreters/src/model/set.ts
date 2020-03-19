import { set } from 'fp-ts'
import { ModelAlgebraSet1 } from '@morphic-ts/model-algebras/lib/set'
import { EqType, EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqSetInterpreter: ModelAlgebraSet1<EqURI> = {
  _F: EqURI,
  set: ({ eq }) => new EqType(set.getEq(eq))
}
