import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '../../algebras/str-map'
import { ShowType, URI } from '.'

export const showStrMapInterpreter: ModelAlgebraStrMap1<URI> = {
  strMap: codomain => new ShowType(record.getShow(codomain.show))
}
