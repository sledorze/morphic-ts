import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '@sledorze/morphic-model-algebras/lib/str-map'
import { ShowType, ShowURI } from '..'

export const showStrMapInterpreter: ModelAlgebraStrMap1<ShowURI> = {
  _F: ShowURI,
  strMap: codomain => new ShowType(record.getShow(codomain.show))
}
