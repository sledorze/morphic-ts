import { ShowType, ShowURI } from '..'
import { ModelAlgebraRefined1 } from '@sledorze/morphic-model-algebras/lib/refined'

export const showRefinedInterpreter: ModelAlgebraRefined1<ShowURI> = {
  _F: ShowURI,
  refined: (a, _ref, name) => new ShowType({ show: x => `<${name}>(${a.show.show(x)})` })
}
