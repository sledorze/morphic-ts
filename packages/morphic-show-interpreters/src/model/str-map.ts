import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { ShowType, ShowURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const showStrMapInterpreter: ModelAlgebraStrMap1<ShowURI> = {
  _F: ShowURI,
  // TODO: add customize
  strMap: codomain => _config => env => new ShowType(record.getShow(codomain(env).show))
}
