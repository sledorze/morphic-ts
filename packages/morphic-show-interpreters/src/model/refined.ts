import { ShowType, ShowURI } from '../hkt'
import { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'

/**
 *  @since 0.0.1
 */
export const showRefinedInterpreter: ModelAlgebraRefined1<ShowURI> = {
  _F: ShowURI,
  refined: (a, _ref, name) => new ShowType({ show: x => `<${name}>(${a.show.show(x)})` })
}
