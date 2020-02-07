import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { ShowType, ShowURI } from '..'

/**
 *  @since 0.0.1
 */
export const showStrMapInterpreter: ModelAlgebraStrMap1<ShowURI> = {
  _F: ShowURI,
  strMap: codomain => new ShowType(record.getShow(codomain.show))
}
