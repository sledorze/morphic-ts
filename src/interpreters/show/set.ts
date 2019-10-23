import { set } from 'fp-ts'
import { ModelAlgebraSet1 } from '../../algebras/set'
import { ShowType, URI } from '.'

export const showSetInterpreter: ModelAlgebraSet1<URI> = {
  set: ({ show }) => new ShowType(set.getShow(show))
}
