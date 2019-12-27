import { set } from 'fp-ts'
import { ModelAlgebraSet1 } from '../../algebras/set'
import { ShowType, ShowURI } from '.'

export const showSetInterpreter: ModelAlgebraSet1<ShowURI> = {
  set: ({ show }) => new ShowType(set.getShow(show))
}
