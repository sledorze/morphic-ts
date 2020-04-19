import { set } from 'fp-ts'
import { ModelAlgebraSet1 } from '@morphic-ts/model-algebras/lib/set'
import { ShowType, ShowURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const showSetInterpreter: ModelAlgebraSet1<ShowURI> = {
  _F: ShowURI,
  set: getShow => env => new ShowType(set.getShow(getShow(env).show))
}
