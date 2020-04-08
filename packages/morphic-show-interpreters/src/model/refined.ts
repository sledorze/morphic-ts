import { ShowType, ShowURI } from '../hkt'
import { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'

/**
 *  @since 0.0.1
 */
export const showRefinedInterpreter: ModelAlgebraRefined1<ShowURI> = {
  _F: ShowURI,
  // TODO: add customize
  refined: (a, _ref, name) => _config => env => new ShowType({ show: x => `<${name}>(${a(env).show.show(x)})` })
}
