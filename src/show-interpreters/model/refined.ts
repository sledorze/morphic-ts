import { ShowType, ShowURI } from '..'
import { ModelAlgebraRefined1 } from '../../model-algebras/refined'

export const showRefinedInterpreter: ModelAlgebraRefined1<ShowURI> = {
  refined: (a, _ref, name) => new ShowType({ show: x => `<${name}>(${a.show.show(x)})` })
}
