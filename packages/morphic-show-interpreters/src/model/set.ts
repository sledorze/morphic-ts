import { set } from 'fp-ts'
import { ModelAlgebraSet1 } from '@sledorze/morphic-model-algebras/lib/set'
import { ShowType, ShowURI } from '..'

export const showSetInterpreter: ModelAlgebraSet1<ShowURI> = {
  _F: ShowURI,
  set: ({ show }) => new ShowType(set.getShow(show))
}
