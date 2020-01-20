import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '../../model-algebras/str-map'
import { ShowType, ShowURI } from '..'

export const showStrMapInterpreter: ModelAlgebraStrMap1<ShowURI> = {
  strMap: codomain => new ShowType(record.getShow(codomain.show))
}
